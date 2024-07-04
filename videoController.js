const fs = require('fs');
const fsPromises = require("fs/promises");
const {chromium} = require("playwright");
const config = require("./config.js");
const Xvfb = require('xvfb');
const {isJsonString, createChromeVideoGenerationFolders, getChromeJsonFilePath, uniqueFilename, getChromeVideoFilePath, convertWebmToMp4} = require("./helperFunctions");
var path = require("path");

async function createMediaChrome(req, res, next) {
    console.log("inside createMediaChrome: ", req?.body);
    createChromeVideoGenerationFolders();

    if (!req?.body?.data) return res.send({status: "error", message: "No data"}).status(400);


    const json = req.body.data;
const id = req.params.id;
    console.log('id',id)

    if (!isJsonString(json)) return res.status(400).send({message: `Invalid JSON`});

    const jsonId = `${uniqueFilename("")}`;
    const jsonSavePath = getChromeJsonFilePath(jsonId);
    const videoId = jsonId;
    const videoPath = getChromeVideoFilePath(`${videoId}.webm`);
    const pageToLoad = `https://animation.easycoach.club/mediaPlayer/${id}`;

    fs.writeFileSync(jsonSavePath, json);

    if (!fs.existsSync(jsonSavePath)) return console.log("json not found");
    let browser = null;
    try {
        console.log("inside try browser");
        let xvfb = new Xvfb({
            silent:    false,
            xvfb_args: ["-screen", "0", '1280x760x24', "-ac"],
        });
        xvfb.start((err)=>{
            if (err)
                xvfb.stop();
            console.log(err)
        })
        browser = await chromium.launchPersistentContext(
            config.userCacheDir,
            {
                headless: false,
                executablePath: config.executablePath,
                timeout: 0,
                deviceScaleFactor: 1,
                viewport: {width: 1280, height: 760},
                // args: ["--use-gl=egl"]
                args:              [
                  '--display='+xvfb._display
                ],
            }
        );
        const page = await browser.newPage();
        page.on("load", (p) => console.timeEnd("pageload"));
        console.log(pageToLoad);

        await page.goto(pageToLoad, {timeout: 300000});

        const [download] = await Promise.all([
            page.waitForEvent("download", {timeout: 300000}), // wait for download to start
        ]);

        let downloadError = await download.failure();
        if (downloadError != null) return console.log("download error");
        console.log("after download::::");
        const inp = path.join(__dirname, "./libraries", "chromeVideoGeneration", "videosTemp", `${videoId}.webm`);
        const out = path.join(__dirname, "./libraries", "chromeVideoGeneration", "mp4Videos", `${videoId}-converted.mp4`);

        await download.saveAs(videoPath);
        // await convertWebmToMp4(inp, out);
        const videoUrl = `http://16.170.202.180/libraries/chromeVideoGeneration/videosTemp/${videoId}.webm`;
        // const videoUrlTemp = `http://51.20.6.107/libraries/chromeVideoGeneration/mp4Videos/${videoId}-converted.mp4`;
        console.log(videoUrl);
        res.send({
            status: "ok",
            fileUrl: videoUrl,
        });
        // fsPromises.unlink(videoPath);
        await download.delete();
        await browser.close();


    } catch (err) {
        console.log("Browser error: ", err);
        if(browser) browser.close();
    }
}


module.exports = {createMediaChrome}