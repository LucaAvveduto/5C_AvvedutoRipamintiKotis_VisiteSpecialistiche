export function createForm(parentElement) {
    let data = [];
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => {
            let types = ["date","number","text"];
            let html = "<div class='modal-body'>";
            let firstTime = 8;
            let lastTime = 12;
            html += data.map((name,index) => { 
                return types[index] === "number" ? 
                `<select class="form-select" id='` + name + `' aria-label="Default select example">
                    <option selected>Orario</option>`
                   + generateOptions(firstTime,lastTime) + "</select>" :
                    "<div class='label'>" + name + "<input type='" + types[index] +"' class='form-control' id='" + name + "'/></div>";
            }).join('\n') + "</div>";
            html += 
                `<div class="modal-footer">
                    <button type="button" class="btn btn-danger" id="cancel">Cancel</button>
                    <button id='submit' class='btn btn-success'>Submit</button>
                </div>`
            ;
            parentElement.innerHTML = html;
            document.querySelector("#submit").onclick = () => {
                const result = data.map((name) => {
                    return document.querySelector("#" + name).value;
                });
                data.forEach((val) => val === "Ora" ? document.getElementById(val).value = "Orario" :document.getElementById(val).value = "");
                callback(result);
            }
            document.querySelector("#cancel").onclick = () => {
                data.forEach((val) => val === "Ora" ? document.getElementById(val).value = "Orario" :document.getElementById(val).value = "");
            }
        },
    };
};

function generateOptions(firstItem,lastItem) {
    let result = "";
    const template = "<option value='%val'>%val</option>"
    for (let i = firstItem; i <= lastItem; i++) {
        result += template.replaceAll("%val", i);
    }
    return result;
}
