export const createTable = (parentElement) => {
    let data;
    let header;
    let availabilities = {};
    let initialConfig;
  
    // Inizializzazione delle disposnibilità (dizionario)
    const initializeAvailabilities = (config) => {
      initialConfig = config;
      let today = new Date();
      for (let i = 0; i < 30; i++) {
        let dateKey = new Date(new Date().setDate(today.getDate() + i)).toLocaleDateString();
        availabilities[dateKey] = {};
        for (const key in initialConfig) {
          availabilities[dateKey][key] = initialConfig[key]; //Copia delle disponibilità iniziali
        }
      }
    };
  
    return {
      build: (dataInput) => {
        return new Promise((resolve, reject) => {
          data = dataInput; // dizionario di configurazione iniziale (camere disponibili per tipo)
          header = data;
          initializeAvailabilities(data);
          fetchCache("get").then((r) => JSON.parse(r.result)).then((response) => {
            if (response == null) {
              fetchCache("set", availabilities).then(resolve).catch(reject);
              return;
            }
            //se nelle chiavi del dizionario iniziale (singola, doppia, suite) allora aggiungila
            else if (Object.keys(response[Object.keys(response)[0]]).length != Object.keys(initialConfig).length ||
              Object.keys(response[Object.keys(response)[0]]).some(key => !Object.keys(initialConfig).includes(key))
            ) {
              availabilities = response;
              for (const key in response) {
                for (const type in initialConfig) {
                  if (!availabilities[key] || !availabilities[key][type]) {
                    availabilities[key][type] = initialConfig[type];
                  }
                }
              }
              fetchCache("set", availabilities).then(resolve).catch(reject);
              return;
            }
            else availabilities = response;
            resolve("No problem found");
          });
        });
      },
  
      render: () => {
  
        fetchCache("get").then(resp => {
          availabilities = JSON.parse(resp.result)
        }).then(() => {
          let head = `<table class="table table-striped"><thead><th>Data</th>`;
          for (const key in header) head += `<th>` + key + `</th>`;
          let body = `<tbody>`;
          let today = new Date();
          for (let i = 0; i < 30; i++) {
            let dateStr = new Date(new Date().setDate(today.getDate() + i)).toLocaleDateString();
            body += `<tr><td>` + dateStr + `</td>`;
            for (const key in header) {
              body += `<td>` + (availabilities[dateStr] ? availabilities[dateStr][key] : 0) + `</td>`;
            }
            body += `</tr>`;
          }
          parentElement.innerHTML = head + body + `</tbody></table>`;
        });
      },
  
      add: (reservation) => {
        return new Promise((resolve, reject) => {
          try {
            let isValid = true;
            //Controlla la validità della prenotazione
            if (!availabilities[reservation.date]) {
  
              availabilities[reservation.date] = initialConfig;
  
              for (const type in reservation.rooms) {
                if (availabilities[reservation.date][type] < reservation.rooms[type]) { //controlla se il numero di camere prenotate è maggiore numero di camere disponibili, per una determinata tipologia di camera e per una data specifica.
                  isValid = false;
                }
              }
            }
  
  
            for (const type in reservation.rooms) {
              if (!availabilities[reservation.date][type]) {
                availabilities[reservation.date][type] = initialConfig[type];
              }
              else if (availabilities[reservation.date][type] < reservation.rooms[type]) { //controlla se il numero di camere prenotate è maggiore numero di camere disponibili, per una determinata tipologia di camera e per una data specifica.
                isValid = false;
              }
            }
            if (isValid) {
              //Sottrai le camere prenotate
              for (const type in reservation.rooms) {
                availabilities[reservation.date][type] -= reservation.rooms[type]; //sottrae il numero di camere prenotate dal numero di camere disponibili, per una determinata tipologia di camera e per una data specifica.
              }
  
              //Salvo le disponibilità aggiornate in remoto
              fetchCache("set", availabilities).then(console.log).catch(console.error);
              console.log(availabilities);
              resolve(true);
            } else {
              resolve(false);
            }
          } catch (e) {
            reject(e);
          }
        })
      }
    };
  };
  
  