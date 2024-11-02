import { navBarComponent } from "./scripts/navbar.js";
import { createForm } from "./scripts/createForm.js";
import { createTable } from "./scripts/createTable.js";
import { generateFetchComponent } from "./scripts/fetchCache.js"

const forwardButton = document.getElementById("ahead");
const backButton = document.getElementById("back");
let offset = 0;

const f = createForm(document.querySelector(".content"));
f.setLabels(["Data","Ora","Nominativo"]);
f.render();

const fetchComp = generateFetchComponent();
fetchComp.build("../../config.json");

const table = createTable(document.getElementById("avabTable"));
table.buildTable().then(console.log).catch(console.error)


const navbar = navBarComponent(document.getElementById("navbar"));
navbar.callback((element)=>{
    forwardButton.onclick = () => {
        offset++;
        table.render(element,offset);
    };
    
    backButton.onclick = () => {
        offset--;
        table.render(element,offset);
    };

    table.render(element,offset);
})

navbar.build("../../config.json").then(()=>{
    navbar.render();
}).catch(console.error);