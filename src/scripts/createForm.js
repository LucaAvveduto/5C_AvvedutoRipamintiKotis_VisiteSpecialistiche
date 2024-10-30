export function createForm(parentElement) {
    let data = [];
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => {
            let types = ["date","number","text"];
            let html = "<div class='modal-body'>";
            html += data.map((name,index) => { 
                return types[index] === "number" ? 
                `<select class="form-select" aria-label="Default select example">
                    <option selected>Open this select menu</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>` :
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
                data.forEach((val) => document.getElementById(val).value = "");
                callback(result);
            }
            document.querySelector("#cancel").onclick = () => {
                data.forEach((val) => document.getElementById(val).value = "");
            }
        },
    };
};
