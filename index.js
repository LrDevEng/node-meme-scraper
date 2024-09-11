import fs from 'node:fs';
import { get } from 'node:https';
import { parse } from 'node-html-parser';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';

// Wrapping https get request in promise that resolves once all data has been received
function asyncHttpsGet(url, encoding) {
  return new Promise((resolve, reject) => {
    let dataBuffer = '';

    get(url, (res) => {
      // Set encoding
      res.setEncoding(encoding);

      // Bundle incoming data stream
      res.on('data', (data) => {
        dataBuffer = dataBuffer + data;
      });

      // Resolve when all data has been received and bundled
      res.on('end', () => {
        resolve(dataBuffer);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Make https get request to meme url and wait until all html data is received
const htmlPageAsString = await asyncHttpsGet(memeUrl, 'utf-8');
// Parse the html string data into an object
const htmlRoot = parse(htmlPageAsString);

// Extract source url of all images
const imgSection = htmlRoot.getElementById('images');
const allImages = imgSection.getElementsByTagName('img');
const allImagesSrc = allImages.map((imgHtmlElement) => {
  return imgHtmlElement.getAttribute('src');
});

const firstImage = await asyncHttpsGet(allImagesSrc[0], 'base64');
const imageBuffer = Buffer.from(firstImage, 'base64');

console.log(firstImage);

fs.writeFile('xxx_test.jpg', imageBuffer, (error) => {
  //console.log(error);
});

// Load the first 10 images and save to memes folder in local file system
for (let i = 0; i < 10; i++) {}

//console.log(firstImage);
