const os = require("node:os");

const getFilePath = () => { return __dirname + "/index.html"; }
const getOsConfig = () => { return `${os.platform()} ${os.arch()}, ${os.version()}`; }

module.exports = {
    getFilePath,
    getOsConfig
}