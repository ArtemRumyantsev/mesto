import Card from "./Card.js"
import FormValidator from "./FormValidator.js"
const overlays = document.querySelectorAll('.popup')
const popupProfile = document.querySelector('.popup_profile'); //попап редактирования профиля
const popupPhoto = document.querySelector('.popup_photo');  //попап добавления картинки
const popupImage = document.querySelector('.popup_image');// открытие картинки при нажатии
const popupPicture = document.querySelector('.popup__picture'); //сама картинка
const popupImageText = document.querySelector('.popup__picture-text'); //текст под картинкой
const popupOpenButton = document.querySelector('.profile__button-editor');
const popupOpenPhotoBtn = document.querySelector('.profile__button'); // добавил кнопку для открытия попапа с картинками
const formElement = document.querySelector('.popup__input');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_profession');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const popupInputPhoto = document.querySelector('.popup__input-photo')
const titleInput = document.querySelector('.popup__field-title');
const linkInput = document.querySelector('.popup__field-link');
const elementsContainer = document.querySelector('.elements');
const templateEL = document.querySelector('.template'); //ссылка на template element
const initialCards = [ 
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

const validationForms = {
  formSelector: '.popup__input',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__error_active',
  errorClass: 'popup__error'
};



function render() {
  initialCards.forEach((item) => {
    renderCard(item, elementsContainer);
  });
  }

function getItem(item) {
  const newItem = templateEL.content.cloneNode(true) //клонируем template element. Передаём true , чтобы скопировать всю структуру template элемента
  const headerEl = newItem.querySelector('.elements__title') //находим header , куда будем передовать title
  const photoEl = newItem.querySelector('.elements__photo') //находим фото, куда будем передавать картинки с карточек
  photoEl.src = item.link; 
  photoEl.alt = item.name; 
  headerEl.textContent = item.name;

 


  photoEl.addEventListener('click', function(evt) {
    popupPicture.src = item.link;
    popupPicture.alt = item.name;
    popupImageText.textContent = item.name;
    
    openPopup(popupImage);
  });
  return newItem
}

// @data - данные каждой карточки из массива данных
// @wrap - контейнер, куда надо рендерить карточку
function renderCard(data, wrap) {
  const newCard = getItem(data);
  wrap.prepend(newCard);
}

function openPopup (popup) {
  popup.classList.add('popup__opened');
  //Добааляем необходимый класс попапа и добавляем обработчик на ESC
  document.addEventListener('keydown' , closeEsc)
};

function closePopup (popup) {
  popup.classList.remove('popup__opened');
  // удаляем класс и обработчик. Колбэком передаеv функцию, внутри которой проверяете keyCode
  document.removeEventListener('keydown', closeEsc); 
}; 

 render(); //Конец кода п.1 проект 5



function formSubmitHandler (evt) {
    evt.preventDefault();
    addPlaceholder();
    closePopup(popupProfile);
}

function addPlaceholder() {
    profileName.textContent = nameInput.value
    profileInfo.textContent = jobInput.value
  }


const openPopupProfile = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
    openPopup(popupProfile);
}



function addCard (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  // вызываем функцию renderCard, которая внутри вызывает getItem для создания экземпляра карточки
  // а так же добавляет созданную карточку внутрь переданного elementsContainer
  renderCard({name: title, link: link}, elementsContainer);
  titleInput.value = '';
  linkInput.value = '';
  closePopup(popupPhoto);
}

//функция закрытия попапа на esc
function closeEsc (evt) {
  if (evt.keyCode === 27) {
   closePopup(document.querySelector('.popup__opened'))
  }
}

//закрываем попам кликом на overlay
overlays.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__button-close')) {
      closePopup(popup)
    }
  })
})

popupOpenButton.addEventListener('click', openPopupProfile);
popupOpenPhotoBtn.addEventListener('click', () => openPopup(popupPhoto));
popupInputPhoto.addEventListener('submit', addCard);

initialCards.forEach((item) => {
  //Создадим экземпляр карточки 
  const card = new Card(item, '.template')
  //Создаём карточку и возвращаем наружу 
  const cardElement = card.generateCard();

  // Добавляем в DOM
  document.querySelector('.elements').append(cardElement);
})

formElement.addEventListener('submit', formSubmitHandler);
popupInputPhoto.addEventListener('submit', addPlaceholder);



const thisConstContainsClass = new FormValidator(validationForms, formElement);
const thisConstContainsClass2 = new FormValidator(validationForms, popupInputPhoto);
thisConstContainsClass.enableValidation();
thisConstContainsClass2.enableValidation();
