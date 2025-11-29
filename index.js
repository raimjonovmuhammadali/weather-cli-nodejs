import { getWeather, getIcons } from "./services/api.service.js";
import getArgs from "./helpers/args.js";
import { printError, printSuccess, printHelp, printWeather } from "./services/log.service.js";
import { saveKeyValue, getKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    return printError("Token does not exist");
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Token saved");
  } catch (error) {
    return printError(error.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    return printError("City does not exist");
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city);
    printSuccess("City saved");
  } catch (error) {
    return printError(error.message);
  }
};

const getForcast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
    if (!city) {
      throw new Error("City is not defined. Use command -s [CITY] to set it.");
    }
    const res = await getWeather(process.env.CITY ?? city);
    printWeather(res, getIcons(res.weather[0].icon));
  } catch (error) {
    if(error?.response?.status == 404){
        printError("City not found");
    }else if(error?.response?.status == 401){
        printError("Invalid API key");
    }else{
        printError(error.message);
    }
  }
};

const startCli = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    return printHelp();
    //help
  }

  if (args.s) {
    //save city
    return saveCity(args.s);
  }

  if (args.t) {
    return saveToken(args.t);
    //save token
  }

  getForcast();
};

startCli();
