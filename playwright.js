const {chromium} = require("playwright");
const config = require("./config.js");
const Xvfb = require('xvfb');
const { spawn } = require('child_process');
async function play(req, res, next) {
    let browser = null;
    // const xvfb = spawn('Xvfb', [':99', '-screen', '0', '1920x1080x24'], {
    //     stdio: 'inherit' // This will allow you to see Xvfb's output in your terminal
    // });
    browser = await chromium.launchPersistentContext(
        config.userCacheDir,
        {
            headless: false,
            executablePath: config.executablePath,
            timeout: 0,
            deviceScaleFactor: 1,
            viewport: {width: 1280, height: 760},
            args: ["--use-gl=egl",'--disable-web-security', '--allow-running-insecure-content']
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