const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fetcher = (URL, filePath) => {
  request(URL, (error, response, body) => {
    if (error) {
      throw new Error("Couldn't request from that URL!");
    }
    if (fileExists) {
      rl.question("Are you sure you'd like to overwrite that file? (y/n) ", answer => {
        if (answer === 'y') {
          writeToFile(filePath, body);
        } else if (answer === 'n') {
          console.log("okay we won't overwrite the file");
        } else {
          console.log("please provide a (y/n) response");
        }
        rl.close();
      });
    } else {
      writeToFile(filePath, body);
    }
  });
};

const fileExists = filePath => {
  return fs.access(filePath, fs.constants.F_OK, err);
}

const writeToFile = (filePath, data) => {
  fs.writeFile(filePath, data, error => {
    if (error) {
      throw new Error("Couldn't save to file!");
    }
    console.log("Saved to file!");
  })
}

if (process.argv.length < 4) {
  console.log("please provide a URL and filePath");
  process.exit();
} else {
  const URL = process.argv[2];
  const filePath = process.argv[3];
  fetcher(URL, filePath);
}