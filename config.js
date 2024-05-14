import { URL } from 'node:url';

const __filename = new URL('', import.meta.url).pathname;

const __dirname = new URL('.', import.meta.url).pathname;
console.log(__dirname);

const env = "dev";

const dev = {
    port: 5001,
    serverURL: "http://localhost:5001",
    videoFolder: __dirname,
    jsonFolder: __dirname,
    appURL: "http://localhost:3000/videoPlayer/",
    userCacheDir: "/var/www/node/cache",
    executablePath:
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    URL: 0,
};

const production = {
    port: 5001,
    serverURL: "https://api-animation.easycoach.club/",
    videoFolder: __dirname,
    jsonFolder: __dirname,
    appURL: "https://animation.easycoach.club/videoPlayer/",
    userCacheDir: "/var/www/node/cache",
    executablePath: "/usr/bin/google-chrome",
    URL: 0,
};

export const config = {
    dev,
    production,
};

export default config[env]
