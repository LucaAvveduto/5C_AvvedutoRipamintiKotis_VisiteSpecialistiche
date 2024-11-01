import moment from "../../node_modules/moment/dist/moment.js"
import { generateFetchComponent } from "./fetchCache.js"
import { parseConfiguration } from "./jsonParser.js";

export const createTable = (parentElement) => {
  let availabilities = {};
  let config = {};
  let currentWeekOffset = 0;
  let fetchComp;
  moment.locale("it");
  

  const getWeekDates = (offset) => {
    const startOfWeek = offset < 0 ? (moment().startOf(`isoWeek`)).subtract(offset, `weeks`) : (moment().startOf(`isoWeek`)).add(offset, `weeks`); 
    const weekDates = [];

    for (let day = 0; day < 5; day++) {
      const date = startOfWeek.clone().add(day, `days`).format(`DDMMYYYY`);
      weekDates.push(date);
    }

    return weekDates;
  };


  return {
    render: (selectedCategory, offset) => {
      currentWeekOffset = offset ?? 0;
      fetchComp.getData().then((resp) => {
        console.log(resp);
        availabilities = JSON.parse(resp);
        const weekDates = getWeekDates(currentWeekOffset); 

        let headerRow = `<tr><th class="px-6 py-3">Ora</th>`;
        weekDates.forEach(date => {
          headerRow += `<th class="px-6 py-3">` + moment(date, `DDMMYYYY`).format("dddd DD/MM/YYYY") + `</th>`; 
        });
        headerRow += `</tr>`;

        const hours = config.hours;
        let rows = ``;
        hours.forEach(hour => {
          rows += `<tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"><th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` + hour + `:00</th>`;
          weekDates.forEach(date => {
            const key = selectedCategory + `-` + date + `-` + hour;
            const booking = availabilities[key] || ``;
            rows += `<td class="px-6 py-4"">` + (booking ? booking : ``) + `</td>`; 
          });
          rows += `</tr>`;
        });

        const tableHTML =
          `<table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"><thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">` + headerRow + `</thead>` +
          `<tbody>` + rows + `</tbody></table>`;

        parentElement.innerHTML = tableHTML;
      });
    },

    buildTable: () => { 
      return new Promise((resolve, reject) => {
        fetchComp = generateFetchComponent();
        fetchComp.build("../../config.json").then(() => {
          return parseConfiguration("../../config.json")
            .then((parsedConfig) => {
              config = parsedConfig;
              resolve("ok")
            });
        }).catch(reject)
      });

    }
  };
};