const env = "production";

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
    userCacheDir: "/home/ubuntu/play-logs/cache",
    executablePath: "/usr/bin/google-chrome",
};

const config = {
    dev,
    production,
};


module.exports = config[env];
