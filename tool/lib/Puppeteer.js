const puppeteer = require("puppeteer");
const fs = require("fs");
/**
 * @param {string} url
*/

async function MockData(url) {
    const browser = await puppeteer.launch("https://vi.wikipedia.org/wiki/");
    const page = await browser.newPage("Danh_sách_trường_đại_học,_học_viện_và_cao_đẳng_tại_Việt_Nam");
    await page.goto(url);
    // const data = await page.evaluate(() => {
    //     const divs = document.querySelectorAll("ol li a");
    //     const school = [];
    //     divs.forEach(d => {
    //         school.push({ school: d.getAttribute("title")});
    //     })
    //     return school;
    // });

    

    fs.readFile("data.json",(err,data)=>{
        if(err) console.log(err)
        const result=JSON.parse(data);
        const filterArr= result.map(el=>{
            if(el.school.includes("(trang không tồn tại)")){
                el=el.school.slice(0,el.length-22)
                return el
            }
            return el
        });
            fs.writeFile("data.json", JSON.stringify(filterArr), (err) => {
        if (err) console.log(err)
        else console.log("write file done")
    });
    })



    
    // fs.writeFile("data.json", JSON.stringify(data), () => );
    await browser.close();
};

module.exports = MockData;
