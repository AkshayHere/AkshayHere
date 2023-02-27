require("isomorphic-unfetch");

// Fetches a random quote by different characters from the famous TV series `The Office` (US version)
async function getRandomOfficeQuotes() {
  const officeQuote = await fetch(
    "https://officeapi.dev/api/quotes/random"
  ).catch((err) => console.error(`Error : ${err.message}`));
  const officeData = await officeQuote.json();
  console.log(officeData.data);
  return officeQuote;
};

// FOR TESTING
// console.log(getRandomOfficeQuotes());

module.exports = {
    getRandomOfficeQuotes,
}