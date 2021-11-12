require("isomorphic-unfetch");
const { promises: fs } = require("fs");
const path = require("path");
var helloTextArray = require('./hello.json');

async function main() {
    const readmeTemplate = (
        await fs.readFile(path.join(process.cwd(), "./CUSTOM_README.md"))
    ).toString("utf-8");

    // generate hello text
    let helloObject = helloTextArray.splice(Math.floor(Math.random()*helloTextArray.length), 1).pop();
    console.log(helloObject);
    console.log(helloObject['hello']);

    const office_quote = await (
        await fetch("https://officeapi.dev/api/quotes/random")
    ).json();

    console.log(office_quote);

    const readme = readmeTemplate
        .replace("{office_quote}", office_quote.data.content)
        .replace("{office_character}", `- ${office_quote.data.character.firstname} ${office_quote.data.character.lastname}`)
        .replace("{hello_text}", helloObject['hello'])

    await fs.writeFile("README.md", readme);
}

main();
