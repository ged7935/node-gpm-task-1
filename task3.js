import csv from 'csvtojson';
import fs from 'fs';
import path from 'path';
import util from 'util';
import { Transform, pipeline } from 'stream';

const asyncPipeline = util.promisify(pipeline);

const jsonTransform = new Transform({
    transform(chunk, encoding, callback) {
        const chunkJson = JSON.parse(chunk.toString());
        const newJson = {};
        for (const [k, v] of Object.entries(chunkJson)) {
            if (k === 'Amount') continue;
            newJson[k.toLowerCase()] = k === 'Price' ? +v : v;
        }
        this.push(JSON.stringify(newJson) + '\n');
        callback();
    }
});

async function csvToJson() {
    await asyncPipeline(
        fs.createReadStream(path.join(__dirname, './csv', 'data.csv')),
        csv(),
        jsonTransform,
        fs.createWriteStream(path.join(__dirname, './csv', 'output.txt'))
    );
}

csvToJson().catch(console.error);

