import AppKit
import CoreText

let ink = NSColor(
  calibratedRed: 0x0e / 255,
  green: 0x1e / 255,
  blue: 0x36 / 255,
  alpha: 1
)
let ochre = NSColor(
  calibratedRed: 0xc9 / 255,
  green: 0x9a / 255,
  blue: 0x4a / 255,
  alpha: 1
)

let instrumentSerifItalicURL = URL(
  fileURLWithPath: ".next/static/media/7ebf22b5a21034f8-s.p.10_7676vm7pyy.woff2"
)
var fontRegistrationError: Unmanaged<CFError>?
CTFontManagerRegisterFontsForURL(
  instrumentSerifItalicURL as CFURL,
  .process,
  &fontRegistrationError
)

let englishFont = NSFont.systemFont(ofSize: 150, weight: .semibold)
let devanagariFont =
  NSFont(name: "KohinoorDevanagari-Semibold", size: 156)
  ?? NSFont.systemFont(ofSize: 156, weight: .semibold)
let spaceFont =
  NSFont(name: "InstrumentSerif-Italic", size: 132)
  ?? NSFont(name: "Georgia-Italic", size: 132)
  ?? NSFont.systemFont(ofSize: 132, weight: .regular)

func makeWordmark() -> NSMutableAttributedString {
  let wordmark = NSMutableAttributedString()
  wordmark.append(
    NSAttributedString(
      string: "LOKANTA",
      attributes: [
        .font: englishFont,
        .foregroundColor: ink,
        .kern: -3.75,
      ]
    )
  )
  wordmark.append(
    NSAttributedString(
      string: "र",
      attributes: [
        .font: devanagariFont,
        .foregroundColor: ink,
        .baselineOffset: 1.5,
        .kern: -1.75,
      ]
    )
  )
  wordmark.append(
    NSAttributedString(
      string: "A",
      attributes: [
        .font: englishFont,
        .foregroundColor: ink,
        .kern: -3.75,
      ]
    )
  )
  return wordmark
}

func makeBitmap(width: Int, height: Int) -> NSBitmapImageRep {
  guard
    let image = NSBitmapImageRep(
      bitmapDataPlanes: nil,
      pixelsWide: width,
      pixelsHigh: height,
      bitsPerSample: 8,
      samplesPerPixel: 4,
      hasAlpha: true,
      isPlanar: false,
      colorSpaceName: .deviceRGB,
      bytesPerRow: 0,
      bitsPerPixel: 0
    )
  else {
    fatalError("Could not create bitmap context")
  }

  image.size = NSSize(width: width, height: height)
  return image
}

func drawPNG(
  width: Int,
  height: Int,
  outputPath: String,
  draw: () -> Void
) {
  let image = makeBitmap(width: width, height: height)

  NSGraphicsContext.saveGraphicsState()
  NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: image)
  NSColor.clear.setFill()
  NSRect(x: 0, y: 0, width: width, height: height).fill()
  draw()
  NSGraphicsContext.restoreGraphicsState()

  guard let png = image.representation(using: .png, properties: [:]) else {
    fatalError("Could not render \(outputPath)")
  }

  try! png.write(to: URL(fileURLWithPath: outputPath))
}

func formatNumber(_ value: CGFloat) -> String {
  let normalized = abs(value) < 0.0005 ? 0 : value
  var string = String(format: "%.3f", Double(normalized))
  while string.contains(".") && string.last == "0" {
    string.removeLast()
  }
  if string.last == "." {
    string.removeLast()
  }
  return string
}

func pathData(from path: CGPath) -> String {
  var data: [String] = []

  path.applyWithBlock { elementPointer in
    let element = elementPointer.pointee
    let points = element.points

    switch element.type {
    case .moveToPoint:
      data.append("M\(formatNumber(points[0].x)) \(formatNumber(points[0].y))")
    case .addLineToPoint:
      data.append("L\(formatNumber(points[0].x)) \(formatNumber(points[0].y))")
    case .addQuadCurveToPoint:
      data.append(
        "Q\(formatNumber(points[0].x)) \(formatNumber(points[0].y)) \(formatNumber(points[1].x)) \(formatNumber(points[1].y))"
      )
    case .addCurveToPoint:
      data.append(
        "C\(formatNumber(points[0].x)) \(formatNumber(points[0].y)) \(formatNumber(points[1].x)) \(formatNumber(points[1].y)) \(formatNumber(points[2].x)) \(formatNumber(points[2].y))"
      )
    case .closeSubpath:
      data.append("Z")
    @unknown default:
      break
    }
  }

  return data.joined(separator: " ")
}

struct VectorLine {
  let paths: [String]
  let bounds: CGRect
}

func vectorLine(
  from attributedString: NSAttributedString,
  baselineX: CGFloat = 0,
  baselineY: CGFloat
) -> VectorLine {
  let line = CTLineCreateWithAttributedString(attributedString)
  let runs = CTLineGetGlyphRuns(line) as! [CTRun]
  var paths: [String] = []
  var bounds = CGRect.null

  for run in runs {
    let attributes = CTRunGetAttributes(run) as NSDictionary
    guard let nsFont = attributes[NSAttributedString.Key.font] as? NSFont else {
      continue
    }

    let font = CTFontCreateWithName(
      nsFont.fontName as CFString,
      nsFont.pointSize,
      nil
    )
    let glyphCount = CTRunGetGlyphCount(run)
    var glyphs = [CGGlyph](repeating: 0, count: glyphCount)
    var positions = [CGPoint](repeating: .zero, count: glyphCount)
    CTRunGetGlyphs(run, CFRange(location: 0, length: 0), &glyphs)
    CTRunGetPositions(run, CFRange(location: 0, length: 0), &positions)

    for index in 0..<glyphCount {
      guard let glyphPath = CTFontCreatePathForGlyph(font, glyphs[index], nil) else {
        continue
      }

      var transform = CGAffineTransform(
        translationX: positions[index].x + baselineX,
        y: positions[index].y + baselineY
      )
      guard let transformedPath = glyphPath.copy(using: &transform) else {
        continue
      }

      paths.append(pathData(from: transformedPath))
      bounds = bounds.union(transformedPath.boundingBoxOfPath)
    }
  }

  return VectorLine(paths: paths, bounds: bounds)
}

func writeSVG(
  width: Int,
  height: Int,
  outputPath: String,
  inkPaths: [String],
  ochrePaths: [String] = [],
  contentBounds: CGRect
) {
  let translateX =
    (CGFloat(width) - contentBounds.width) / 2 - contentBounds.minX
  let translateY =
    CGFloat(height) / 2 + (contentBounds.minY + contentBounds.maxY) / 2

  var svg = """
  <svg xmlns="http://www.w3.org/2000/svg" width="\(width)" height="\(height)" viewBox="0 0 \(width) \(height)" fill="none">
    <title>Lokantara</title>
    <g transform="translate(\(formatNumber(translateX)) \(formatNumber(translateY))) scale(1 -1)">

  """

  if !inkPaths.isEmpty {
    svg += """
      <path fill="#0E1E36" d="\(inkPaths.joined(separator: " "))"/>

  """
  }

  if !ochrePaths.isEmpty {
    svg += """
      <path fill="#C99A4A" d="\(ochrePaths.joined(separator: " "))"/>

  """
  }

  svg += """
    </g>
  </svg>

  """

  try! svg.write(toFile: outputPath, atomically: true, encoding: .utf8)
}

let wordmark = makeWordmark()
let wordmarkSize = wordmark.size()
let space = NSAttributedString(
  string: "space",
  attributes: [
    .font: spaceFont,
    .foregroundColor: ochre,
    .kern: 0.2,
  ]
)
let spaceSize = space.size()

let horizontalPadding: CGFloat = 56
let verticalPadding: CGFloat = 44
let lineGap: CGFloat = -54

let logoWidth = Int(ceil(wordmarkSize.width + horizontalPadding * 2))
let logoHeight = Int(ceil(wordmarkSize.height + verticalPadding * 2))

drawPNG(
  width: logoWidth,
  height: logoHeight,
  outputPath: "public/lokantara-logo.png"
) {
  let origin = NSPoint(
    x: (CGFloat(logoWidth) - wordmarkSize.width) / 2,
    y: (CGFloat(logoHeight) - wordmarkSize.height) / 2 - 4
  )
  wordmark.draw(at: origin)
}

let wordmarkVector = vectorLine(from: wordmark, baselineY: 0)
writeSVG(
  width: logoWidth,
  height: logoHeight,
  outputPath: "public/lokantara-logo.svg",
  inkPaths: wordmarkVector.paths,
  contentBounds: wordmarkVector.bounds
)

let lockupWidth = Int(ceil(max(wordmarkSize.width, spaceSize.width) + horizontalPadding * 2))
let groupHeight = wordmarkSize.height + lineGap + spaceSize.height
let lockupHeight = Int(ceil(groupHeight + verticalPadding * 2))

drawPNG(
  width: lockupWidth,
  height: lockupHeight,
  outputPath: "public/lokantara-logo-space.png"
) {
  let wordmarkOrigin = NSPoint(
    x: (CGFloat(lockupWidth) - wordmarkSize.width) / 2,
    y: (CGFloat(lockupHeight) - groupHeight) / 2 + spaceSize.height + lineGap - 8
  )
  let spaceOrigin = NSPoint(
    x: (CGFloat(lockupWidth) - spaceSize.width) / 2,
    y: (CGFloat(lockupHeight) - groupHeight) / 2 + 2
  )
  wordmark.draw(at: wordmarkOrigin)
  space.draw(at: spaceOrigin)
}

let outlineGap: CGFloat = 4
let spaceVectorAtOrigin = vectorLine(from: space, baselineY: 0)
let spaceBaselineY =
  wordmarkVector.bounds.minY - outlineGap - spaceVectorAtOrigin.bounds.maxY
let spaceBaselineX =
  wordmarkVector.bounds.midX - spaceVectorAtOrigin.bounds.midX
let spaceVector = vectorLine(
  from: space,
  baselineX: spaceBaselineX,
  baselineY: spaceBaselineY
)
let lockupBounds = wordmarkVector.bounds.union(spaceVector.bounds)

writeSVG(
  width: lockupWidth,
  height: lockupHeight,
  outputPath: "public/lokantara-logo-space.svg",
  inkPaths: wordmarkVector.paths,
  ochrePaths: spaceVector.paths,
  contentBounds: lockupBounds
)
