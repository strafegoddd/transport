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
 document.getElementsByClassName("tablink")[0].className += " active";



function sendData(){
    let family = document.getElementById("family").value;
    let dependent = document.getElementById("dependent").value;
    let education = document.getElementById("education").value;
    let employment = document.getElementById("employment").value;
    let applicantIncome = document.getElementById("applicantIncome").value;
    let coapplicantIncome = document.getElementById("coapplicantIncome").value;
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let creditHistory = document.getElementById("creditHistory").value;
    let area = document.getElementById("area").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "conf.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            document.getElementById("result").innerHTML = xhr.responseText;
        }
    };
    xhr.send("family=" + family + "&dependent=" + dependent + "&education=" +
        education + "&employment=" + employment + "&applicantIncome=" +
        applicantIncome + "&coapplicantIncome=" + coapplicantIncome + "&loanAmount=" +
        loanAmount + "&term=" + term + "&creditHistory=" + creditHistory + "&area=" + area);
}

function working(){
    fetch("http://localhost:81/credits.php")
        .then(res => res.json())
        .then(data => {
            // let brak = document.getElementById('brak');
            // let ijd = document.getElementById('ijd');
            // let obr = document.getElementById('obr');
            // let work = document.getElementById('work');
            // let money1 = document.getElementById('money1');
            // let money2 = document.getElementById('money2');
            // let creditMoney = document.getElementById('creditMoney');
            // let brak = document.getElementById('brak');
            let elements = document.getElementsByClassName('creditBody');
            for (let i = 0; i < elements.length; i++) {
                 //elements[i].innerHTML = JSON.stringify(data[i].dish_name);
                elements[i].innerHTML = JSON.stringify(data[i].dish_name);
            }
        })
}





