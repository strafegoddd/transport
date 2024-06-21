let memData = {
  garageId: '',
  vehicleId: ''
}

//Check auth
document.addEventListener('DOMContentLoaded', function() {
  const username = sessionStorage.getItem('login');
  const role = sessionStorage.getItem('role');

  if (!username || !role) {
      window.location.href = 'auth.html';  // если не авторизован, редирект на страницу входа
  } else {
      document.getElementById('welcome-message').textContent = 'Добро пожаловать, ' + username + '!';
      // Здесь можно выполнять действия, доступные только авторизованным пользователям
      if (role == 'Админ'){
        let hideTabs = document.getElementsByClassName('sidebar-card');
        for (let i=0; i < hideTabs.length; i++){
          hideTabs[i].style.display = 'none';
        }
        let admButt = document.getElementById('admin-butt');
        let favButt = document.getElementById('favorites-butt');
        let hbookButt = document.getElementById('handbook-butt');
        admButt.style.display = 'flex';
        favButt.style.display = 'flex';
        hbookButt.style.display = 'flex';
        document.getElementById("tab1").style.display = "none";
        document.getElementById("tab-admin").style.display = "block";
      }
      else{
        let hideTabs = document.getElementsByClassName('sidebar-card');
        for (let i=0; i < hideTabs.length; i++){
          hideTabs[i].style.display = 'flex';
        }
        let admButt = document.getElementById('admin-butt');
        admButt.style.display = 'none';
        document.getElementById("tab1").style.display = "block";
        document.getElementById("tab-admin").style.display = "none";
        document.getElementsByClassName("sidebar-card")[1].className += " active";
      }
  }
});

//Tabs and interface

function openTab(evt, tabName){
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    if(tabName == 'tab2'){
      fetchAllVehicleData()
    }
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

function openTabChoose(evt, tabName){
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  // if(tabName == 'tab2'){
  //   fetchAllVehicleData()
  // }
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
  delGarageButton.disabled=1;
  editGarageButton.disabled=1;
  chooseGarageButton.disabled=1;
  fetch('http://localhost:81/garageData.php')
  .then(response => response.json())
  .then(data => {

      const tbody = document.getElementById('garage-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.id = data[i].garage_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-garage" class="select-garage" /></td>
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
  fetch('http://localhost:81/allVehicleData.php')
  .then(response => response.json())
  .then(data => {
      const tbody = document.getElementById('vehicle-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.vehicle_id = data[i].vehicle_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-item" class="select-item" /></td>
                      <td>${data[i].vehicle_name}</td>
                      <td>${data[i].vehicle_id}</td>
                      <td>${data[i].type_name}</td>
                  `;

          tbody.appendChild(row);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

function fetchAllUserData() {
  fetch('http://localhost:81/allUserData.php')
  .then(response => response.json())
  .then(data => {

      const tbody = document.getElementById('user-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.user_id = data[i].user_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-item" class="select-item" /></td>
                      <td>${data[i].user_name}</td>
                      <td>X</td>
                      <td>${data[i].user_role}</td>
                      <td>${data[i].user_login}</td>
                      <td>${data[i].user_password}</td>
                  `;

          tbody.appendChild(row);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}


document.addEventListener('DOMContentLoaded', function() {
  fetchGarageData();
  fetchAllUserData();
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

//Admin
const addUserButton = document.getElementById('add-user');
const delUserButton = document.getElementById('del-user');
const editUserButton = document.getElementById('edit-user');

//addmin butt
addUserButton.addEventListener("click", function (){
  document.getElementById('user-add-modal').classList.add('open')
})

document.getElementById('user-close-modal-add').addEventListener("click", function (){
  document.getElementById('user-add-modal').classList.remove('open')
})

//editing butt
editUserButton.addEventListener("click", function (){
  document.getElementById('user-edit-modal').classList.add('open')
  })
  
document.getElementById('user-close-modal-edit').addEventListener("click", function (){
  document.getElementById('user-edit-modal').classList.remove('open')
  })

//Garage
const addGarageButton = document.getElementById('add-garage');
const delGarageButton = document.getElementById('del-garage');
const editGarageButton = document.getElementById('edit-garage');
const chooseGarageButton = document.getElementById('choose-garage');

//adding button
addGarageButton.addEventListener("click", function (){
  document.getElementById('garage-add-modal').classList.add('open')
})

document.getElementById('close-modal-add').addEventListener("click", function (){
  document.getElementById('garage-add-modal').classList.remove('open')
})

//editing button
editGarageButton.addEventListener("click", function (){
document.getElementById('garage-edit-modal').classList.add('open')
})

document.getElementById('close-modal-edit').addEventListener("click", function (){
document.getElementById('garage-edit-modal').classList.remove('open')
})

document.getElementById('select-all-garages').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-garage');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtons();
});

document.getElementById('garage-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-garage')) {
      toggleButtons();
  }
});

const toggleButtons = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-garage:checked');
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

addingForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = new FormData(addingForm);
  const response = await fetch('http://localhost:81/adding.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.success) {
      window.location.href = 'index.html';
  }
});

editingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-garage:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);

  const response = await fetch('http://localhost:81/editing.php', {
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
  const selectedCheckboxes = document.querySelectorAll('.select-garage:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://localhost:81/deleting.php', {
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

editGarageButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-garage:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('garage-name-edit').value = rowToEdit.cells[1].innerText;
  document.getElementById('address-edit').value = rowToEdit.cells[2].innerText;
  document.getElementById('number-edit').value = rowToEdit.cells[3].innerText;
  document.getElementById('square-edit').value = rowToEdit.cells[5].innerText;
  document.getElementById('owner-edit').value = rowToEdit.cells[6].innerText;
 document.getElementById('phone-edit').value = rowToEdit.cells[7].innerText;
});

chooseGarageButton.addEventListener('click', function() {
  openTabChoose(event, 'tab2');
  document.getElementsByClassName("sidebar-card")[3].className += " active";

  fetchVehicleData();

  const checkboxes = document.querySelectorAll('.select-garage:checked');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});



//Vehicle
const addVehicleButton = document.getElementById('add-vehicle');
const delVehicleButton = document.getElementById('del-vehicle');
const editVehicleButton = document.getElementById('edit-vehicle');
const chooseVehicleButton = document.getElementById('choose-vehicle');

//adding button
addVehicleButton.addEventListener("click", function (){
  document.getElementById('vehicle-add-modal').classList.add('open')
})

document.getElementById('vehicle-close-modal-add').addEventListener("click", function (){
  document.getElementById('vehicle-add-modal').classList.remove('open')
})

//editing button
editVehicleButton.addEventListener("click", function (){
document.getElementById('vehicle-edit-modal').classList.add('open')
})

document.getElementById('vehicle-close-modal-edit').addEventListener("click", function (){
document.getElementById('vehicle-edit-modal').classList.remove('open')
})

document.getElementById('select-all-vehicles').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-vehicle');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtonsVeh();
});

document.getElementById('vehicle-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-vehicle')) {
      toggleButtonsVeh();
  }
});

const toggleButtonsVeh = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  delVehicleButton.disabled = selectedCheckboxes.length === 0;
  editVehicleButton.disabled = selectedCheckboxes.length !== 1;
  chooseVehicleButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtonsVeh();
})

//Forms and button onclicks (fetches)
const vehicleAddingForm = document.getElementById('vehicle-adding-form');
const vehicleEditingForm = document.getElementById('vehicle-editing-form');

editVehicleButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-vehicle:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('vehicle-name-edit').value = rowToEdit.cells[1].innerText;
  document.getElementById('vehicle-type-edit').value = rowToEdit.cells[3].innerText;
});

vehicleAddingForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const formData = new FormData(vehicleAddingForm);
  const vehicleData = {
    vehicleName: formData.get('vehicle-name'),
    vehicleType: formData.get('vehicle-type'),
    garageId: memData.garageId[0]
};

  const response = await fetch('http://localhost:81/addingVehicle.php', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(vehicleData)
  });

  const result = await response.json();
  if (result.success) {
    document.getElementById('vehicle-add-modal').classList.remove('open');
    updateVehicleData();
  }
  // console.log(result);
});

vehicleEditingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-vehicle:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);

  const response = await fetch('http://localhost:81/editingVehicle.php', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToEdit, editData: editData})
  });

  const result = await response.json();
  if (result.success) {
    document.getElementById('vehicle-edit-modal').classList.remove('open');
    updateVehicleData();
  }
  //console.log(result);
});

delVehicleButton.addEventListener('click', function(){
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  
  fetch('http://localhost:81/deletingVehicle.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          UpdateVehicleData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
})

chooseVehicleButton.addEventListener('click', function() {
  openTabChoose(event, 'tab3');
  document.getElementsByClassName("sidebar-card")[5].className += " active";

  chooseIndicatorData();

  const checkboxes = document.querySelectorAll('.select-vehicle:checked');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});

function fetchVehicleData(){
  const selectedCheckboxes = document.querySelectorAll('.select-garage:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://localhost:81/choose.php', {
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
                  <td><input type="checkbox" name="select-vehicle" class="select-vehicle" /></td>
                  <td>${data[i].vehicle_name}</td>
                  <td>${data[i].vehicle_id}</td>
                  <td>${data[i].type_name}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error deleting data:', error));
}

function chooseIndicatorData(){
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://localhost:81/chooseIndicator.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.vehicleId = idToChoose;
  const tbody = document.getElementById('indicator-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    const row = document.createElement('tr');
      row.dataset.id = data[i].indicator_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-indicator" class="select-indicator" /></td>
                  <td>${data[i].garage_name}</td>
                  <td>${data[i].indicator_name}</td>
                  <td>${data[i].indicator_unit}</td>
                  <td>${data[i].viv_value}</td>
                  <td>${data[i].viv_time}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error choosing data:', error));
}

function updateVehicleData(){
  const idToChoose = memData.garageId;

  fetch('http://localhost:81/choose.php', {
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
                  <td><input type="checkbox" name="select-vehicle" class="select-vehicle" /></td>
                  <td>${data[i].vehicle_name}</td>
                  <td>${data[i].vehicle_id}</td>
                  <td>${data[i].type_name}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error deleting data:', error));
}
