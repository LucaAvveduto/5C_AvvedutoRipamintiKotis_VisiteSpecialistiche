export function createForm(parentElement) {
    let data = [];
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => { 
            let html = data.map((name) => {
                return "<div>" + name + "\n<input type='text' class='form-control' id='" + name + "'/></div>";
            }).join('\n')
            html += 
                `<button id='cancel' class='btn btn-danger'>Cancel</button>
                 <button id='submit' class='btn btn-success'>Submit</button>`
            ;
            parentElement.innerHTML = html;
            document.querySelector("#submit").onclick = () => {
                const result = data.map((name) => {
                    return document.querySelector("#" + name).value;
                });
                callback(result);
            }
            document.querySelector("#cancel").onclick = () => {
                for(const key in data) document.getElementById(key).value = "";
            }
        },
    };
};
