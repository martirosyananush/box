"use strict";
window.addEventListener("DOMContentLoaded", function () {
    //tab L  ogiq start
    const tabHeaders = document.querySelectorAll(".tabheader__item");
    const tabContents = document.querySelectorAll(".tabcontent");
    const tabHeaderParent = document.querySelector(".tabheader__items");

    function hideTabContent() {
        tabContents.forEach(tabcontent => {
            tabcontent.classList.add("hide")
            tabcontent.classList.remove("show", "fade");

        });
        tabHeaders.forEach(tabHeader => tabHeader.classList.remove("tabheader__item_active"));
    }

    function showTabContent(i = 1) {

        tabContents[i].classList.add("show", "fade")
        tabContents[i].classList.remove("hide");
        tabHeaders[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();

    tabHeaderParent.addEventListener("click", (e) => {
        if (e.target && e.target.matches(".tabheader__item")) {
            tabHeaders.forEach((tabHeader, index) => {
                if (e.target === tabHeader) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }

    });
    //tab Logic end

    //timer Logic start
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        let days, hours, minutes, seconds

        if (total <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(total / (1000 * 60 * 60 * 24));
            hours = Math.floor(total / (1000 * 60 * 60) % 24);
            minutes = Math.floor((total / 1000 / 60) % 60);
            seconds = Math.floor((total / 1000) % 60);
        }
        return {
            total,
            days,
            hours,
            minutes,
            seconds
        };

    }

    function setZero(n) {
        return n >= 0 && n < 10 ? `0${n}` : n;
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const daysBlock = timer.querySelector("#days");
        const hoursBlock = timer.querySelector("#hours");
        const minutesBlock = timer.querySelector("#minutes");
        const secondsBlock = timer.querySelector("#seconds");
        const timerId = setInterval(updateClock, 1000);

        function updateClock() {
            const { total, days, hours, minutes, seconds } = getTimeRemaining(endtime);

            daysBlock.textContent = setZero(days);
            hoursBlock.textContent = setZero(hours);
            minutesBlock.textContent = setZero(minutes);
            secondsBlock.textContent = setZero(seconds);

            if (total <= 0) {
                clearInterval(timerId);

            }
        }
        updateClock();
    }

    setClock(".timer", "2023-07-13 23:10:00");
    //timer Logic end

    //modal Logiq start
    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector("[data-close]");

    modalTrigger.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("show");
            modal.classList.remove("hide");
            document.body.style.overflow = "hidden";
        });

    });
    modalCloseBtn.addEventListener("click", () => {
        modal.classList.remove("show");
        modal.classList.add("hide");
        document.body.removeAttribute("style");
    })
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("show");
            modal.classList.add("hide");
            document.body.removeAttribute("style");
        }
    })

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.matches(".show")) {
            modal.classList.remove("show");
            modal.classList.add("hide");
            document.body.removeAttribute("style");
        }
    })

    //modal logiq end
    //used Class for menu cards=>start

    class MenuCard {
        constructor(img, alt, title, descr, price, parentSelector) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }
        changeToUAH() {
            this.price = this.price * this.transfer;

        }
        render() {
            const { img, alt, title, descr, price, parent } = this
            const element = document.createElement("div");
            element.classList.add("menu__item");
            element.innerHTML = `
        <img src=${img} alt=${alt}>
        <h3 class="menu__item-subtitle">${title}</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${price}</span> грн/день</div>
        </div>`;
            parent.append(element);
        }
    }
    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        "Меню \"Фитнес\"",
        "Меню \"Фитнес\" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
        8.5,
        ".menu .container"

    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        "Меню \“Премиум\”",
        "В меню \“Премиум\” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
        20,
        ".menu .container"
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        "Меню \“Постное\”",
        "Меню \“Постное\” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
        20,
        ".menu .container"
    ).render();
    //used Class for menu cards=>end

    // used Class for menu cards => start

    const forms = document.querySelectorAll("form");

     forms.forEach(form=>postData(form));

    function postData(form) {
        form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const request =new XMLHttpRequest();
            request.open("POST", "server.php");

            //  request.setRequestHeader("Content-type", "multipart/from-data");
            const  formData= new FormData(form);

            request.send(formData); 
            request.addEventListener("load", () => {
                if (request.status===200){
                    console.log(request.response);

                }else{ 
                    console.error("some error");
                }
            
            });
        })
    } 
    // used Class for menu cards => end          
});
    

