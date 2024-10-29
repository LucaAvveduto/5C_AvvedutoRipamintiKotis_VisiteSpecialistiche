export function createForm(parentElement) {
    let data = {};
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => { 
            let html = "<div class='txt-field'>Data<input type='date' class='form-control' id='dateInput'></div>\n";
            for(const key in data)  html += "<div class='txt-field'>" + key + "<input type='text' class='form-control' id='" + key + "'></div>\n";    
            html += 
                `<button id='cancel' class='btn btn-danger'>Cancel</button>
                <button id='submit' class='btn btn-success'>Submit</button>`
            ;
            parentElement.innerHTML = html;
            document.querySelector("#submit").onclick = () => {
                for(const key in data) {
                    result.push(document.getElementById(key).value);
                    document.getElementById(key).value = "";
                }
                callback((result) => {
                    console.log(result);
                });
            }
            document.querySelector("#cancel").onclick = () => {
                for(const key in data) document.getElementById(key).value = "";
            }
        },
    };
};
