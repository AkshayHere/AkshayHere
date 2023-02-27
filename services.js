import fetch from "node-fetch";

// Fetches a random quote by different characters from the famous TV series `The Office` (US version)
export const getRandomOfficeQuotes = async () => {
  const officeQuote = await fetch(
    "https://officeapi.dev/api/quotes/random"
  ).catch((err) => console.error(`Error : ${err.message}`));
  const officeData = await officeQuote.json();
  console.log(officeData.data);
  return officeQuote;
};

// FOR TESTING
// console.log(await getRandomOfficeQuotes());
