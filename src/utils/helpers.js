export const mapToCssModules = (className, cssModule) => {
  if (!cssModule) return className;
  return className.split(/\s+/).map(c => cssModule[c] || c).join(' ');
}

export const concatUrlParams = (baseUrl, params) => {
  baseUrl = baseUrl ? baseUrl : '';
  params = params ? params : {};

  const props = Object.keys(params);
  const paramsUrl = props
    .map((prop, i) => i === props.length - 1 ? `${prop}=${params[prop]}` : `${prop}=${params[props]}&`)
    .join('');

  return baseUrl + paramsUrl;
}