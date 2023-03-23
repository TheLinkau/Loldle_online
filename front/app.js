function addChampInfo(nom) {
  const tableBody = document.querySelector('#resultats-table tbody');

  const newRow = document.createElement('tr');
  const tdChampion = document.createElement('td');
  tdChampion.textContent = champion;
  newRow.appendChild(tdChampion);
  const columns = ['gender', 'positions', 'species', 'resource', 'rangeType', 'regions', 'releaseYear', 'turn'];
  columns.forEach(column => {
    const td = document.createElement('td');
    td.textContent = '-';
    newRow.appendChild(td);
  });
  
  tableBody.insertBefore(newRow, tableBody.firstChild);
}

const champion = document.querySelector('#champion').value;
const form = document.querySelector('#recherche-form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  fetch('https://httpbin.org/get', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify({champion})
  })
  .then(response => response.json())
  .then(data => {
    addChampInfo(champion);
    console.log(data);
  })
  .catch(error => console.error(error));
});