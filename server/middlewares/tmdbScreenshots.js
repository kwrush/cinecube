/**
 * Extracts and completes url of movie screenshots from API response
 */
'use strict';

const processScreenshotUrls = (images, imagesPrefix) => {
  let screenshots = [];
  // show 20 images at most
  images = images.slice(0, 20);
  
  for (let i = 0; i < images.length; i++) {
    let newScreenshotPath = {};
    
    // Response object with {iso6391: null} is mostly the screenshots,
    // but not always. tmdb doesn't provide api to request screenshot.
    if (images[i].iso6391 !== 'undefined' && 
        images[i].iso6391 === null) { 
        
      for (let size in imagesPrefix) {
        newScreenshotPath[size] = images[i].filePath ? 
          `${imagesPrefix[size]}${images[i].filePath}` : null;
      }
      
      screenshots.push(Object.assign({}, images[i], { filePath: newScreenshotPath }));
    }
  }
  
  return screenshots;
};

module.exports = (options) => {
  const root = (options && options.root) || {};
  const screenshotPrefix = (options && options.screenshotUrlPrefix) || {};
  
  if (typeof root !== 'object') throw new TypeError('Invalid value for options.root');
  
  if (!root.backdrops) return [];

  return processScreenshotUrls(root.backdrops, screenshotPrefix);
};