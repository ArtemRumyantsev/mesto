export class FormValidator {
  // первый аргумент конструктора - это объект, в полях которого лежат селекторы инпутов формы
  // второй аргумент конструктра - это элемент формы, в котором ты будешь искать селекторы инпутов из первого аргумента
    constructor(validations, form) {
      this._inputSelector = validations.inputSelector
      this._submitButtonSelector = validations.submitButtonSelector
      this._inactiveButtonClass = validations.inactiveButtonClass
      this._inputErrorClass = validations.inputErrorClass
      this._errorClass = validations.errorClass
      this._form = form
      this._inputs = Array.from(this._form.querySelectorAll(this._inputSelector));
    }
    _hasInvalidInput () {
      return this._inputs.some((inputElement) => {
        return !inputElement.validity.valid
      })
    } //Проверка  на валидность
    _showInputError () {
      
      this._inputElement.classList.add(this._inputErrorClass);
      this._errorElement.classList.add(this._errorClass);
      this._errorElement.textContent = this._inputElement.validationMessage;
    }
  // Показываем ошибку
    _hideInputError (inputElement) {
      this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
      this._inputElement.classList.remove(this._inputErrorClass);
      this._errorElement.classList.remove(this._errorClass);
      this._errorElement.textContent = "";
    } // Скрываем ошибку 
    _setEventListeners () {
      this._buttonElement = this._form.querySelector(this._submitButtonSelector)
      this._toggleButtonState()
      this._inputs.forEach((inputElement) => {
        inputElement.addEventListener("input",() => {
          this._formValidation (inputElement)
          this._toggleButtonState()
        })
      })
    }
  
    _formValidation (inputElement) {
      this._inputElement = inputElement
      this._errorElement = this._form.querySelector(`.${this._inputElement.id}-error`);
      if (!this._inputElement.validity.valid) {
        this._showInputError()
      }else {
        this._hideInputError(inputElement)
      }
    } // Проверяем форму на валидность
    _disabledSubmit () {
      this._buttonElement.classList.add(this._inactiveButtonClass)
      this._buttonElement.setAttribute('disabled', true);
    } // Блокируем клавишу при невалидином поле
    _toggleButtonState () {
      if (this._hasInvalidInput()) {
        this.disabledSubmit()
      }else {
        this._buttonElement.classList.remove(this._inactiveButtonClass)
        this._buttonElement.removeAttribute('disabled');
  
      }
    } // Отключаем блокировку клавиши
  
    enableValidation () {
      this._setEventListeners()
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault()
        this._toggleButtonState()
      })
    }
    _clearValidation () {
      this._inputs.forEach((form) => {
        this._hideInputError (form)
      });
      this._toggleButtonState()
    } // Очистка полей ввода перед открытием
  }
  