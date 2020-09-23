const request = require('request');
const fs = require('fs');

const fetcher = (URL, filePath) => {
  request(URL, (error, response, body) => {
    if (error) {
      throw new Error("Couldn't request from that URL!");
    }
    fs.appendFile(filePath, body, error => {
      if (error) {
        throw new Error("Couldn't save to file!");
      }
      console.log("Saved to file!");
    })
  });
};

if (process.argv.length < 4) {
  console.log("please provide a URL and filePath");
  process.exit();
} else {
  const URL = process.argv[2];
  const filePath = process.argv[3];
  fetcher(URL, filePath);
}