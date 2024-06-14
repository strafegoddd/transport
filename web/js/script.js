let memData = {
  garageId: '',
  vehicleId: ''
}

//Tabs and interface

function openTab(evt, tabName){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("sidebar-card");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

 document.getElementById("tab1").style.display = "block";
 document.getElementsByClassName("sidebar-card")[0].className += " active";

function burger(){
    let burger = document.querySelector('.sidebar-icon');
    let card = document.getElementsByClassName('sidebar-card')
    for (let i = 0; i < card.length; i++) {
        card[i].classList.toggle('burger');
    }
    burger.classList.toggle('active');
    //document.querySelector('.nav').classList.toggle('open');
}

//Table

function fetchGarageData() {
  fetch('http://185.187.90.199:81/garageData.php')
  .then(response => response.json())
  .then(data => {

      const tbody = document.getElementById('garage-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.id = data[i].garage_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-item" class="select-item" /></td>
                      <td>${data[i].garage_name}</td>
                      <td>${data[i].garage_address}</td>
                      <td>${data[i].garage_part_number}</td>
                      <td>${data[i].garage_space}</td>
                      <td>${data[i].garage_square}</td>
                      <td>${data[i].garage_owner}</td>
                      <td>${data[i].garage_phone}</td>
                  `;

          tbody.appendChild(row);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

function fetchAllVehicleData() {
  fetch('http://185.187.90.199:81/allVehicleData.php')
  .then(response => response.json())
  .then(data => {

      const tbody = document.getElementById('vehicle-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.id = data[i].garage_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-item" class="select-item" /></td>
                      <td>${data[i].garage_name}</td>
                      <td>${data[i].garage_address}</td>
                      <td>${data[i].garage_part_number}</td>
                      <td>${data[i].garage_space}</td>
                      <td>${data[i].garage_square}</td>
                      <td>${data[i].garage_owner}</td>
                      <td>${data[i].garage_phone}</td>
                  `;

          tbody.appendChild(row);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
  fetchGarageData();
  //fetchAllVehicleData();
});

//сортировка таблицы #1
/* const table = document.querySelector('table'); //get the table to be sorted

table.querySelectorAll('th') // get all the table header elements
  .forEach((element, columnNo)=>{ // add a click handler for each 
    element.addEventListener('click', event => {
        sortTable(table, columnNo); //call a function which sorts the table by a given column number
    })
  })

function sortTable(table, sortColumn){
  // get the data from the table cells
  const tableBody = table.querySelector('tbody')
  const tableData = table2data(tableBody);
  // sort the extracted data
  tableData.sort((a, b)=>{
    if(a[sortColumn] > b[sortColumn]){
      return 1;
    }
    return -1;
  })
  // put the sorted data back into the table
  data2table(tableBody, tableData);
}

function table2data(tableBody){
  const tableData = []; // create the array that'll hold the data rows
  tableBody.querySelectorAll('tr')
    .forEach(row=>{  // for each table row...
      const rowData = [];  // make an array for that row
      row.querySelectorAll('td')  // for each cell in that row
        .forEach(cell=>{
          rowData.push(cell.innerText);  // add it to the row data
        })
      tableData.push(rowData);  // add the full row to the table data 
    });
  return tableData;
}

// this function puts data into an html tbody element
function data2table(tableBody, tableData){
  tableBody.querySelectorAll('tr') // for each table row...
    .forEach((row, i)=>{  
      const rowData = tableData[i]; // get the array for the row data
      row.querySelectorAll('td')  // for each table cell ...
        .forEach((cell, j)=>{
          cell.innerText = rowData[j]; // put the appropriate array element into the cell
        })
    });
} */

//сортировка таблицы #2
const getCellValue = (tr, idx) => tr.children[idx].innerText || tr.children[idx].textContent;

const comparer = (idx, asc) => (a, b) => ((v1, v2) => 
    v1 !== '' && v2 !== '' && !isNaN(v1) && !isNaN(v2) ? v1 - v2 : v1.toString().localeCompare(v2)
    )(getCellValue(asc ? a : b, idx), getCellValue(asc ? b : a, idx));

// do the work...
document.querySelectorAll('th').forEach(th => th.addEventListener('click', (() => {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    Array.from(tbody.querySelectorAll('tr'))
      .sort(comparer(Array.from(th.parentNode.children).indexOf(th), this.asc = !this.asc))
      .forEach(tr => tbody.appendChild(tr) );
})));


/* function searchFunction() {
    // Объявить переменные
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementByClassName("table");
    tr = table.getElementsByTagName("tr");
  
    // Перебирайте все строки таблицы и скрывайте тех, кто не соответствует поисковому запросу
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
} */

//поиск
function searchFunction() {
  const input = document.getElementById("myInput");
  const inputStr = input.value.toUpperCase();
  document.querySelectorAll('.table tbody tr').forEach((tr) => {
    const anyMatch = [...tr.children]
      .some(td => td.textContent.toUpperCase().includes(inputStr));
    if (anyMatch) tr.style.removeProperty('display');
    else tr.style.display = 'none';
  });
}  

//Buttons

//Garage
const addGarageButton = document.getElementById('add-garage');
const delGarageButton = document.getElementById('del-garage');
const editGarageButton = document.getElementById('edit-garage');
const chooseGarageButton = document.getElementById('choose-garage');

//Vehicle
const addVehicleButton = document.getElementById('add-vehicle');
const delVehicleButton = document.getElementById('del-vehicle');
const editVehicleButton = document.getElementById('edit-vehicle');
const chooseVehicleButton = document.getElementById('choose-vehicle');

//adding button
addGarageButton.addEventListener("click", function (){
  document.getElementById('garage-add-modal').classList.add('open')
})

document.getElementById('close-modal-add').addEventListener("click", function (){
  document.getElementById('garage-add-modal').classList.remove('open')
})

addVehicleButton.addEventListener("click", function (){
  document.getElementById('vehicle-add-modal').classList.add('open')
})

document.getElementById('vehicle-close-modal-add').addEventListener("click", function (){
  document.getElementById('vehicle-add-modal').classList.remove('open')
})

//editing button
editGarageButton.addEventListener("click", function (){
document.getElementById('garage-edit-modal').classList.add('open')
})

document.getElementById('close-modal-edit').addEventListener("click", function (){
document.getElementById('garage-edit-modal').classList.remove('open')
})

document.getElementById('select-all').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-item');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtons();
});

document.getElementById('garage-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-item')) {
      toggleButtons();
  }
});

const toggleButtons = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-item:checked');
  delGarageButton.disabled = selectedCheckboxes.length === 0;
  editGarageButton.disabled = selectedCheckboxes.length !== 1;
  chooseGarageButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtons();
})

//Forms and button onclicks (fetches)
const editingForm = document.getElementById('editing-form');
const addingForm = document.getElementById('adding-form');
const vehicleAddingForm = document.getElementById('vehicle-adding-form');

addingForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(addingForm);
  const response = await fetch('http://185.187.90.199:81/adding.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.success) {
      window.location.href = 'index.html';
  }
});

vehicleAddingForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const formData = new FormData(vehicleAddingForm);
  const vehicleData = {
    vehicleName: formData.get('vehicle-name'),
    vehicleType: formData.get('vehicle-type'),
    garageId: memData.garageId[0]
};

  const response = await fetch('http://185.187.90.199:81/addingVehicle.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicleData)
  });

  const result = await response.json();
  if (result.success) {
    document.getElementById('vehicle-add-modal').classList.remove('open');
    fetchVehicleData();
  }
  // console.log(result);
});

editingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-item:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);

  const response = await fetch('http://185.187.90.199:81/editing.php', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToEdit, editData: editData})
  });

  const result = await response.json();
  if (result.success) {
      window.location.href = 'index.html';
  }
  //console.log(result);
});

delGarageButton.addEventListener('click', function() {
  const selectedCheckboxes = document.querySelectorAll('.select-item:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://185.187.90.199:81/deleting.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          fetchGarageData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
});

delVehicleButton.addEventListener('click', function(){
  const selectedCheckboxes = document.querySelectorAll('.select-item:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);
  
  fetch('http://185.187.90.199:81/deletingVehicle.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          fetchVehicleData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
})

editGarageButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-item:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('garage-name-edit').value = rowToEdit.cells[1].innerText;
  document.getElementById('address-edit').value = rowToEdit.cells[2].innerText;
  document.getElementById('number-edit').value = rowToEdit.cells[3].innerText;
  document.getElementById('square-edit').value = rowToEdit.cells[5].innerText;
  document.getElementById('owner-edit').value = rowToEdit.cells[6].innerText;
 document.getElementById('phone-edit').value = rowToEdit.cells[7].innerText;
});

chooseGarageButton.addEventListener('click', function() {
  openTab(event, 'tab2');
  document.getElementsByClassName("sidebar-card")[1].className += " active";

  fetchVehicleData();

  const checkboxes = document.querySelectorAll('.select-item:checked');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});

function fetchVehicleData(){
  const selectedCheckboxes = document.querySelectorAll('.select-item:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://185.187.90.199:81/choose.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.garageId = idToChoose;
  const tbody = document.getElementById('vehicle-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');
      row.dataset.id = data[i].vehicle_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-item" class="select-item" /></td>
                  <td>${data[i].vehicle_name}</td>
                  <td>${data[i].vehicle_id}</td>
                  <td>${data[i].type_name}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error deleting data:', error));
}
