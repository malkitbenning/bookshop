
$(".shop-item-btn").click(addToCart);

function addToCart(event) {
  var button = event.currentTarget;

  var shopItem = $(this).parent();
  var itemTitle = $(shopItem).children(".card-title")[0].innerText;
  var itemPrice = $(shopItem).children(".item-cost")[0].innerText;
  var imgTop = $(this).parent().parent();
  var imgSrc = $(imgTop).children(".card-img-top")[0].src;
  addItemToCart(itemTitle, itemPrice, imgSrc);
}

function addItemToCart(itemTitle, itemPrice, imgSrc){
  var cartRow = document.createElement('div');
  cartRow.classList.add("cart-row");
  // var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItems = $(".cart-items")[0];
  // var cartItemNames = cartItems.getElementsByClassName("cart-item-title");
  var cartItemNames = $("cartItems.cart-item-title");
  for (var i=0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == itemTitle) {
      alert ("already added to cart");
      return;
    }
  }
  var cartRowContents = `
    <div class="cart-item cart-column">
      <img class="cart-item-image" src="${imgSrc}" width="100" height="140">
      <span class="cart-item-title">${itemTitle}</span>
    </div>
    <span class="cart-price cart-column cart-val">£${itemPrice}</span>
    <div class="cart-quantity cart-column">
      <input class="cart-quantity-input" type="number" value="1" min="1">
      <button class="btn btn-danger" type="button">REMOVE</button>
    </div>
  `;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    updateCartTotal();

    $(".btn-danger").click(function(e){
      $(this).parent().parent().remove();
      updateCartTotal();
    });
    $(".cart-quantity-input").change(function(e){
      updateCartTotal();
    });
}

$("#btn-purchase").click(function(e){

  $("div.cart-items").empty();
  updateCartTotal();
  alert("thank you for your purchase");
});

$(".cart-quantity-input").change(function(e){
  updateCartTotal();
});

$(".btn-danger").click(function(e){
  $(this).parent().parent().remove();
  updateCartTotal();
});

function updateCartTotal() {
  var cartRows = $(".cart-val");
  var totalOrderVal = 0;
  $( ".cart-val" ).each(function( i ) {
    let starter = this.innerHTML;
    let qty = $(this).siblings('.cart-quantity').children(".cart-quantity-input")[0].value;
    starter = parseFloat(starter.substring(1));
    totalOrderVal += (starter * qty);
  });

  $(".cart-total-price")[0].innerHTML = parseFloat(totalOrderVal).toFixed(2);


};
