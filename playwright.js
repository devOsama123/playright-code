const {chromium} = require("playwright");
const config = require("./config.js");

async function play(req, res, next) {
    let browser = null;
    browser = await chromium.launchPersistentContext(
        config.userCacheDir,
        {
            headless: false,
            executablePath: config.executablePath,
            timeout: 0,
            deviceScaleFactor: 1,
            viewport: {width: 1280, height: 760},
            args: ["--use-gl=egl"]
            // args:              [
            //   '--display='+xvfb._display
            // ],
        }
    );
    const page = await browser.newPage();
    page.on("load", (p) => console.timeEnd("pageload"));
    const pageToLoad = "https://www.health.harvard.edu/blog"
    console.log(pageToLoad);

    await page.goto(pageToLoad, {timeout: 300000});
    await page.evaluate(() => {
        console.log('Helllo Playewright', 42, {foo: 'bar'});  // Issue console.log inside the page
    });
    if (browser) setTimeout(async () => {
            await browser.close()
            res.send("Playing")
        }

        , 10000)
    ;
}

module.exports = play;