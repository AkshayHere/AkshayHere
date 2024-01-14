require("isomorphic-unfetch");
const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const XKCD_RANDOM_URL = "https://c.xkcd.com/random/comic/";
const OFFICE_RANDOM_QUOTE_URL =
  "https://officeapi.akashrajpurohit.com/quote/random";

// Fetches a random quote by different characters from the famous TV series `The Office` (US version)
async function getRandomOfficeQuotes() {
  try {
    const officeQuote = await fetch(OFFICE_RANDOM_QUOTE_URL).catch((err) =>
      console.error(`Error : ${err.message}`)
    );
    const officeData = await officeQuote.json();
    console.log(officeData.data);
    return officeData;
  } catch (error) {
    console.error(`Exception @ getRandomOfficeQuotes > ${error.message}`);
  }
}

function getRandomXKCD() {
  return new Promise((resolve, reject) => {
    request({ uri: XKCD_RANDOM_URL }, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        const links = [];
        JSDOM.fromURL(req_url).then((dom) => {
          dom.window.document.querySelectorAll("img").forEach((link) => {
            console.log(link.src);
            links.push(link.src);
          });
          console.log("links >> ", links);
          resolve(links);
        });
      } else {
        reject("Failed to reach server");
      }
    });
  }).then((links) => {
    console.log(links);
    return links[1] ?? "";
  });
}

// FOR TESTING
// tester()

module.exports = {
  getRandomOfficeQuotes,
  getRandomXKCD,
};
