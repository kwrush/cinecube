export const mapToCssModules = (className, cssModule) => {
  if (!cssModule) return className;
  return className.split(/\s+/).map(c => cssModule[c] || c).join(' ');
}