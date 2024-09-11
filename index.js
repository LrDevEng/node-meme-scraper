import { get } from 'node:https';
import { parse } from 'node-html-parser';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Wrapping https get request in promise that resolves once all data has been received
function asyncHttpsGet(url) {
  return new Promise((resolve, reject) => {
    let stringifiedData = '';

    get(url, (res) => {
      // Set encoding to receive response as string
      res.setEncoding('utf-8');

      // Bundle incoming data stream
      res.on('data', (data) => {
        stringifiedData = stringifiedData + data;
      });

      // Resolve when all data has been received and bundled
      res.on('end', () => {
        resolve(stringifiedData);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Make https get request to meme url and wait until all html data is received
const htmlPageAsString = await asyncHttpsGet(memeUrl);
// Parse the html string data into an object
const htmlRoot = parse(htmlPageAsString);

// Extract source url of all images
const imgSection = htmlRoot.getElementById('images');
const allImages = imgSection.getElementsByTagName('img');
const allImagesSrc = allImages.map((imgHtmlElement) => {
  return imgHtmlElement.getAttribute('src');
});

console.log(allImagesSrc);
