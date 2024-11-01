import moment from "../node_modules/moment/dist/moment.js";
import {navBarCreate} from "./scripts/navbar.js";
import { createForm } from "./scripts/createForm.js";
import { createTable } from "./scripts/createTable.js";
import { generateFetchComponent } from "./scripts/fetchCache.js"


moment.locale("it");
const monday = (moment().startOf('week'));
console.log(monday.format("dddd"))
const mondayDate = new Date(monday.format());
console.log(mondayDate.toLocaleDateString());
const tue = new Date(new Date().setDate(mondayDate.getDate() + 1));
console.log(tue.toLocaleDateString()); 

const f = createForm(document.querySelector(".content"));
f.setLabels(["Data","Ora","Nominativo"]);
f.onsubmit(console.log)
f.render();

navBarCreate();
const fetchComp = generateFetchComponent();
fetchComp.build("../../config.json");

const table = createTable(document.getElementById("cicco"));
table.buildTable().then(() => {
    table.render("Cardiologia");
}).catch(console.error)
