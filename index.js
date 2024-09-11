import { get } from 'node:https';

const memeUrl = 'https://memegen-link-examples-upleveled.netlify.app/';
let pageHtml = '';

// Get request to meme website
get(memeUrl, (res) => {
  // Set encoding to receive response as string
  res.setEncoding('utf-8');

  console.log(res.statusCode);
  console.log(res.headers);

  // Bundle data stream
  res.on('data', (data) => {
    pageHtml = pageHtml + data;
  });

  // Log message when data
  res.on('end', () => {
    console.log(pageHtml);
    console.log(`Received html data from: \n${memeUrl}`);
  });
});
