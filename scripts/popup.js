const popupProfile = document.querySelector('.popup__profile-item');
const popupPhoto = document.querySelector('.popup__photo-item');
const popupImage = document.querySelector('.popup__image-item');
const popupPicture = document.querySelector('.popup__picture');
const popupImageText = document.querySelector('.popup__picture-text');
const popupOpenButton = document.querySelector('.profile__button-editor');
const popupOpenPhotoBtn = document.querySelector('.profile__button'); // добавил кнопку для открытия попапа с картинками
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const formElement = document.querySelector('.popup__input');
const nameInput = document.querySelector('.popup__field_name');
const jobInput = document.querySelector('.popup__field_profession');
const profileName = document.querySelector('.profile__title');
const profileInfo = document.querySelector('.profile__subtitle');
const popupInputPhoto = document.querySelector('.popup__input-photo')
const titleInput = document.querySelector('.popup__field-title');
const linkInput = document.querySelector('.popup__field-link');


const initialCards = [ //Начало кода, п.1 проект 5
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

const elementsContainer = document.querySelector('.elements');
const templateEL = document.querySelector('.template'); //ссылка на template element

  function render() {
    initialCards.forEach(getItem);
  }

function getItemHTML(item) {
    return  `<div class="elements__item">
                <img src="./images/kirill-pershin-1088404-unsplash.png" class="elements__photo" alt="Карачаевск">
                <button class="elements__button-delete" type="button"></button>
                <h3 class="elements__title">${item.name}</h3>
                <button class="elements__button-like" type="button"></button>
            </div>`
}

function getItem(item) {
    const newItem = templateEL.content.cloneNode(true) //клонируем template element. Передаём true , чтобы скопировать всю структуру template элемента
    const headerEl = newItem.querySelector('.elements__title') //находим header , куда будем передовать title
    const photoEl = newItem.querySelector('.elements__photo') //находим фото, куда будем передавать картинки с карточек
    photoEl.src = item.link; 
    photoEl.alt = item.name; 
    headerEl.textContent = item.name;

    const removeBtn = newItem.querySelector('.elements__button-delete') //получаем ссылку на кнопку удаления
    removeBtn.addEventListener('click', cardDelete); //слушатель от функции carDelete вызывается в методе getItem

    newItem.querySelector('.elements__button-like').addEventListener('click', function (evt) { // выбрал элемент кнопки сердца и добавил ему обработчик
        evt.target.classList.toggle('elements__button-like-active'); //переключение кнопки лайк ИСПРАВИТЬ КАРТИНКу
    });
    photoEl.addEventListener('click', function(evt) {
      popupPicture.src = item.link;
      popupImageText.textContent = item.name;
      popupImage.classList.toggle('popup__opened');
    });
    elementsContainer.appendChild(newItem);
}



render(); //Конец кода п.1 проект 5

function cardDelete(event) {
    const targetEl = event.target; // хранится ссылка на того, кто вызвал
    const targetItem = targetEl.closest('.elements__item');
    targetItem.remove();
}





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

const openPopupProfile = function () {
    const userName = profileName.textContent;
    const userInfo = profileInfo.textContent;
    if (userName) {
        nameInput.value = userName;
    };
    if (userInfo) {
        jobInput.value = userInfo;
    }
    popupProfile.classList.add('popup__opened');
}

const closePopup = function (evt) {
    const targetEl = evt.target;
    const popup = targetEl.closest('.popup');
    popup.classList.remove('popup__opened');
}

const openPopupPhoto = function () {   // Задаю функцию для открытия 2го попапа с картинками
  popupPhoto.classList.toggle('popup__opened') 
}

function addCard (evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = templateEL.content.cloneNode(true)
  const titleEl = newCard.querySelector('.elements__title')
  const linkEl = newCard.querySelector('.elements__photo')
  linkEl.src = link;
  titleEl.textContent = title;
  const firstCard = elementsContainer.childNodes[0];
  elementsContainer.insertBefore(newCard, firstCard);

}

popupOpenButton.addEventListener('click', openPopupProfile);
popupOpenPhotoBtn.addEventListener('click', openPopupPhoto);

popupCloseButtons.forEach(function(closeBtn) {
  closeBtn.addEventListener('click', closePopup);
})

popupInputPhoto.addEventListener('submit', addCard);




