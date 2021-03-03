
//функция показывающая ошибку
const showInputError = (formElements, inputElement, errorMessage) => {
    const errorElement = formElements.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage;
    //Добавляем класс
    errorElement.classList.add('popup__error_active')
}

//функция скрывающая ошибку
const hideInputError = (formElements, inputElement) => {
    const errorElement = formElements.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = "";
    //удаляем класс
    errorElement.classList.remove('popup__error_active')
}

//проверяем валиден ли импут
const checkInputValidity = (formElements, inputElement) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElements, inputElement, errorMessage);
    } else {
        hideInputError(formElements, inputElement)
    }
}

//функция переключающая состояние кнопки ( найдём её в inputlist)
const toggleBtnState = (inputList, buttonElement) => {
//нуджно задать поля, чтобы их проверять. Для этого задали inputlist, при вызове toggleBtnState.
//проходимся по полям, чтобы проверить, что они валидны
//функция, при которой, хотя бы одно поле не валидно, становится disabled
// проходимся по массиву методом some ( как только встретили невалидный элемент - вернёт true и дальше не идёт)
    const hasNotValidInput = inputList.some
        (inputElement => !inputElement.validity.valid);
        
          //проверяем, если есть хоть 1 ошибка , кнопке добавляем атрибут disabled
        if (hasNotValidInput) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add('popup__button-disabled')
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove('popup__button-disabled')
        }


}

//функция принимающая на вход форму
const setEventListeners = (formElements) => {
    formElements.addEventListener('submit', (event) => {
        event.preventDefault();
    });

    //получаем список инпутов 
    const inputList = Array.from(formElements.querySelectorAll('.popup__field'));

    //находим кнопку toggleBtnState в нашей форме по классу
    const buttonElement = formElement.querySelector('.popup__button-save')

    inputList.forEach(inputElement => {
        //вешаем событие ввода на инпут, чтобы он реагировал и показывал ошибки
        inputElement.addEventListener('input', (event) => {
           checkInputValidity(formElements, inputElement)
           //вызываем функцию переключения кнопки и задаём саму кнопку
           toggleBtnState( inputList, buttonElement);
        })
   
    })
    toggleBtnState( inputList, buttonElement);
};

const enableValidation  = () => {
    //находим  массив всех форм на странице
    const formList = Array.from(document.querySelectorAll('.popup__input'))
     //перебираем элементы 
    formList.forEach(setEventListeners);
};


enableValidation ();
