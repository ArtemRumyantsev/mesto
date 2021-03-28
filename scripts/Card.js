export default class Card {
    constructor(item, cardSelector) {
        this._name = item.name
        this._link = item.link
        this._cardSelector = cardSelector
        this._alt = item.name
        this._photoPopup = document.querySelector('.popup_image');
        this._popupImage = this._photoPopup.querySelector('.popup__picture');
        this._popupText = this._photoPopup.querySelector('.popup__picture-text');
        this._popupCloseBtn = this._photoPopup.querySelector('.popup__button-close');

    }
      
  _getTemplate() {
      const cardElement = document
          .querySelector(this._cardSelector)
          //извлечём содержимое template-элемента
          .content
          .cloneNode(true);

      // вернём DOM-элемент карточки
      return cardElement
  }

  generateCard() {
      // Запишем разметку в приватное поле _element. 
      // Так у других элементов появится доступ к ней.
      this._element = this._getTemplate();
      //Добавим данные
      this._element.querySelector('.elements__title').textContent = this._name;
      this._element.querySelector('.elements__photo').src = this._link;
      this._element.querySelector('.elements__photo').alt = this._alt;
      //Добавляем вызов метода, который вешает обработчики
      this._setEventListeners(this._element);

  // Вернём элемент наружу
      return this._element;
  }
   //Обработчик событий при клике на карточку
   _addDataToPopup() {
    this._popupImage.src = this._link;
    this._popupImage.alt = this._name;
    this._popupText.textContent = this._name;
   }
   _handleOpenPopup() {
    this._addDataToPopup();
    this._photoPopup.classList.add('popup__opened');
  } 
    //При клике на крестик
  _handleClosePopup() {
    this._photoPopup.classList.remove('popup__opened');
  }

  _handleLikeBtn() {
    this._cardLikeBtn;
  }

  _handleDeleteCard = (event) => {
    const targetEl = event.target; // хранится ссылка на того, кто вызвал
    const targetItem = targetEl.closest('.elements__item');
    targetItem.remove();
}

  //TODO: добавить метод удаления карточки из index.js handleDeleteCard и добавить метод, который
  // будет переключать класс на кнопке лайка, тоже из index.js 

  _setEventListeners(cardElement) {
    const cardPhotoEl = cardElement.querySelector('.elements__photo');
    const cardDeleteBtn = cardElement.querySelector('.elements__button-delete');
    const cardLikeBtn = cardElement.querySelector('.elements__button-like');
    cardPhotoEl.addEventListener('click', () => {
      this._handleOpenPopup()
    });
  
    this._popupCloseBtn.addEventListener('click', () => {
     this._handleClosePopup()
    });

    cardLikeBtn.addEventListener('click', (evt) => {
      evt.target.classList.toggle('elements__button-like-active')
    });

    cardDeleteBtn.addEventListener('click', this._handleDeleteCard);
  } 
}