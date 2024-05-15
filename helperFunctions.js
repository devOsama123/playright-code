const fs = require('fs');
let path = require('path')
let uniqueSlug = require('unique-slug')
const Ffmpeg = require("fluent-ffmpeg");

function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const createChromeVideoGenerationFolders = () => {
    const mainPath = path.join(__dirname, "./libraries/chromeVideoGeneration");

    const folders = ["", "jsonTemp", "videosTemp", "frames", "bg", "mp4Videos"];

    folders.forEach((folder) => {
        const folderPath = folder ? path.join(mainPath, folder) : mainPath;
        if (!fs.existsSync(folderPath)) fs.mkdirSync(folderPath);
    });
};

const getChromeJsonFilePath = (jsonId) => {
    return path.join(
        __dirname,
        "./libraries/chromeVideoGeneration/jsonTemp/",
        `${jsonId}.json`
    );
};

const uniqueFilename = function (filepath, prefix, uniq) {
    return path.join(filepath, (prefix ? prefix + '-' : '') + uniqueSlug(uniq))
}

const getChromeVideoFilePath = (videoId, isConverted = false) => {
    videoId += isConverted ? "-converted" : "";
    return path.join(
        __dirname,
        "./libraries/chromeVideoGeneration/videosTemp/",
        `${videoId}`
    );
};


const convertWebmToMp4 = async (inp, out) => {
    return new Promise((resolve, reject) => {
        console.log("starting conversion");

        const command = Ffmpeg()
            .addInput(inp)
            // .outputOption(
            //   "-fflags",
            //   "+genpts",
            //   "-vcodec",
            //   "libx264",
            //   "-pix_fmt",
            //   `yuv420p`,
            //   "-r",
            //   `30`
            // )

            .on("progress", function (progress) {
                // ios.emit(`receive-message${socketId}`, "Setting video speed, please wait...");
                console.log("Setting video speed: " + progress.percent + "% Done");
            })

            .on("end", function (stdout, stderr) {
                console.log("end conversion");
                console.log("video created good");
                resolve();
            })
            .on("error", function (stdout, stderr) {
                console.log("failed to process video", stdout, stderr);
                return reject(new Error(stdout));
            })
            .output(out);

        command.run();
    });
};


module.exports = {
    isJsonString, createChromeVideoGenerationFolders, getChromeJsonFilePath, uniqueFilename,
    getChromeVideoFilePath, convertWebmToMp4
};