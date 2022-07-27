import cheerio from 'cheerio';

const admin = require("firebase-admin");
var serviceAccount = require("./admin.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://project-janus-db4a5-default-rtdb.asia-southeast1.firebasedatabase.app",
  authDomain: "project-janus-db4a5.firebaseapp.com",
});

var db = admin.database()
var ref=db.ref("instruments");


export const parseArraysData = (htmlBody) => {
    const $ = cheerio.load(htmlBody);
    let finalData = [];
    $("tr").each((_, element) => {
        let subData = [];
        const el = $(element).find("td > div > label");
        const title = el.text().trim();
        if (title.length !== 0) {
            subData = [...subData, title];
        }

        const data = $(element).find("td[class='td dataArrayCell data']").toArray()
        data.forEach((item) => {
            const date = $(item).attr("data-date");
            const charBarHeight = $(item).find("div").attr("style");
            const classStyle = $(item).find("div").attr("class");
            subData = [...subData, {
                date,
                charBarHeight,
                classStyle
            }];
            finalData = [...finalData, subData];
        });
    });

    console.log("got here")

    var newData = ref.child(finalData);
    newData.update()
    
    
    
    return finalData;
}

export const parseReversals = (htmlBody) => {
    const $ = cheerio.load(htmlBody);
    let data = [];
    $("div[class='block block-3c']:not(:first-child)").each((index, element) => {
        const title = $(element).find("div[class='title-bl']").text().trim();
        const headers = $(element).find("div[class='tr title'] > div[class='td']").toArray();
        let subDataArr = [];
        subDataArr = [...subDataArr, title];
        headers.forEach(item => {
            const itemVal = $(item).text().trim().replace(/\t/g, '').replace(/\s\s+/g, ' ');
            subDataArr = [...subDataArr, itemVal];
        });

        $(element).find("div[class='tr'] > div").toArray().forEach((item) => {
            const itemVal = $(item).text().trim().replace(/\s\s+/g, ' ');
            subDataArr = [...subDataArr, itemVal];
        });
        data = [...data, subDataArr]
    });

    return data;
}