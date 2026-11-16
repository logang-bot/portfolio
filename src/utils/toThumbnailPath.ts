export function toThumbnailPath(screenshotPath: string): string {
  const lastSlash = screenshotPath.lastIndexOf('/')
  return `${screenshotPath.slice(0, lastSlash)}/thumbs${screenshotPath.slice(lastSlash)}`
}
