const { JSDOM } = require('jsdom');

const jsdomConfig = {
  url: 'http://localhost', // Provide a base URL for the virtual DOM
  pretendToBeVisual: true, // Mimic visual-related features
};

const jsdom = new JSDOM('<!doctype html><html><body></body></html>', jsdomConfig);

// Expose window, document, and other DOM APIs to the global scope
global.window = jsdom.window;
global.document = jsdom.window.document;
global.navigator = jsdom.window.navigator;
global.requestAnimationFrame = jsdom.window.requestAnimationFrame;