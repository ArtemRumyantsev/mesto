const popupProfile = document.querySelector('.popup_profile'); //попап редактирования профиля
const popupPhoto = document.querySelector('.popup_photo');  //попап добавления картинки
const popupImage = document.querySelector('.popup_image');// открытие картинки при нажатии
const popupPicture = document.querySelector('.popup__picture'); //сама картинка
const popupImageText = document.querySelector('.popup__picture-text'); //текст под картинкой
const popupOpenButton = document.querySelector('.profile__button-editor');
const popupOpenPhotoBtn = document.querySelector('.profile__button'); // добавил кнопку для открытия попапа с картинками
const popupCloseButtons = document.querySelectorAll('.popup__button-close'); // кннопка закрытия попапов X
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

  const removeBtn = newItem.querySelector('.elements__button-delete') //получаем ссылку на кнопку удаления
  removeBtn.addEventListener('click', handleDeleteCard); //слушатель от функции carDelete вызывается в методе getItem

  newItem.querySelector('.elements__button-like').addEventListener('click', function (evt) { // выбрал элемент кнопки сердца и добавил ему обработчик
        evt.target.classList.toggle('elements__button-like-active'); //переключение кнопки лайк 
    });
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
  popup.classList.add('popup__opened'); //
};

function closePopup (popup) {
  popup.classList.remove('popup__opened'); //
}; 

render(); //Конец кода п.1 проект 5

function handleDeleteCard(event) {
    const targetEl = event.target; // хранится ссылка на того, кто вызвал
    const targetItem = targetEl.closest('.elements__item');
    targetItem.remove();
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    addPlaceholder();
    closePopup(popupProfile);
}

function addPlaceholder() {
    profileName.textContent = nameInput.value
    profileInfo.textContent = jobInput.value
  }

formElement.addEventListener('submit', formSubmitHandler);

const openPopupProfile = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileInfo.textContent;
    openPopup(popupProfile);
}

const closePopupOnCross = function (evt) {
  const targetEl = evt.target;
  const popup = targetEl.closest('.popup');
  closePopup(popup);
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

popupOpenButton.addEventListener('click', openPopupProfile);
popupOpenPhotoBtn.addEventListener('click', () => openPopup(popupPhoto));

popupCloseButtons.forEach(function(closeBtn) {
  closeBtn.addEventListener('click', closePopupOnCross);
})

popupInputPhoto.addEventListener('submit', addCard);




