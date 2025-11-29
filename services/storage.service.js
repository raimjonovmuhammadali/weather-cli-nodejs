import os from 'os';
import path from 'path';
import fs from 'fs'

const filepath = path.join(os.homedir(), 'weather-data.json')

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city'
}

const saveKeyValue = async (key, value) => {
    let data = {}

    if(await isExist(filepath)){
        const file = await fs.promises.readFile(filepath);
        data = JSON.parse(file);
    }

    data[key] = value;
    await fs.promises.writeFile(filepath, JSON.stringify(data))   
}

const getKeyValue = async key => {
    if(await isExist(filepath)){
        const file = await fs.promises.readFile(filepath);
        const data = JSON.parse(file);
        return data[key];
    }
    return undefined;
}


const isExist = async path =>{
    try {
        await fs.promises.stat(path);
        return true;
    } catch (error) {
        return false;
    }
}
export { saveKeyValue, getKeyValue, TOKEN_DICTIONARY }