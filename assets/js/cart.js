export let basketContainer = null;
let basketBtnContainer;
const headerNavbar = document.querySelector('.page-header__navbar');
const createElement = ({type, attrs, container = null}) => {
  const el = document.createElement(type);
  for (let key in attrs) {
    if (key === 'innerText') el.innerHTML = attrs[key];
    else if (key.indexOf('data') === 0) el.setAttribute(`data-${key.slice(4)}`, attrs[key]);
    else el.setAttribute(key, attrs[key]);
  }
  if (container) container.append(el);
  return el;
};
const createBasketContainer = (c) => {
  basketContainer = createElement({type: 'div',
    attrs: {class: 'well basket__container'},
    container: headerNavbar
  });
  createElement({type: 'p',
    attrs: {innerText: `В корзине ${c} товаров`},
    container: basketContainer
  });
};
const createBasketOrder = () => {
  basketContainer = createElement({type: 'div',
    attrs: {class: 'well basket__container'},
    container: headerNavbar
  });
  createElement({type: 'p',
    attrs: {innerText: `Выбирите метод оплаты`},
    container: basketContainer
  });
  createElement({type: 'div',
  attrs: {class: 'radio'},
  container: basketContainer
  });
  createElement({type:'input',
    attrs:{type:'radio', class:'form-radio'},
    container: basketContainer
  });
  createElement({type: 'button',
  attrs: {class: 'btn btn-primary basket__btn-next buy',
    id: 'btn-next',
    type: 'button',
    innerText: 'Купить'},
  container: basketContainer});
};
const createBasketBtn = (count, container) => {
  basketBtnContainer = createElement({type: 'div',
    attrs: {class: 'basket__btn-container',
      id: 'btn-container'},
    container});
  createElement({type: 'button',
    attrs: {class: 'btn btn-primary basket__btn-next',
      id: 'btn-next',
      type: 'button',
      innerText: 'Продолжить покупки'},
    container: basketBtnContainer});
  if (count > 0) {
    createElement({type: 'button',
      attrs: {class: 'btn btn-primary basket__btn-clear',
        type: 'button',
        attrs: {onClick: 'eraseBasket()'},
        innerText: 'Очистить корзину'},
      container: basketBtnContainer});
    createElement({type: 'button',
      attrs: {class: 'btn btn-primary basket__btn-order',
        type: 'submit',
        attrs: {onClick: 'createBasketOrder()'},
        innerText: 'Оформить заказ'},
      container: basketBtnContainer});
  }
};
const createBasketList = (container, arr) => {
  let sum = 0;
  arr.forEach((el) => {
    let basketItem = createElement({type: 'div',
      attrs: {
        class: 'basket__item-container',
        datacode: `${el.productCode}`
      },
      container});
    createElement({
      type: 'span',
      attrs: {innerText: `${el.productName}  `},
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: {
        class: 'basket__item-count',
        innerText: `- ${el.count} шт  `
      },
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: {innerText: `цена ${el.price.toFixed(2)}$  `},
      container: basketItem
    });
    createElement({
      type: 'span',
      attrs: {innerText: `сумма: ${el.sum.toFixed(2)}$`},
      container: basketItem
    });
    createElement({
      type: 'i',
      attrs: {class: 'fas fa-times basket__item-del'},
      container: basketItem
    });
    sum += el.sum;
  });
  createElement({
    type: 'div',
    attrs: {
      class: 'basket__total',
      innerText: `Всего в корзине товаров на сумму ${sum.toFixed(2)}$`
    },
    container
  });
};
const createStyle = () => {
  createElement({
    type: 'style',
    attrs: {
      innerText: `
      .page-header__navbar {
        position: relative;
      }
      .basket__container {
        background-color: rgb(150, 200, 241);
        position: absolute;
        padding: 10px;
        bottom: 0;
        right: 0;
        transform: translateY(100%);
        z-index: 1000;
        border: 1px solid #2d8df3;
        border-radius: 4px;
      }
      .basket__container p {
        text-align: center;
        font-size: 18px;
      }
      .basket__total {
        margin: 10px auto 10px auto;
        text-align: center;
        font-size: 18px;
      }
      .basket__btn-container {
        display: flex;
        gap: 10px;
      }
      .basket__item-container {
        display: flex;
        gap: 10px;
        margin-top: 10px;
        justify-content: space-evenly;
        border-bottom: 1px solid lightblue;
      }
      .close {
        display:none;
      }
      .radio {
        position: relative;
        width: 100px;
        height: 30px;
        top: 35px;
        left: 20px;
        background-image: url(https://cdn.jotfor.ms/assets/img/payments/PG-PP.svg);
      }
      .form-radio {
        position: relative;
        top: 10px;
      }
      .buy{
        position:relative;
        float:right;
      }
      .basket__item-del {
        display: block;
        background-color: #007bff;
        border: 1px solid #041c36;
        padding: 5px 3px 0 3px;
        cursor: pointer;
        font-size: 10px;
        border-radius: 2px;
      }`
    },
    container: document.head
  });
};
export const eraseBasket = () => {
  basketContainer.remove();
  basketContainer = null;
};
export const orderBasket = () => {
  createBasketOrder();
  createStyle();
}
export const createBasket = (count, productArr) => {
  createBasketContainer(count);
  if (count > 0) createBasketList(basketContainer, productArr);
  createBasketBtn(count, basketContainer);
  createStyle();
};

