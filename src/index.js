import { parseConfiguration } from "./scripts/jsonParser.js"

parseConfiguration("../../config.json").then(console.log).catch(console.error);
console.log("Configuration");
