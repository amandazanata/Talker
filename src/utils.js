const fs = require('fs').promises;
const path = require('path');

async function readTalkerFile() {
    try {
        const data = await fs.readFile(path.resolve(__dirname, './talker.json'));
        const result = JSON.parse(data);
        return result;
    } catch (error) {
        console.error(`Erro de leitura de arquivo ${error}`);
    }
}

module.exports = {
    readTalkerFile,
};