console.log("test")

function documentReady () {
  let buttonsAddToCart = document.getElementsByClassName("product-button");
  console.log(buttonsAddToCart);

  for (let i = 0; i < buttonsAddToCart.length; i++) {
    let button = buttonsAddToCart[i];
      console.log(button);
    button.addEventListener("click", addItem);
  }
  let plusBtns = document.getElementsByClassName("plus");
  for (let i = 0; i < plusBtns.length; i++) {
    let plusBtn = plusBtns[i];
    plusBtn.addEventListener("click", plusQuantity);
  }
  let minusBtns = document.getElementsByClassName("minus");
  for (let i = 0; i < minusBtns.length; i++) {
    let minusBtn = minusBtns[i];
    minusBtn.addEventListener("click", minusQuantity); 
  }
}
documentReady();

function addItem(e) {
  let item = e.target.parentElement.parentElement;
    console.log(item);
  let title = item.querySelector('.product-title').innerText;
    console.log(title);
  let price = item.querySelector('.product-price' ).innerText.replace("€", "");
    console.log(price);
  let imgSrc = item.querySelector('.product-image').src;
    console.log(imgSrc);
  rowCreate(title, price, imgSrc);
  updateTotal();
}

function rowCreate(title, price, imgSrc) {
  let cartItems = document.getElementById("cart-items");
  let cartItemsNames = document.getElementsByClassName("cart-item-title");
  let cartItemsQuantities = document.getElementsByClassName("cart-quantity");

  for (let i = 0; i < cartItemsNames.length; i++) {
    if (cartItemsNames[i].innerText == title) {
      alert("The product is already in your shopping cart.");
      let quantity = Number(cartItemsQuantities[i].innerHTML);
      cartItemsQuantities[i].innerHTML = quantity + 1;
      console.log(quantity);
      updateTotal();
      return;
    }
  }

  let rowItems = `
  <div class="cart-row row d-flex ">
    <div class="cart-item col-6 my-3 ">
        <img class="cart-item-image" src="${imgSrc}" width="100" height="100">
        <span class="cart-item-title h5 ">${title}</span>
    </div>
    <span class="cart-price col-3 h4 my-3">€ ${price}</span>
    <div class="cart-qtty-action col-3 d-flex">            
        <i class="minus fa fa-minus-circle my-auto" ></i>            
        <div class="cart-quantity p-4 h4">1</div>            
        <i class="plus fa fa-plus-circle my-auto"></i>        
        <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>            
    </div>
  </div>`;
  cartItems.innerHTML += rowItems;  
  documentReady();  
}

function updateTotal() {
  let cart = document.getElementById("cart-items");
  let cartRows = cart.getElementsByClassName("cart-row");
  let total = 0;
  for (let i = 0; i < cartRows.length; i++) {
    let cartRow = cartRows[i];
    let price = parseFloat(cartRow.getElementsByClassName("cart-price")[0].innerText.replace("€", ""));
    let quantity = Number(cartRow.getElementsByClassName("cart-quantity")[0].innerText);
    total = total + (price*quantity);
  }
  total = total.toFixed(2);
  let totalElement = document.getElementById("total").querySelector('#price');
  totalElement.innerHTML = `€ ${total}`;
}



function plusQuantity(e) {
  let plusBtn = e.target.parentElement;
  let quantity = Number(plusBtn.querySelector(".cart-quantity").innerHTML);
  plusBtn.querySelector(".cart-quantity").innerHTML = quantity + 1;
  updateTotal();
}



function minusQuantity(e) {
  let minusBtn = e.target.parentElement.parentElement;
  let quantity = Number(minusBtn.querySelector(".cart-quantity").innerHTML);
  if (quantity == 1) {
    console.log("There shouldn't be 0 products in the cart")
    delItem(e);
  } else {
    minusBtn.querySelector(".cart-quantity").innerHTML = quantity - 1;
    updateTotal();
  }
}

let delItemBtns = document.getElementsByClassName("del");
for (let i = 0; i < delItemBtns.length; i++) {
  let delBtn = delItemBtns[i];
  delBtn.addEventListener("click", delItem);
}

function delItem(e) {
  let delBtnAction = e.target.parentElement.parentElement.remove();
  updateTotal();
}

let btnPurchase = document.getElementById("btn-purchase");
btnPurchase.addEventListener("click", purchase);

function purchase() {
  alert("Thank you for buying with us!");
  let cartItems = document.getElementById("cart-items");
  while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild);
  }
  updateTotal();
}
