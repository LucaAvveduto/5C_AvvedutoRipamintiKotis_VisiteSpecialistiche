import moment from "../../node_modules/moment/dist/moment.js"

export const createTable = (parentElement) => {
  let availabilities = {};
  let config = {};
  let currentWeekOffset = 0;

  const getWeekDates = (offset) => {
    const startOfWeek = moment().startOf('isoWeek').add(offset, 'weeks');
    const weekDates = [];
  
    for (let day = 0; day < 5; day++) {
      const date = startOfWeek.clone().add(day, 'days').format('DDMMYYYY');
      weekDates.push(date);
    }

    return weekDates;
  };
  

  return{
     render:(selectedCategory) => {
      fetchCache("get").then((resp) => {
        availabilities = JSON.parse(resp.result);
        const weekDates = getWeekDates(currentWeekOffset);
  
        let headerRow = '<tr><th>Ora</th>';
        weekDates.forEach(date => {
          headerRow += '<th>' + moment(date, 'DDMMYYYY').format('dddd') + '</th>';
        });
        headerRow += '</tr>';
  
        const hours = [8, 9, 10, 11, 12];
        let rows = '';
        hours.forEach(hour => {
          rows += '<tr><td>' + hour + ':00</td>';
          weekDates.forEach(date => {
            const key = selectedCategory + '-' + date + '-' + hour;
            const booking = availabilities[key] || '';
            rows += '<td>' + (booking ? 'X' : '') + '</td>';
          });
          rows += '</tr>';
        });
  
        const tableHTML = 
          '<h3>' + selectedCategory + '</h3>' +
          '<table><thead>' + headerRow + '</thead>' +
          '<tbody>' + rows + '</tbody></table>';
  
        parentElement.innerHTML = tableHTML;
      });
    },
  
     buildTable: (dataInput) => {
      return parseConfiguration("../../config.json")
        .then((parsedConfig) => {
          config = parsedConfig;
          availabilities = dataInput;
          return fetchCache("set", availabilities);
        });
    }
  };
};
