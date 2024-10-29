export function createForm(parentElement) {
    let data = {};
    let callback = null;
    return {
        setLabels: (labels) => { data = labels;},  
        onsubmit: (callbackInput) => { callback = callbackInput},
        render: () => { 
            let html = "<div class='txt-field'>Data<input type='date' class='form-control' id='dateInput'></div>\n";
            for(const key in data)  html += "<div class='txt-field'>" + key + "<input type='text' class='form-control' id='" + key + "'></div>\n";    
            html += "<button id='submit' class='btn btn-primary'>Submit</button>";
            parentElement.innerHTML = html;
            document.querySelector("#submit").onclick = () => {
                let result = [document.getElementById("dateInput").value];
                document.getElementById("dateInput").value = "";
                for(const key in data) {
                    result.push(document.getElementById(key).value);
                    document.getElementById(key).value = "";
                }
                callback(() => {
                    const res = {
                        date: new Date(result[0]).toLocaleDateString(),
                        rooms: {}
                    }
                    let index = 1;
                    for(const key in data) {
                        if(index < result.length) {
                            res.rooms[key] = result[index];
                            index++;
                        }
                    }
                    return res;
                });
            }          
        },
    };
};
