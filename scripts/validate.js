const validationForms = {
    formSelector: '.popup__input',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__button-save',
    inactiveButtonClass: 'popup__button-disabled',
    inputErrorClass: 'popup__error_active',
    errorClass: 'popup__error'
  };
  


//функция показывающая ошибку
const showInputError = (formElements, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElements.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = errorMessage;
    //Добавляем класс
    errorElement.classList.add(inputErrorClass)
}

//функция скрывающая ошибку
const hideInputError = (formElements, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElements.querySelector(`#${inputElement.id}-error`)
    errorElement.textContent = "";
    //удаляем класс
    errorElement.classList.remove(inputErrorClass)
}

//проверяем валиден ли импут
const checkInputValidity = (formElements, inputElement, inputErrorClass, errorClass) => {
    const isInputNotValid = !inputElement.validity.valid;

    if (isInputNotValid) {
        const errorMessage = inputElement.validationMessage;
        showInputError(formElements, inputElement, errorMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElements, inputElement, inputErrorClass, errorClass)
    }
}

//функция переключающая состояние кнопки ( найдём её в inputlist)
const toggleBtnState = (inputList, buttonElement, inactiveButtonClass) => {
//нуджно задать поля, чтобы их проверять. Для этого задали inputlist, при вызове toggleBtnState.
//проходимся по полям, чтобы проверить, что они валидны
//функция, при которой, хотя бы одно поле не валидно, становится disabled
// проходимся по массиву методом some ( как только встретили невалидный элемент - вернёт true и дальше не идёт)
    const hasNotValidInput = inputList.some
        (inputElement => !inputElement.validity.valid);
        
          //проверяем, если есть хоть 1 ошибка , кнопке добавляем атрибут disabled
        if (hasNotValidInput) {
            buttonElement.setAttribute('disabled', true);
            buttonElement.classList.add(inactiveButtonClass)
        } else {
            buttonElement.removeAttribute('disabled');
            buttonElement.classList.remove(inactiveButtonClass)
        }


}

//функция принимающая на вход форму
const setEventListeners = (formElements,  inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    //получаем список инпутов 
    const inputList = Array.from(formElements.querySelectorAll(inputSelector));

    //находим кнопку toggleBtnState в нашей форме по классу
    const buttonElement = formElements.querySelector(submitButtonSelector)

    inputList.forEach(inputElement => {
        //вешаем событие ввода на инпут, чтобы он реагировал и показывал ошибки
        inputElement.addEventListener('input', (event) => {
           checkInputValidity(formElements, inputElement, inputErrorClass, errorClass)
           //вызываем функцию переключения кнопки и задаём саму кнопку
           toggleBtnState( inputList, buttonElement, inactiveButtonClass);
        })
    })
    toggleBtnState (inputList, buttonElement, inactiveButtonClass)
};

const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass,errorClass }) => {
    //находим  массив всех форм на странице
    const formList = Array.from(document.querySelectorAll(formSelector))
     //перебираем элементы 
     formList.forEach(formElement => {
        formElement.addEventListener('submit', evt => {
          evt.preventDefault();
        });

    setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
    });
};


enableValidation(validationForms);
