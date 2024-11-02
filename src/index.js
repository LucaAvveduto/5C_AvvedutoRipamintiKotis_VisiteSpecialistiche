import {navBarCreate} from "./scripts/navbar.js";
import { createForm } from "./scripts/createForm.js";
import { createTable } from "./scripts/createTable.js";
import { generateFetchComponent } from "./scripts/fetchCache.js"

const f = createForm(document.querySelector(".content"));
f.setLabels(["Data","Ora","Nominativo"]);
f.render();

navBarCreate();
const fetchComp = generateFetchComponent();
fetchComp.build("../../config.json");

const table = createTable(document.getElementById("avabTable"));
table.buildTable().then(() => {
    table.render("Cardiologia");
}).catch(console.error)
