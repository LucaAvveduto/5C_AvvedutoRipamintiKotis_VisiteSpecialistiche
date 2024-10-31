import moment from "../node_modules/moment/dist/moment.js";
moment.locale("it");
const monday = (moment().startOf('week'));        
const mondayDate = new Date(monday.format());
console.log(mondayDate.toLocaleDateString());
const tue = new Date(new Date().setDate(mondayDate.getDate() + 1));
console.log(tue.toLocaleDateString()); 
/*
import {navBarCreate} from "./scripts/navbar.js";

navBarCreate();*/