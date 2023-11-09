function forms() {
    // Forms
    // Shift + F5
    const forms = document.querySelectorAll('form'); 

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вам свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => { 
        bindPostData(item);
    });

    const postData = async (url, data) => { // Возвращает Promise fetch-а. Async - внутри функции асинхронный код
        const res = await fetch(url, { //await -ждёт результат запроса
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data   
        }); 
        return await res.json(); //await - ждёт окончания promise
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => { //При выполнении формы
            e.preventDefault();

            const   statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend',statusMessage); // вставка 

            const formData = new FormData(form); // Собираем все данные из формы

            // Если хотим в формате JSON, а не в формате XML
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            // formData превращаем в массив массивов, затем в обычный объект, затем в json
            // Если хотим в формате JSON, а не в формате XML

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset(); // чистка инпутов
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        prevModalDialog.classList.remove('show');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

}

module.exports = forms;