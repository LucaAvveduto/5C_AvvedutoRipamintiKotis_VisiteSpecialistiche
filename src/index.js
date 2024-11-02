import { navBarComponent } from "./scripts/navbar.js";
import { createForm } from "./scripts/createForm.js";
import { createTable } from "./scripts/createTable.js";
import { generateFetchComponent } from "./scripts/fetchCache.js";
import moment from "../../node_modules/moment/dist/moment.js";

const forwardButton = document.getElementById("ahead");
const backButton = document.getElementById("back");
let offset = 0;


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
    let validateInput;
    const f = createForm(document.querySelector(".content"));
    f.setLabels(["Data","Ora","Nominativo"]);
    f.onsubmit((values) => {
        const date = moment(values[0],"YYYY/MM/DD");
        const closed = ["Saturday","Sunday"];
        if (date.calendar() < moment().calendar("MM/DD/YYYY") || closed.includes(date.format("dddd"))) validateInput = false; 
        const key = [element,date.format("DDMMYYYY"),values[1]].join("-");
        fetchComp.getData().then((respose) => {
            const json = JSON.parse(respose);
            if(!json[key] && !validateInput) {
                json[key] = values[2];
                fetchComp.setData(json).then(() => {
                    table.render(element,offset);
                    validateInput = true;
                    document.getElementById("result").innerHTML = validateInput === true ? "Ok" : "Ko";
                }).catch((error) => {
                    console.error(error);
                    validateInput = false;
                    document.getElementById("result").innerHTML = validateInput === true ? "Ok" : "Ko";
                });
            }else {
                validateInput = false;
                document.getElementById("result").innerHTML = validateInput === true ? "Ok" : "Ko";
            }
        }).catch((error) => {
            console.error(error);
            validateInput = false;
            document.getElementById("result").innerHTML = validateInput === true ? "Ok" : "Ko";
        });
    });
    f.render();
})

navbar.build("../../config.json").then(()=>{
    navbar.render();
}).catch(console.error);