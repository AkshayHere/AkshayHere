require("isomorphic-unfetch");
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

// async function test() {
//   const dom = new JSDOM(``, {
//     url: "https://dilbert.com/",
//     contentType: "text/html",
//   });
// //   console.log(dom.window.document.querySelector("p").textContent);
//   return dom.window.document.getElementsByClassName('img-comic')[0];
// }

// FOR TESTING
// console.log(test());

module.exports = {
  getRandomOfficeQuotes,
};
