import {
    parseConfiguration
} from "./jsonParser.js"

export function navBarCreate() {
    return parseConfiguration("../../config.json").then((c) => {
            const navbar = document.getElementById("navbar");
            const config = c.tipologie;
    
            let newNavBar = `<div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div class="relative flex h-16 items-center justify-between">
                
                <div class="flex items-center">
                  <div class="flex space-x-4">
                    `
    
            config.forEach((element) => {
                newNavBar += `<button class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white" id=${element}>${element}</button>`
            })
            newNavBar += `</div>
                </div>
          
                
                <div class="flex items-center">
                    <button type="button" class="rounded-full bg-gray-700 p-2 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Prenota
                    </button>
                </div>
              </div>
            </div>`;
    
            navbar.innerHTML += newNavBar;
    
            activeNavBar(config[0], config);
    
            config.forEach(element => document.getElementById(element).onclick = () => activeNavBar(element, config))

            function activeNavBar(element, config) {
                deactiveAllNavBar(config);
                document.getElementById(element).classList.remove("text-gray-300", "hover:bg-gray-700", "hover:text-white");
                document.getElementById(element).classList.add("text-white");
            }
        
            function deactiveAllNavBar(config) {
                config.forEach((element) => {
                    document.getElementById(element).classList.remove("text-white");
                    document.getElementById(element).classList.add("text-gray-300", "hover:bg-gray-700", "hover:text-white");
                })
            }
    
        
    }).catch(console.error)
}