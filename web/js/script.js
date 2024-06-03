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




