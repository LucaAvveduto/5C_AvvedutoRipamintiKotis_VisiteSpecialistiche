import { createRequire } from "module";
const require = createRequire(import.meta.url);
const moment = require("moment");

export const createTable = (parentElement) => {
  let data;
  let availabilities = {};
  let initialConfig;
  let currentWeekOffset = 0;
  const categories = ["Cardiologia", "Psicologia", "Oncologia", "Ortopedia", "Neurologia"]; //da usare il config.json

  const initializeAvailabilities = (config) => {
    initialConfig = config;
    let today = new Date();
    for (let i = 0; i < 30; i++) {
      let dateKey = new Date(today);
      dateKey.setDate(today.getDate() + i);
      dateKey = dateKey.toLocaleDateString();
      availabilities[dateKey] = {};
      for (const key in initialConfig) {
        availabilities[dateKey][key] = {};
        for (const hour in initialConfig[key]) {
          availabilities[dateKey][key][hour] = initialConfig[key][hour];
        }
      }
    }
  };

  const getWeekDates = (offset) => {
    const today = new Date();
    today.setDate(today.getDate() + offset * 7); //Usiamo la moment
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1);
    const weekDates = [];
    for (let i = 0; i < 5; i++) { // i<7 
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date);
    }
    return weekDates;
  };

  const renderAllTables = () => {
    parentElement.innerHTML = '';
    categories.forEach(category => {
      const tableHtml = render(category)();
      parentElement.innerHTML += tableHtml;
    });
  };

  return {
    render: (selectedCategory) => {
      return () => {
        fetchCache("get")
          .then((resp) => {
            availabilities = JSON.parse(resp.result);
          });

        const weekDates = getWeekDates(currentWeekOffset);
        let tableHTML = '<h3>' + selectedCategory + '</h3><table><thead><tr><th>Ora</th>';
        
        // formattazione delle intestazioni
        weekDates.forEach(date => {
          const formattedDate = moment(date).format('DD/MM/YYYY'); // Formato di esempio
          tableHTML += '<th>' + formattedDate + '</th>';
        });
        
        tableHTML += '</tr></thead><tbody>';

        for (let hour = 8; hour <= 12; hour++) {
          tableHTML += '<tr><td>' + hour + ':00</td>';
          weekDates.forEach(date => {
            const dateStr = date.toLocaleDateString();
            let availability = "N/A"; 
            if (availabilities[dateStr] && availabilities[dateStr][selectedCategory]) {
              availability = availabilities[dateStr][selectedCategory][hour] || "Disponibile";
            }
            tableHTML += '<td>' + availability + '</td>';
          });
          tableHTML += '</tr>';
        }
        tableHTML += '</tbody></table>';
        return tableHTML; 
      };
    },

    build: (dataInput) => {
      return new Promise((resolve, reject) => {
        data = dataInput; 
        initializeAvailabilities(data);

        fetchCache("get")
          .then((r) => JSON.parse(r.result))
          .then((response) => {
            if (response == null) {
              fetchCache("set", availabilities).then(resolve).catch(reject);
            } else {
              availabilities = response;
              resolve("No problem found");
            }
          })
          .catch(reject);
      });
    },

    changeWeek: (direction) => {
      currentWeekOffset += direction;
      renderAllTables();
    },

    add: (reservation) => {
      return new Promise((resolve, reject) => {
        const dateStr = reservation.date.toLocaleDateString(); 
        const hour = reservation.hour;
        const category = reservation.category;

        if (availabilities[dateStr] && availabilities[dateStr][category] && availabilities[dateStr][category][hour] > 0) {
          availabilities[dateStr][category][hour] -= 1;
          fetchCache("set", availabilities).then(resolve).catch(reject);
        } else {
          resolve(false);
        }
      });
    }
  };
};
