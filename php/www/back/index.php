<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="preload" href="/fonts/SourceSansPro-SemiBold.ttf" as="font">
    <title>Main</title>
</head>
<body>
    <div class="l-wrapper">
        <div class="sidebar">
            <div class="sidebar-wrapper">
                <div class="sidebar-icon">
                    <img class="icon" src="/img/menu-outline.svg" alt="">
                </div>
                <button class="sidebar-card" onclick="openTab(event, 'tab1')">
                    <img class="icon" src="/img/home.svg" alt=""    >
                    Гаражи
                </button>
                <button class="sidebar-card" onclick="openTab(event, 'tab2')">
                    <img class="icon" src="/img/analytics-outline.svg" alt="">
                     Транспортные средства
                </button>
                <button class="sidebar-card" onclick="openTab(event, 'tab3')">
                    <img class="icon" src="/img/trending-up-outline.svg" alt="">
                    Показатели транспорта
                </button>
                <button class="sidebar-card" onclick="openTab(event, 'tab4')">
                    <img class="icon" src="/img/folders.svg" alt="">
                    Показатели эффективности
                </button>
                <button class="sidebar-card" onclick="openTab(event, 'tab5')">
                    <img class="icon" src="/img/bookmark-outline.svg" alt="">
                    Избранное
                </button>
                <button class="sidebar-card" onclick="openTab(event, 'tab6')">
                    <img class="icon" src="/img/book-outline.svg" alt="">
                    Справочник
                </button>
            </div>
        </div>
        <div class="main">
            <div class="main-header">
                <div class="header-buttons">
                    <a href="/auth.php"><img src="/img/user-thumb.svg" alt="user"></a>
                    <img src="/img/button.svg" alt="">
                </div>
            </div>
            <div id="tab1" class="tabcontent">
<!--                <button onclick="working()">GO!</button>-->
<!--                <div class="table-header">-->
<!--                    <div class="table-tabs">-->
<!--                        <div class="tabs"><a href="#">Добавить</a></div>-->
<!--                        <div class="tabs"><a href="#">Изменить</a></div>-->
<!--                        <div class="tabs"><a href="#">Удалить</a></div>-->
<!--                    </div>-->
<!--                    <div class="table-find">-->
<!--                    </div>-->
<!--                </div>-->
                <table class="table">
                    <thead>
                    <tr>
                        <th><input type="checkbox" name="name1" />&nbsp;</th>
                        <th>Семейное положение</th>
                        <th>Иждивенство</th>
                        <th>Образование</th>
                        <th>Трудоустройство</th>
                        <th>Доход заявителя</th>
                        <th>Доход со заявителя</th>
                        <th>Величина займа</th>
                        <th>Срок кредита</th>
                        <th>Кредитная история</th>
                        <th>Область проживания</th>
                        <th>Статус</th>
                    </tr>
                    </thead>
                    <tbody class="creditBody">
                    <tr>
                        <td><input type="checkbox" name="name1" />&nbsp;</td>
                        <td id="brak">В браке</td>
                        <td id="ijd">Не иждивенец</td>
                        <td id="obr">Образован</td>
                        <td id="work">Постоянная работа</td>
                        <td id="money1">500000</td>
                        <td id="money2">500000</td>
                        <td id="creditMoney">30000</td>
                        <td id="days">356</td>
                        <td id="history">Хорошая</td>
                        <td id="zone">Город</td>
                        <td id="creditStatus">Одобрено</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="name1" />&nbsp;</td>
                        <td>В браке</td>
                        <td>Не иждивенец</td>
                        <td>Образован</td>
                        <td>Постоянная работа</td>
                        <td>500000</td>
                        <td>500000</td>
                        <td>30000</td>
                        <td>356</td>
                        <td>Хорошая</td>
                        <td>Город</td>
                        <td>Одобрено</td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" name="name1" />&nbsp;</td>
                        <td>В браке</td>
                        <td>Не иждивенец</td>
                        <td>Образован</td>
                        <td>Постоянная работа</td>
                        <td>500000</td>
                        <td>500000</td>
                        <td>30000</td>
                        <td>356</td>
                        <td>Хорошая</td>
                        <td>Город</td>
                        <td>Одобрено</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="tab2" class="tabcontent">
                <div class="status-form">
                    <form id="status" onsubmit="event.preventDefault(); sendData();">
                        <label for="family">Семейное положение:</label>
                        <select id="family" name="family">
                            <option value="merried">В браке</option>
                            <option value="notMerried">Не в браке</option>
                        </select>
                        <label for="dependent">Иждивенство:</label>
                        <select id="dependent" name="dependent">
                            <option value="dependent">Иждивенец</option>
                            <option value="notDependent">Не иждивенец</option>
                        </select>
                        <label for="education">Образование:</label>
                        <select id="education" name="education">
                            <option value="education">Образован</option>
                            <option value="notEducated">Не образован</option>
                        </select>
                        <label for="employment">Трудоустройство:</label>
                        <select id="employment" name="employment">
                            <option value="job">Постоянная работа</option>
                            <option value="notJob">Безработный</option>
                        </select>
                        <label for="applicantIncome">Доход заявителя:</label>
                        <input id="applicantIncome" type="number" value="0">
                        <label for="coapplicantIncome">Доход созаявителя:</label>
                        <input id="coapplicantIncome" type="number" value="0">
                        <label for="loanAmount">Величина займа:</label>
                        <input id="loanAmount" type="number" value="0">
                        <label for="term">Срок кредита:</label>
                        <input id="term" type="number" value="0">
                        <label for="creditHistory">Кредитная история:</label>
                        <select id="creditHistory" name="creditHistory">
                            <option value="good">Хорошая</option>
                            <option value="bad">Испорченная</option>
                        </select>
                        <label for="area">Область проживания:</label>
                        <select id="area" name="area">
                            <option value="city">Город</option>
                            <option value="suburb">Пригород</option>
                            <option value="village">Деревня</option>
                        </select>
                        <button type="submit">Определить</button>
                    </form>
                    <div id="result"></div>
                </div>
            </div>
            <div id="tab3" class="tabcontent">
                <div id="all-crit">
                    <script>
                        fetch("http://localhost:81/showCrit.php")
                            .then(res => res.json())
                            .then(data => {
                                for (let i = 1; i < data.length; i++){
                                    let critDiv = document.createElement("div");
                                    let critP = document.createElement("p");
                                    critDiv.classList.add("criteria");
                                    critP.style.textAlign = 'center';
                                    let tabDiv = document.getElementById("all-crit");
                                    critP.textContent = data[i];
                                    //console.log(critDiv);
                                    tabDiv.appendChild(critDiv);
                                    critDiv.appendChild(critP);

                                    let delButt = document.createElement("button");
                                    delButt.classList.add("delCrit");
                                    delButt.textContent = 'Удалить';
                                    //delButt.style.display = 'flex';
                                    critDiv.appendChild(delButt);

                                    delButt.addEventListener('click', deleteCrit);
                                }
                            })
                        function deleteCrit(event){
                            let adjacentP = event.target.previousElementSibling;
                            let textContent = adjacentP.textContent;
                            //console.log(adjacentP);
                            fetch("http://localhost:81/deleteCrit.php",{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ text: textContent }),
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                })
                            var parentDiv = event.target.closest('.criteria');

                            // Проверяем, что родительский элемент найден
                            if (parentDiv) {
                                // Удаляем родительский элемент <div>
                                parentDiv.remove();
                                console.log('Родительский элемент <div> удален.');
                            } else {
                                console.log('Родительский элемент <div> не найден.');
                            }
                        }
                    </script>
                </div>
                <form>
                    <label for="crit">Критерий:</label>
                    <input id="crit" name="crit" type="text">
                    <button type="button" onclick="addSome()">Add</button>
                </form>
                <script>
                    function addSome(){
                        //event.preventDefault();
                        // Создаем новый элемент div
                        var newDiv = document.createElement("div");
                        let element = document.getElementById('crit').value;
 // Добавляем класс "criteria"
                         newDiv.classList.add("criteria");
                         newDiv.textContent = element;
                         console.log(element);
 // Находим элемент с id="tab"
                         var tabDiv = document.getElementById("all-crit");

                        fetch("http://localhost:81/criteries.php",{
                            method: 'POST',
                                headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ crit: element }),
                        })
                            .then(res => res.json())
                            .then(data => {
                                tabDiv.appendChild(newDiv);
                                console.log(data);
                            })
                    }
                </script>
            </div>
            <div id="tab4" class="tabcontent">
                <div id="allStatuses">
                    <script>
                        fetch("http://localhost:81/showStatus.php")
                            .then(res => res.json())
                            .then(data => {
                                for (let i = 0; i < data.length; i++){
                                    let critDiv = document.createElement("div");
                                    let critP = document.createElement("p");
                                    critDiv.classList.add("status");
                                    critP.style.textAlign = 'center';
                                    let tabDiv = document.getElementById("allStatuses");
                                    critP.textContent = data[i];
                                    //console.log(critDiv);
                                    tabDiv.appendChild(critDiv);
                                    critDiv.appendChild(critP);

                                    let delButt = document.createElement("button");
                                    delButt.classList.add("delStatus");
                                    delButt.textContent = 'Удалить';
                                    //delButt.style.display = 'flex';
                                    critDiv.appendChild(delButt);

                                    delButt.addEventListener('click', deleteStat);
                                }
                                //console.log(data);
                            })
                        function deleteStat(event){
                            let adjacentP = event.target.previousElementSibling;
                            let textContent = adjacentP.textContent;
                            //console.log(adjacentP);
                            fetch("http://localhost:81/deleteStat.php",{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ text: textContent }),
                            })
                                .then(res => res.json())
                                .then(data => {
                                    console.log(data);
                                })
                            let parentDiv = event.target.closest('.status');

                            // Проверяем, что родительский элемент найден
                            if (parentDiv) {
                                // Удаляем родительский элемент <div>
                                parentDiv.remove();
                                console.log('Родительский элемент <div> удален.');
                            } else {
                                console.log('Родительский элемент <div> не найден.');
                            }
                        }
                    </script>
                </div>
                <form>
                    <label for="stat">Статус:</label>
                    <input id="stat" name="stat" type="text">
                    <button type="button" onclick="addStat()">Add</button>
                </form>
                <script>
                    function addStat(){
                        //event.preventDefault();
                        // Создаем новый элемент div
                        let newDiv = document.createElement("div");
                        let element = document.getElementById('stat').value;
                        // Добавляем класс "criteria"
                        newDiv.classList.add("status");
                        newDiv.textContent = element;
                        console.log(element);
                        let tabDiv = document.getElementById("allStatuses");

                        fetch("http://localhost:81/statuses.php",{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ stat: element }),
                        })
                            .then(res => res.json())
                            .then(data => {
                                tabDiv.appendChild(newDiv);
                                console.log(data);
                            })
                    }
                </script>
            </div>
            <div id="tab5" class="tabcontent">
                <div id="all-val">
                    <select id="dropdown">
                        <!-- Опции будут добавлены с помощью JavaScript -->
                    </select>
                    <script>
                        document.addEventListener("DOMContentLoaded", function() {
                            // Находим элемент select по его ID
                            let dropdown = document.getElementById("dropdown");

                            dropdown.addEventListener("change", function() {
                                let tabDiv = document.querySelectorAll('.critval');
                                tabDiv.forEach(function(element) {
                                    element.parentNode.removeChild(element);
                                });
                                var selectedValue = dropdown.value;
                                // Вызываем функцию, передавая выбранное значение
                                CritVals(selectedValue);
                            });

                            function CritVals(value) {
                                fetch("http://localhost:81/critVals.php", {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({ val: value }),
                                })
                                    .then(res => res.json())
                                    .then(data => {
                                        for (let i = 0; i < data.length; i++){
                                            let critDiv = document.createElement("div");
                                            let critP = document.createElement("p");
                                            critDiv.classList.add("critval");
                                            critP.style.textAlign = 'center';
                                            let tabDiv = document.getElementById("all-val");
                                            critP.textContent = data[i];
                                            //console.log(critDiv);
                                            tabDiv.appendChild(critDiv);
                                            critDiv.appendChild(critP);

                                            let delButt = document.createElement("button");
                                            delButt.classList.add("delVal");
                                            delButt.textContent = 'Удалить';
                                            //delButt.style.display = 'flex';
                                            critDiv.appendChild(delButt);

                                            delButt.addEventListener('click', deleteCritVals);
                                        }
                                    })
                                function deleteCritVals(event){
                                    let dropdown = document.getElementById("dropdown");
                                    var selectedValue = dropdown.value;
                                    let adjacentP = event.target.previousElementSibling;
                                    let textContent = adjacentP.textContent;
                                    //console.log(adjacentP);
                                    fetch("http://localhost:81/deleteCritVals.php",{
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ text: textContent,
                                        column: selectedValue}),
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            console.log(data);
                                        })
                                    let parentDiv = event.target.closest('.critval');

                                    // Проверяем, что родительский элемент найден
                                    if (parentDiv) {
                                        // Удаляем родительский элемент <div>
                                        parentDiv.remove();
                                        console.log('Родительский элемент <div> удален.');
                                    } else {
                                        console.log('Родительский элемент <div> не найден.');
                                    }
                                }
                            }


                            // Отправляем запрос Fetch к серверному скрипту PHP для получения значений списка
                            fetch('http://localhost:81/showCrit.php')
                                .then(response => response.json())
                                .then(data => {
                                    // Добавляем полученные значения в выпадающий список
                                    for (let i = 1; i < data.length; i++) {
                                        var option = document.createElement("option");
                                        option.text = data[i];
                                        dropdown.add(option);
                                    }
                                })
                                .catch(error => console.error('Ошибка:', error));
                        });
                    </script>
                </div>
                <form>
                    <label for="critVal">Значение критерия:</label>
                    <input id="critVal" name="critVal" type="text">
                    <button type="button" onclick="addCritVal()">Add</button>
                </form>
                <script>
                    function addCritVal(){
                        let dropdown = document.getElementById("dropdown");
                        var selectedValue = dropdown.value;
                        let newDiv = document.createElement("div");
                        let element = document.getElementById('critVal').value;
                        newDiv.classList.add("critval");
                        newDiv.textContent = element;
                        let tabDiv = document.getElementById("all-val");

                        fetch("http://localhost:81/addCritVals.php",{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ critVal: element,
                            column: selectedValue}),
                        })
                            .then(res => res.json())
                            .then(data => {
                                tabDiv.appendChild(newDiv);
                                console.log(data);
                            })
                    }
                </script>
            </div>
            <div id="tab6" class="tabcontent">
                <select id="dropdownOdob">
                    <!-- Опции будут добавлены с помощью JavaScript -->
                </select>
                <div class="neighbors-wrap">
                    <div class="neighbors" id="allOdob">
                        <script>
                            document.addEventListener("DOMContentLoaded", function() {
                                // Находим элемент select по его ID
                                let dropdownOdob = document.getElementById("dropdownOdob");

                                dropdownOdob.addEventListener("change", function() {
                                    let tabDiv = document.querySelectorAll('.odob');
                                    tabDiv.forEach(function(element) {
                                        element.parentNode.removeChild(element);
                                    });
                                    let selectedValue = dropdownOdob.value;
                                    // Вызываем функцию, передавая выбранное значение
                                    TooCritVals(selectedValue);
                                });

                                function TooCritVals(value) {
                                    fetch("http://localhost:81/critVals.php", {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({ val: value }),
                                    })
                                        .then(res => res.json())
                                        .then(data => {
                                            for (let i = 0; i < data.length; i++){
                                                let critDiv = document.createElement("div");
                                                let critP = document.createElement("p");
                                                critDiv.classList.add("odob");
                                                critP.style.textAlign = 'center';
                                                let tabDiv = document.getElementById("allOdob");
                                                critP.textContent = data[i];
                                                //console.log(critDiv);
                                                tabDiv.appendChild(critDiv);
                                                critDiv.appendChild(critP);

                                                let delButt = document.createElement("button");
                                                delButt.classList.add("delVal");
                                                delButt.textContent = 'Удалить';
                                                //delButt.style.display = 'flex';
                                                critDiv.appendChild(delButt);
                                                let addButt = document.createElement("button");
                                                addButt.classList.add("addVal");
                                                addButt.textContent = 'Перенести в описание';
                                                //delButt.style.display = 'flex';
                                                critDiv.appendChild(addButt);

                                                delButt.addEventListener('click', deleteCritVals);
                                            }
                                        })
                                    function deleteCritVals(event){
                                        let dropdown = document.getElementById("dropdownOdob");
                                        let selectedValue = dropdown.value;
                                        let adjacentP = event.target.previousElementSibling;
                                        let textContent = adjacentP.textContent;
                                        //console.log(adjacentP);
                                        fetch("http://localhost:81/deleteCritVals.php",{
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({ text: textContent,
                                                column: selectedValue}),
                                        })
                                            .then(res => res.json())
                                            .then(data => {
                                                console.log(data);
                                            })
                                        let parentDiv = event.target.closest('.critval');

                                        // Проверяем, что родительский элемент найден
                                        if (parentDiv) {
                                            // Удаляем родительский элемент <div>
                                            parentDiv.remove();
                                            console.log('Родительский элемент <div> удален.');
                                        } else {
                                            console.log('Родительский элемент <div> не найден.');
                                        }
                                    }
                                }


                                // Отправляем запрос Fetch к серверному скрипту PHP для получения значений списка
                                fetch('http://localhost:81/showCrit.php')
                                    .then(response => response.json())
                                    .then(data => {
                                        // Добавляем полученные значения в выпадающий список
                                        for (let i = 1; i < data.length; i++) {
                                            let option = document.createElement("option");
                                            option.text = data[i];
                                            dropdownOdob.add(option);
                                        }
                                    })
                                    .catch(error => console.error('Ошибка:', error));
                            });
                        </script>
                    </div>
                    <div class="neighbors" id="Odob2">fsdfdsfdsf</div>
                </div>
            </div>
        </div>
    </div>
<script src="script.js"></script>
</body>
</html>
