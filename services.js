require("isomorphic-unfetch");
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Fetches a random quote by different characters from the famous TV series `The Office` (US version)
async function getRandomOfficeQuotes() {
  try {
    const officeQuote = await fetch(
      "https://officeapi.dev/api/quotes/random"
    ).catch((err) => console.error(`Error : ${err.message}`));
    const officeData = await officeQuote.json();
    // console.log(officeData.data);
    return officeData;
  } catch (error) {
    console.error(`Exception @ getRandomOfficeQuotes > ${error.message}`);
  }
}

function getRandomXKCD() {
  const req_url = "https://c.xkcd.com/random/comic/"
  logger.log('req_url: ', req_url);
  return new Promise((resolve, reject) => {
    request({ uri: req_url }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const links = []
        JSDOM.fromURL(req_url).then((dom) => {
          dom.window.document.querySelectorAll("img").forEach((link) => {
            console.log(link.src);
            links.push(link.src);
          });
          console.log("links >> ", links);
          resolve(links)
        });
      } else {
        reject('Failed to reach server')
      }
    });
  }).then((links) => {
    console.log(links);
    return links[2] ?? '';
  });
}

// FOR TESTING
// tester()

module.exports = {
  getRandomOfficeQuotes,
  getRandomXKCD,
};
