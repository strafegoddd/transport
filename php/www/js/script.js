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
    if (evt.currentTarget.classList.contains("disabled")) {
      return;
  }
    tabcontent = document.getElementsByClassName("tabcontent");
    if(tabName == 'tab1'){
      disableTabs(['garage-ind-butt', 'veh-butt', 'char-butt', 'ind-butt', 'ei-butt']);
      fetchGarageData();
    }
    if(tabName == 'tab2'){
      disableTabs(['char-butt', 'ind-butt']);
    }
    if(tabName == 'tab-vehicle-char'){
      disableTabs(['ei-butt']);
    }
    if(tabName == 'tab3'){
      disableTabs(['ei-butt']);
    }
    if(tabName == 'tab4'){
      fetchEI();
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

function activateTabs(tabIds) {
  tabIds.forEach(function(tabId) {
      document.getElementById(tabId).classList.remove("disabled");
  });
}

function disableTabs(tabIds) {
  tabIds.forEach(function(tabId) {
      document.getElementById(tabId).classList.add("disabled");
  });
}

//Table

function fetchGarageData() {
  delGarageButton.disabled=1;
  editGarageButton.disabled=1;
  chooseGarageButton.disabled=1;
  fetch('http://185.187.90.199:81/garageData.php')
  .then(response => response.json())
  .then(data => {
    //console.log(data);
      const tbody = document.getElementById('garage-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        if (data[i].garage_pn === sessionStorage.getItem('part_number')){
          const row = document.createElement('tr');
          row.dataset.id = data[i].garage_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-garage" class="select-garage" /></td>
                      <td>${data[i].garage_name}</td>
                      <td>${data[i].garage_address}</td>
                      <td>${data[i].garage_pn}</td>
                      <td>${data[i].garage_space}</td>
                      <td>${data[i].garage_square}</td>
                      <td>${data[i].garage_owner}</td>
                      <td>${data[i].garage_phone}</td>
                  `;

          tbody.appendChild(row);
        }
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
          row.dataset.id = data[i].vehicle_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-vehicle" class="select-vehicle" /></td>
                      <td>${data[i].vehicle_name}</td>
                      <td>${data[i].type_name}</td>
                      <td>${data[i].vehicle_subtype}</td>
                      <td>${data[i].vehicle_serial_number}</td>
                  `;

          tbody.appendChild(row);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

function vehAddTap(){
  fetch('http://185.187.90.199:81/allVehicleData.php')
  .then(response => response.json())
  .then(data => {
      const selVeh = document.getElementById('vehicle-name');
      selVeh.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const optVehName = document.createElement('option');
          optVehName.value = data[i].vehicle_name;
          optVehName.textContent = data[i].vehicle_name;
          selVeh.appendChild(optVehName);
      }
  })
  .catch(error => console.error('Error fetching data:', error));
}

function charAddTap(selectElem){
  fetch('http://185.187.90.199:81/allIndicatorData.php')
  .then(response => response.json())
  .then(data => {
      selectElem.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          if (data[i].indicator_type === 'Характеристика'){
            const optCharName = document.createElement('option');
            optCharName.value = data[i].indicator_name;
            optCharName.textContent = data[i].indicator_name;
            selectElem.appendChild(optCharName);
          }
      }
      // console.log(data);
  })
  .catch(error => console.error('Error fetching data:', error));
}

function indAddTap(selectElem){
  fetch('http://185.187.90.199:81/allIndicatorData.php')
  .then(response => response.json())
  .then(data => {
      selectElem.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          if (data[i].indicator_type === 'Показатель'){
            const optIndicatorName = document.createElement('option');
            optIndicatorName.value = data[i].indicator_name;
            optIndicatorName.textContent = data[i].indicator_name;
            selectElem.appendChild(optIndicatorName);
          }
      }
      // console.log(data);
  })
  .catch(error => console.error('Error fetching data:', error));
}

function eiAddTap(selectElem){
  fetch('http://185.187.90.199:81/allEIdata.php')
  .then(response => response.json())
  .then(data => {
      selectElem.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
        const optEIName = document.createElement('option');
        optEIName.value = data[i].ei_name;
        optEIName.textContent = data[i].ei_name;
        selectElem.appendChild(optEIName);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error fetching data:', error));
}

function fetchAllUserData() {
  fetch('http://185.187.90.199:81/allUserData.php')
  .then(response => response.json())
  .then(data => {

      const tbody = document.getElementById('user-data');
      tbody.innerHTML = '';
      for (let i = 0; i < data.length; i++) {
          const row = document.createElement('tr');
          row.dataset.id = data[i].user_id;
          row.innerHTML = `
                      <td><input type="checkbox" name="select-user" class="select-user" /></td>
                      <td>${data[i].user_name}</td>
                      <td>${data[i].user_pn}</td>
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

document.getElementById('select-all-users').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-user');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtonsUser();
});

document.getElementById('user-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-user')) {
      toggleButtonsUser();
  }
});

const toggleButtonsUser = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-user:checked');
  delUserButton.disabled = selectedCheckboxes.length === 0;
  editUserButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtonsUser();
})

//Forms
const userEditingForm = document.getElementById('user-editing-form');
const userAddingForm = document.getElementById('user-adding-form');

userAddingForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const formData = new FormData(userAddingForm);
  const response = await fetch('http://185.187.90.199:81/addingUser.php', {
      method: 'POST',
      body: formData
  });

  const result = await response.json();
  if (result.success) {
      window.location.href = 'index.html';
  }
});

userEditingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-user:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);

  const response = await fetch('http://185.187.90.199:81/userEditing.php', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToEdit, editData: editData})
  });

  const result = await response.json();
  //console.log(result);
  if (result.success) {
      window.location.href = 'index.html';
  }
  console.log(result);
});

editUserButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-user:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('edit-user-name').value = rowToEdit.cells[1].innerText;
  document.getElementById('edit-user-role').value = rowToEdit.cells[3].innerText;
  document.getElementById('edit-user-login').value = rowToEdit.cells[4].innerText;
  document.getElementById('edit-user-password').value = rowToEdit.cells[5].innerText;
  document.getElementById('edit-user-part').value = rowToEdit.cells[2].innerText;
});

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
  const response = await fetch('http://185.187.90.199:81/adding.php', {
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
  const selectedCheckboxes = document.querySelectorAll('.select-garage:checked');
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
  activateTabs(['veh-butt', 'garage-ind-butt']);
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
const chooseVehCharButton = document.getElementById('choose-vehicle-char');

//adding button
addVehicleButton.addEventListener("click", function (){
  document.getElementById('vehicle-add-modal').classList.add('open');
  vehAddTap();
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
  chooseVehCharButton.disabled = selectedCheckboxes.length !== 1;
  if (selectedCheckboxes.length === 1){
    activateTabs(['ei-butt']);
  }
  else{
    disableTabs(['ei-butt']);
  }
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

  const response = await fetch('http://185.187.90.199:81/editingVehicle.php', {
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
  activateTabs(['char-butt', 'ind-butt', 'ei-butt']);
  chooseIndicatorData();

  const checkboxes = document.querySelectorAll('.select-vehicle:checked');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});

chooseVehCharButton.addEventListener('click', function() {
  openTabChoose(event, 'tab-vehicle-char');
  activateTabs(['char-butt', 'ind-butt', 'ei-butt'])
  document.getElementsByClassName("sidebar-card")[4].className += " active";

  chooseCharacterData();

  const checkboxes = document.querySelectorAll('.select-vehicle:checked');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
});

function fetchVehicleData(){
  const selectedCheckboxes = document.querySelectorAll('.select-garage:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);
  const rowToEdit = selectedCheckboxes[0].closest('tr');
  document.getElementsByClassName('info')[0].innerText = rowToEdit.cells[1].innerText;

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
                  <td><input type="checkbox" name="select-vehicle" class="select-vehicle" /></td>
                  <td>${data[i].vehicle_name}</td>
                  <td>${data[i].type_name}</td>
                  <td>${data[i].vehicle_subtype}</td>
                  <td>${data[i].vehicle_serial_number}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error deleting data:', error));
}

function chooseIndicatorData(){
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);
  const rowToEdit = selectedCheckboxes[0].closest('tr');
  document.getElementsByClassName('info')[2].innerText = rowToEdit.cells[1].innerText;
  disableTabs(['char-butt','ei-butt']);

  fetch('http://185.187.90.199:81/chooseIndicator.php', {
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
    if (data[i].indicator_type === 'Показатель'){
      const row = document.createElement('tr');
      row.dataset.id = data[i].viv_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-indicator" class="select-indicator" /></td>
                  <td>${data[i].indicator_name}</td>
                  <td>${data[i].indicator_unit}</td>
                  <td>${data[i].viv_value}</td>
                  <td>${data[i].viv_date}</td>
              `;

      tbody.appendChild(row);
    }
  }
})
.catch(error => console.error('Error choosing data:', error));
}

function chooseCharacterData(){
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);
  const rowToEdit = selectedCheckboxes[0].closest('tr');
  document.getElementsByClassName('info')[1].innerText = rowToEdit.cells[1].innerText;
  disableTabs(['ind-butt','ei-butt']);

  fetch('http://185.187.90.199:81/chooseIndicator.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.vehicleId = idToChoose;
  const tbody = document.getElementById('char-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].indicator_type === 'Характеристика'){
      const row = document.createElement('tr');
      row.dataset.id = data[i].indicator_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-char" class="select-char" /></td>
                  <td>${data[i].indicator_name}</td>
                  <td>${data[i].indicator_unit}</td>
                  <td>${data[i].viv_value}</td>
                  <td>${data[i].viv_date}</td>
              `;

      tbody.appendChild(row);
    }
  }
})
.catch(error => console.error('Error choosing data:', error));
}

function updateVehicleData(){
  const idToChoose = memData.garageId;

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
                  <td><input type="checkbox" name="select-vehicle" class="select-vehicle" /></td>
                  <td>${data[i].vehicle_name}</td>
                  <td>${data[i].type_name}</td>
                  <td>${data[i].vehicle_subtype}</td>
                  <td>${data[i].vehicle_serial_number}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error deleting data:', error));
}

//Buttons

//Characters
const addCharButton = document.getElementById('add-char');
const delCharButton = document.getElementById('del-char');
const editCharButton = document.getElementById('edit-char');

//addmin butt
addCharButton.addEventListener("click", function (){
  document.getElementById('char-add-modal').classList.add('open');
  resetCharForm();
  const initialSelect = document.querySelector('.char-name');
  charAddTap(initialSelect);
})

document.getElementById('char-close-modal-add').addEventListener("click", function (){
  document.getElementById('char-add-modal').classList.remove('open')
})

//editing butt
editCharButton.addEventListener("click", function (){
  document.getElementById('char-edit-modal').classList.add('open')
  })
  
document.getElementById('char-close-modal-edit').addEventListener("click", function (){
  document.getElementById('char-edit-modal').classList.remove('open')
  })

document.getElementById('select-all-chars').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-char');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtonsChar();
});

document.getElementById('char-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-char')) {
      toggleButtonsChar();
  }
});

const toggleButtonsChar = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-char:checked');
  delCharButton.disabled = selectedCheckboxes.length === 0;
  editCharButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtonsChar();
}) 

//Forms
const charEditingForm = document.getElementById('char-editing-form');
const charAddingForm = document.getElementById('char-adding-form');

charAddingForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const charNames = document.querySelectorAll('.char-name');
  const charValues = document.querySelectorAll('.char-value');
  const data = [];

  for (let i = 0; i < charNames.length; i++) {
    data.push({
        name: charNames[i].value,
        value: charValues[i].value,
        vehId: memData.vehicleId[0]
    });
  }
  //console.log(data);
  fetch('http://185.187.90.199:81/addingChar.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      console.log('yes');
      document.getElementById('char-add-modal').classList.remove('open');
      updateCharacterData();
    } else {
        console.log('Произошла ошибка');
    }
  })
  .catch(error => console.error('Error:', error));
});

function resetCharForm() {
  const charsContainer = document.getElementById('chars-container');
  charsContainer.innerHTML = `
      <div class="couple">
          <div class="label-couple">
              <label>Характеристика</label>
              <select class="char-name" name="char-name">
              </select>
          </div>
          <div class="label-couple">
              <label>Значение</label>
              <input class="char-value" name="char-value" type="text" placeholder="0">
          </div>
      </div>
  `;
}

document.getElementById('add-more-char').addEventListener('click', function() {
  // Создание новых полей
  const newFields = document.createElement('div');
  newFields.classList.add('couple');
  newFields.innerHTML = `
      <div class="label-couple">
          <label>Характеристика</label>
          <select class="char-name" name="char-name">
          </select>
      </div>
      <div class="label-couple">
          <label>Значение</label>
          <input class="char-value" name="char-value" type="text" placeholder="0">
      </div>
  `;

  // Добавление новых полей в контейнер
  document.getElementById('chars-container').appendChild(newFields);
  const newSelect = newFields.querySelector('.char-name');
  charAddTap(newSelect); // Загрузка характеристик в новый select
});

function updateCharacterData(){
  const idToChoose = memData.vehicleId;

  fetch('http://185.187.90.199:81/chooseIndicator.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.vehicleId = idToChoose;
  const tbody = document.getElementById('char-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].indicator_type === 'Характеристика'){
      const row = document.createElement('tr');
      row.dataset.id = data[i].indicator_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-char" class="select-char" /></td>
                  <td>${data[i].indicator_name}</td>
                  <td>${data[i].indicator_unit}</td>
                  <td>${data[i].viv_value}</td>
                  <td>${data[i].viv_date}</td>
              `;

      tbody.appendChild(row);
    }
  }
})
.catch(error => console.error('Error choosing data:', error));
}

delCharButton.addEventListener('click', function(){
  const selectedCheckboxes = document.querySelectorAll('.select-char:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://185.187.90.199:81/deletingChar.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          updateCharacterData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
})

charEditingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-char:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);

  const response = await fetch('http://185.187.90.199:81/charEditing.php', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToEdit, editData: editData})
  });

  const result = await response.json();
  //console.log(result);
  if (result.success) {
    document.getElementById('char-edit-modal').classList.remove('open');
    updateCharacterData();
  }
  console.log(result);
});

editCharButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-char:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('edit-char-value').value = rowToEdit.cells[3].innerText;
});

//Indicators
const addIndButton = document.getElementById('add-indicator');
const delIndButton = document.getElementById('del-indicator');
const editIndButton = document.getElementById('edit-indicator');

//addmin butt
addIndButton.addEventListener("click", function (){
  document.getElementById('indicator-add-modal').classList.add('open');
  resetIndForm();
  const initialSelect = document.querySelector('.indicator-name');
  indAddTap(initialSelect);
})

document.getElementById('indicator-close-modal-add').addEventListener("click", function (){
  document.getElementById('indicator-add-modal').classList.remove('open')
})

//editing butt
editIndButton.addEventListener("click", function (){
  document.getElementById('indicator-edit-modal').classList.add('open')
  })
  
document.getElementById('indicator-close-modal-edit').addEventListener("click", function (){
  document.getElementById('indicator-edit-modal').classList.remove('open')
  })

document.getElementById('select-all-indicators').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-indicator');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtonsChar();
});

document.getElementById('indicator-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-indicator')) {
      toggleButtonsInd();
  }
});

const toggleButtonsInd = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-indicator:checked');
  delIndButton.disabled = selectedCheckboxes.length === 0;
  editIndButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtonsInd();
}) 

//Forms
const indEditingForm = document.getElementById('indicator-editing-form');
const indAddingForm = document.getElementById('indicator-adding-form');

indAddingForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const indNames = document.querySelectorAll('.indicator-name');
  const indValues = document.querySelectorAll('.indicator-value');
  const startDates = document.querySelectorAll('.data-start-ind');
  const endDates = document.querySelectorAll('.data-end-ind');
  const data = [];

  for (let i = 0; i < indNames.length; i++) {
    data.push({
        name: indNames[i].value,
        value: indValues[i].value,
        startDate: startDates[i].value,
        endDate: endDates[i].value,
        vehId: memData.vehicleId[0]
    });
  }
  // console.log(data);
  fetch('http://185.187.90.199:81/addingIndicator.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    // console.log(data);
    if (data.success) {
      console.log('yes');
      document.getElementById('indicator-add-modal').classList.remove('open');
      updateIndicatorData();
    } else {
        console.log('Произошла ошибка');
    }
  })
  .catch(error => console.error('Error:', error));
});

function resetIndForm() {
  const indsContainer = document.getElementById('indicators-container');
  indsContainer.innerHTML = `
      <div class="couple">
          <div class="label-couple">
              <label>Показатель</label>
              <select class="indicator-name" name="indicator-name">
              </select>
          </div>
          <div class="label-couple">
              <label>Значение</label>
              <input class="indicator-value" name="indicator-value" type="text" placeholder="0">
          </div>
          <div class="label-couple">
              <label>Дата начальное</label>
              <input class="data-start-ind" name="data-start-ind" type="date" placeholder="10.10.1999">
          </div>
          <div class="label-couple">
              <label>Дата конечное</label>
              <input class="data-end-ind" name="data-end-ind" type="date" placeholder="10.10.1999">
          </div>
      </div>
  `;
}

document.getElementById('add-more-indicator').addEventListener('click', function() {
  // Создание новых полей
  const newFields = document.createElement('div');
  newFields.classList.add('couple');
  newFields.innerHTML = `
      <div class="label-couple">
          <label>Показатель</label>
          <select class="indicator-name" name="indicator-name">
          </select>
      </div>
      <div class="label-couple">
          <label>Значение</label>
          <input class="indicator-value" name="indicator-value" type="text" placeholder="0">
      </div>
      <div class="label-couple">
          <label>Дата начальное</label>
          <input class="data-start-ind" name="data-start-ind" type="date" placeholder="10.10.1999">
      </div>
      <div class="label-couple">
        <label>Дата конечное</label>
        <input class="data-end-ind" name="data-end-ind" type="date" placeholder="10.10.1999">
      </div>
  `;

  // Добавление новых полей в контейнер
  document.getElementById('indicators-container').appendChild(newFields);
  const newSelect = newFields.querySelector('.indicator-name');
  indAddTap(newSelect); // Загрузка характеристик в новый select
});

function updateIndicatorData(){
  const idToChoose = memData.vehicleId;

  fetch('http://185.187.90.199:81/chooseIndicator.php', {
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
    if (data[i].indicator_type === 'Показатель'){
      const row = document.createElement('tr');
      row.dataset.id = data[i].viv_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-indicator" class="select-indicator" /></td>
                  <td>${data[i].indicator_name}</td>
                  <td>${data[i].indicator_unit}</td>
                  <td>${data[i].viv_value}</td>
                  <td>${data[i].viv_date}</td>
              `;

      tbody.appendChild(row);
    }
  }
})
.catch(error => console.error('Error choosing data:', error));
}

delIndButton.addEventListener('click', function(){
  const selectedCheckboxes = document.querySelectorAll('.select-indicator:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://185.187.90.199:81/deletingInd.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          updateIndicatorData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
})

indEditingForm.addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const formData = new FormData(this);
  const editData = {};
  formData.forEach((value, key) => {
    editData[key] = value;
  });

  const selectedCheckbox = document.querySelector('.select-indicator:checked');
  const idToEdit = parseInt(selectedCheckbox.closest('tr').dataset.id, 10);
  
  const response = await fetch('http://185.187.90.199:81/indEditing.php', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: idToEdit, editData: editData})
  });

  const result = await response.json();
  // console.log(result);
  if (result.success) {
    document.getElementById('indicator-edit-modal').classList.remove('open');
    updateIndicatorData();
  }
});

editIndButton.addEventListener('click', function() {
  const selectedCheckbox = document.querySelector('.select-indicator:checked');
  const rowToEdit = selectedCheckbox.closest('tr');
  
  document.getElementById('indicator-value-edit').value = rowToEdit.cells[3].innerText;
});

//EI
//Indicators
const addEIButton = document.getElementById('calculate-ei');
const delEIButton = document.getElementById('del-ei');
const editEIButton = document.getElementById('edit-ei');

//addmin butt
addEIButton.addEventListener("click", function (){
  document.getElementById('ei-add-modal').classList.add('open');
  resetEIForm();
  const initialSelect = document.querySelector('.ei-name');
  eiAddTap(initialSelect);
})

document.getElementById('ei-close-modal-add').addEventListener("click", function (){
  document.getElementById('ei-add-modal').classList.remove('open')
})

//editing butt
editEIButton.addEventListener("click", function (){
  document.getElementById('ei-edit-modal').classList.add('open')
  })
  
document.getElementById('ei-close-modal-edit').addEventListener("click", function (){
  document.getElementById('ei-edit-modal').classList.remove('open')
  })

document.getElementById('select-all-eis').addEventListener('change', function(event) {
  const checkboxes = document.querySelectorAll('.select-ei');
  checkboxes.forEach(checkbox => {
      checkbox.checked = event.target.checked;
  });
  toggleButtonsEI();
});

document.getElementById('ei-data').addEventListener('change', function(event) {
  if (event.target.classList.contains('select-ei')) {
      toggleButtonsEI();
  }
});

const toggleButtonsEI = () => {
  const selectedCheckboxes = document.querySelectorAll('.select-ei:checked');
  delEIButton.disabled = selectedCheckboxes.length === 0;
  editEIButton.disabled = selectedCheckboxes.length !== 1;
};

document.addEventListener('DOMContentLoaded', function(){
  toggleButtonsEI();
})

//Forms
const eiEditingForm = document.getElementById('ei-editing-form');
const eiCalcForm = document.getElementById('ei-adding-form');

eiCalcForm.addEventListener('submit', async function(event){
  event.preventDefault();

  const eiNames = document.querySelectorAll('.ei-name');
  const startDates = document.querySelectorAll('.data-start-ei');
  const endDates = document.querySelectorAll('.data-end-ei');
  const data = [];
//!!!
  for (let i = 0; i < eiNames.length; i++) {
    data.push({
        name: eiNames[i].value,
        startDate: startDates[i].value,
        endDate: endDates[i].value,
        vehId: memData.vehicleId[0]
    });
  }
   //console.log(data);
  fetch('http://185.187.90.199:81/calculateEI.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
     //console.log(data);
    if (data.success) {
      console.log('yes');
      document.getElementById('ei-add-modal').classList.remove('open');
      updateEIData();
    } else {
        console.log('Произошла ошибка');
    }
  })
  .catch(error => console.error('Error:', error));
});

function resetEIForm() {
  const indsContainer = document.getElementById('eis-container');
  indsContainer.innerHTML = `
      <div class="couple">
          <div class="label-couple">
              <label>Показатель эффективности</label>
              <select class="ei-name" name="ei-name">
              </select>
          </div>
          <div class="label-couple">
              <label>Дата начальное</label>
              <input class="data-start-ei" name="data-start-ei" type="date" placeholder="10.10.1999">
          </div>
          <div class="label-couple">
              <label>Дата конечное</label>
              <input class="data-end-ei" name="data-end-ei" type="date" placeholder="10.10.1999">
          </div>
      </div>
  `;
}

document.getElementById('add-more-ei').addEventListener('click', function() {
  // Создание новых полей
  const newFields = document.createElement('div');
  newFields.classList.add('couple');
  newFields.innerHTML = `
      <div class="label-couple">
          <label>Показатель эффективности</label>
          <select class="ei-name" name="ei-name">
          </select>
      </div>
      <div class="label-couple">
          <label>Дата начальное</label>
          <input class="data-start-ei" name="data-start-ei" type="date">
      </div>
      <div class="label-couple">
        <label>Дата конечное</label>
        <input class="data-end-ei" name="data-end-ei" type="date">
      </div>
  `;

  // Добавление новых полей в контейнер
  document.getElementById('eis-container').appendChild(newFields);
  const newSelect = newFields.querySelector('.ei-name');
  eiAddTap(newSelect); // Загрузка характеристик в новый select
});

function fetchEI(){
  const selectedCheckboxes = document.querySelectorAll('.select-vehicle:checked');
  const idToChoose = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);
  // const rowToEdit = selectedCheckboxes[0].closest('tr');
  // document.getElementsByClassName('info')[1].innerText = rowToEdit.cells[1].innerText;

  fetch('http://185.187.90.199:81/eiData.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.vehicleId = idToChoose;
  const tbody = document.getElementById('ei-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      row.dataset.id = data[i].vev_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-ei" class="select-ei" /></td>
                  <td>${data[i].ei_name}</td>
                  <td>${data[i].ei_unit}</td>
                  <td>${data[i].vev_value}</td>
                  <td>${data[i].vev_date_start}</td>
                  <td>${data[i].vev_date_end}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error choosing data:', error));
}

function updateEIData(){
  const idToChoose = memData.vehicleId;

  fetch('http://185.187.90.199:81/eiData.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id: idToChoose })
})
.then(response => response.json())
.then(data => {
  memData.vehicleId = idToChoose;
  const tbody = document.getElementById('ei-data');
  tbody.innerHTML = '';
  for (let i = 0; i < data.length; i++) {
      const row = document.createElement('tr');
      row.dataset.id = data[i].vev_id;
      row.innerHTML = `
                  <td><input type="checkbox" name="select-ei" class="select-ei" /></td>
                  <td>${data[i].ei_name}</td>
                  <td>${data[i].ei_unit}</td>
                  <td>${data[i].vev_value}</td>
                  <td>${data[i].vev_date_start}</td>
                  <td>${data[i].vev_date_end}</td>
              `;

      tbody.appendChild(row);
  }
})
.catch(error => console.error('Error choosing data:', error));
}

delEIButton.addEventListener('click', function(){
  const selectedCheckboxes = document.querySelectorAll('.select-ei:checked');
  const idsToDelete = Array.from(selectedCheckboxes).map(checkbox => checkbox.closest('tr').dataset.id);

  fetch('http://185.187.90.199:81/deletingEI.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ids: idsToDelete })
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          updateEIData();
      } else {
          console.error('Error deleting data:', data.error);
      }
      // console.log(data);
  })
  .catch(error => console.error('Error deleting data:', error));
})