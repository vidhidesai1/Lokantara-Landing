import AppKit
import CoreText

let width = 1200
let height = 630
let background = NSColor(
  calibratedRed: 0xf2 / 255,
  green: 0xeb / 255,
  blue: 0xdc / 255,
  alpha: 1
)
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
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = NSGraphicsContext(bitmapImageRep: image)
background.setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()

let englishFont = NSFont.systemFont(ofSize: 104, weight: .semibold)
let devanagariFont =
  NSFont(name: "KohinoorDevanagari-Semibold", size: 108)
  ?? NSFont.systemFont(ofSize: 108, weight: .semibold)
let spaceFont =
  NSFont(name: "InstrumentSerif-Italic", size: 92)
  ?? NSFont(name: "Georgia-Italic", size: 92)
  ?? NSFont.systemFont(ofSize: 92, weight: .regular)

let wordmark = NSMutableAttributedString()
wordmark.append(
  NSAttributedString(
    string: "LOKANTA",
    attributes: [
      .font: englishFont,
      .foregroundColor: ink,
      .kern: -2.6,
    ]
  )
)
wordmark.append(
  NSAttributedString(
    string: "र",
    attributes: [
      .font: devanagariFont,
      .foregroundColor: ink,
      .baselineOffset: 1,
      .kern: -1.2,
    ]
  )
)
wordmark.append(
  NSAttributedString(
    string: "A",
    attributes: [
      .font: englishFont,
      .foregroundColor: ink,
      .kern: -2.6,
    ]
  )
)

let markSize = wordmark.size()
let space = NSAttributedString(
  string: "space",
  attributes: [
    .font: spaceFont,
    .foregroundColor: ochre,
    .kern: 0.2,
  ]
)
let spaceSize = space.size()
let lineGap: CGFloat = -38
let groupHeight = markSize.height + lineGap + spaceSize.height

let markOrigin = NSPoint(
  x: (CGFloat(width) - markSize.width) / 2,
  y: (CGFloat(height) - groupHeight) / 2 + spaceSize.height + lineGap - 8
)
let spaceOrigin = NSPoint(
  x: (CGFloat(width) - spaceSize.width) / 2,
  y: (CGFloat(height) - groupHeight) / 2 + 2
)
wordmark.draw(at: markOrigin)
space.draw(at: spaceOrigin)
NSGraphicsContext.restoreGraphicsState()

guard let png = image.representation(using: .png, properties: [:])
else {
  fatalError("Could not render social-card PNG")
}

try png.write(to: URL(fileURLWithPath: "public/lokantara-share-preview-space-tight-v2.png"))
