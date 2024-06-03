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

document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:81/garageData.php')
        .then(response => response.json())
        .then(data => {

            const tbody = document.getElementById('garage-data');
            for (let i = 0; i < data.length; i++) {
                const row = document.createElement('tr');

                row.innerHTML = `
                            <td><input type="checkbox" name="name1" /></td>
                            <td>${data[i].garage_name}</td>
                            <td>${data[i].garage_address}</td>
                            <td>111</td>
                            <td>22</td>
                            <td>24 302</td>
                        `;

                tbody.appendChild(row);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('add-garage').addEventListener("click", function (){
    document.getElementById('garage-add-modal').classList.add('open')
})

document.getElementById('close-modal-btn').addEventListener("click", function (){
    document.getElementById('garage-add-modal').classList.remove('open')
})

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