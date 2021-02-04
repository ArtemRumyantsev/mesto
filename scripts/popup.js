const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-editor');
const popupCloseButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__input');
const nameInput = document.querySelector('.poput__field_name');
const jobInput = document.querySelector('.poput__field_profession');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault();
    addPlaceholder();
    popup.classList.toggle('popup__opened'); 
}

function addPlaceholder() {
    profileName.textContent = nameInput.value
    profileInfo.textContent = jobInput.value
  }
  formElement.addEventListener('submit', formSubmitHandler);
   
const togglePopup = function () {
    popup.classList.toggle('popup__opened');
}

popupOpenButton.addEventListener('click', togglePopup);
popupCloseButton.addEventListener('click', togglePopup);
popup.addEventListener('click', togglePopup); 



