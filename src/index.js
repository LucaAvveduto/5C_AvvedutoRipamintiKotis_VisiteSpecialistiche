import { createRequire } from "module";
const require = createRequire(import.meta.url);
const moment = require("moment");
moment.locale("it");
const monday = (moment().startOf('week'));        
const mondayDate = new Date(monday.format());
console.log(mondayDate.toLocaleDateString());
const tue = new Date(new Date().setDate(mondayDate.getDate() + 1));
console.log(tue.toLocaleDateString()); 