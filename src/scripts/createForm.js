export function createForm(parentElement) {
    let data = [];
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => {
            let types = ["date","number","text"];
            let html = "<div class='modal-body'>";
            let tempHtml = "";
            html += data.map((name,index) => {
                if(types[index] === "number") {
                    tempHtml += 
                    `<div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Dropdown button
                        </button>
                        <ul class="dropdown-menu dropdown-menu-dark">
                            <li><a class="dropdown-item active" href="#">Action</a></li>
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                    </div>`;
                }
                else tempHtml += "<div class='label'>" + name + "<input type='" + types[index] +"' class='form-control' id='" + name + "'/></div>";
                return tempHtml;
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
