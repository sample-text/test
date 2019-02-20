var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;

var xhr = new XHR();

// Запрос на другой домен
xhr.open('GET', 'http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList', true);

xhr.send();

var totalCompanies = document.querySelector(".totalCompanies__count");
var companiesList = document.querySelector(".listOfCompanies__list");
var loaders = document.getElementsByClassName("loader");


xhr.onload = function() {
    var obj = JSON.parse(this.responseText);

    // Скрытие прелоадеров
    if (obj.status == "OK") {
        for (var i = 0; i < loaders.length; i++) {
            loaders[i].classList.add("cut-down");
        }
    }

    function showCompaniesCount() {
        var sum = obj.list.length;
        return totalCompanies.insertAdjacentHTML("afterBegin", sum);
    }

    showCompaniesCount();

    function showCompanyNames() {
        // Создать массив из названий компаний
        var names = obj.list.map(function(company) {
            return company.name;
        })

        // Генерируемые кнопки (названия компаний)
        var buttons = document.getElementsByClassName("listOfCompanies__item");

        obj.list.forEach(function(item, i) {
            var newHTML = "<li><button class='listOfCompanies__item'>" + item.name + "</button>";

            newHTML += "</li>";

            return companiesList.insertAdjacentHTML("beforeEnd", newHTML);
        })

        // По задумке каждая кнопка вызывает функцию showCompanyPartners(i)
        obj.list.forEach(function(item, i) {
        	buttons[i].addEventListener("click", showCompanyPartners(i))
        })

        return;
    }

    showCompanyNames();


    function showCompanyPartners(companyOrder) {
        var partners = document.querySelector(".companyPartners__list");

        // При "отжатии" компании так блок пропадать не будет
        partners.classList.remove("cut-down");

        var newHTML = "";

        obj.list[companyOrder].partners.forEach(function(item, i) {
           newHTML += "<li>" + item.name + " - " + item.value + "</li>";
        })

        newHTML += "</ul></section>";

        return partners.insertAdjacentHTML("beforeEnd", newHTML);
    }
}

xhr.onerror = function() {
    alert('Ошибка ' + this.status);
}