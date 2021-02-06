const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__button-editor');
const popupCloseButton = document.querySelector('.popup__button-close');
const formElement = document.querySelector('.popup__input');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_profession');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');

function formSubmitHandler (evt) {
    evt.preventDefault();
    addPlaceholder();
    closePopup();
}

function addPlaceholder() {
    profileName.textContent = nameInput.value
    profileInfo.textContent = jobInput.value
  }

formElement.addEventListener('submit', formSubmitHandler);
   
const openPopup = function () {
    const userName = profileName.textContent;
    const userInfo = profileInfo.textContent;
    if (userName) {
        nameInput.value = userName;
    };
    if (userInfo) {
        jobInput.value = userInfo;
    }
    popup.classList.add('popup__opened');
}

const closePopup = function () {
    popup.classList.remove('popup__opened');
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);




