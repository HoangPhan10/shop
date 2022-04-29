const puppeteer = require("puppeteer");
const fs = require("fs");
/**
 * @param {string} url
*/

async function MockData(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const data = await page.evaluate(() => {
        const divs = document.querySelectorAll("div.sale-item a img");
        const imgs = [];
        divs.forEach(d => {
            imgs.push({ src: d.getAttribute("src") });
        })
        return imgs;
    });
    //console.log(data)
    fs.writeFile("data.json", JSON.stringify(data), (err) => {
        if (err) console.log(err)
        else console.log("write file done")
    });
    
    // fs.writeFile("data.json", JSON.stringify(data), () => );
    await browser.close();
};

module.exports = MockData;
