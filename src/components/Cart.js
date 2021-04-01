import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { updateQuantity } from "./product/productController";
import * as cc from "./cart/cartController";

function Cart() {
  let history = useHistory();
  const [{ basket }, dispatch] = useStateValue();
  let cart = [];
  cart = cc.GetCart();
  let cartSubTotal = 0;
  cartSubTotal = cc.GetCartSubTotal(cart);
  //RemoveCartItem();
  //UpdateCartQuantity();

  return (
    <>
      <section id="contentHolder">
        <div id="viewcart" class="mb-4 pt-5">
          <div class="container">
            <div class="row">
              {CartTopLeft(cart, history)}
              {CartTopRight(cartSubTotal)}
              {cartContent(cart, history)}
              {cartBottomLeft(cart)}
              {cartBottomRight(cartSubTotal)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const CartTopLeft = (cart, history) => {
  console.log(cart);

  return (
    <>
      <section
        id="cart-item-info"
        class="col-lg-6 col-md-6 col-sm-12 col-12 text-start"
      >
        <h3 class="text-dark">Shopping cart</h3>
        <p id="cartLength" class="text-secondary">
          {cart.length} items
        </p>
        <button
          onClick={() => {
            history.push("/category/all-products");
          }}
          class="bg-secondary text-light p-2 border-1 fw-bold border-dark rounded"
        >
          Continue Shopping
        </button>
      </section>
    </>
  );
};

const CartTopRight = (cartSubTotal) => {
  return (
    <>
      <section
        id="cart-item-total"
        class="col-lg-6 col-md-6 col-sm-12 col-12 text-right"
      >
        <h3 id="cart-total-top" class="text-dark">
          ${cartSubTotal}
        </h3>
        <p class="text-secondary">Subtotal</p>
        <button class="bg-dark text-light border-1 p-2 fw-bold border-dark rounded">
          Proceed to checkout
        </button>
      </section>
    </>
  );
};

const cartContent = (cart, history) => {
  return (
    <>
      <section
        id="cart-detail-heading"
        class="col-12 border-top border-bottom border-secondary mt-3 py-2 mb-2"
      >
        <div class="row">
          <div class="col-lg-6 col-md-6 col-sm-3 col-3">
            <span class="text-capitalize text-secondary fw-bold">product</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3 col-3">
            <span class="text-capitalize text-secondary fw-bold">quantity</span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3 col-3 text-right">
            <span class="text-capitalize text-secondary fw-bold">
              item price
            </span>
          </div>
          <div class="col-lg-2 col-md-2 col-sm-3 col-3 text-right">
            <span class="text-capitalize text-secondary fw-bold">total</span>
          </div>
        </div>
      </section>

      {cart.map((item, index) => {
        return (
          <>
            <section
              id="cart-detail"
              class="col-12 rounded shadow my-2 py-2 border-1 border-secondary mb-2"
            >
              <div class="row">
                <div id="product-picture" class="col-lg-2 col-md-2 col-12">
                  <img src={item.cartImage} class="img-fluid w-75 mx-auto" />
                </div>
                <div id="product-description" class="col-lg-4 col-md-4 col-12">
                  <a
                    href={"/product/" + item.style_id + "/fromcart"}
                    class="text-decoration-none"
                  >
                    <b class="d-block text-dark">{item.brand}</b>
                    <strong class="d-block text-secondary">{item.name} </strong>
                  </a>

                  <em class="d-block text-secondary fw-normal fst-normal">
                    #{item.style_id}
                  </em>
                </div>
                <div id="product-information" class="col-lg-6 col-md-6 col-12">
                  <div class="product-upper-info d-flex justify-content-between border-bottom border-secondary py-2">
                    <div class="first">
                      <button
                        value="-"
                        class="rounded"
                        onClick={(e) => {
                          UpdateCartQuantity(e, index, cart);
                        }}
                      >
                        -
                      </button>
                      <input
                        id={"itemsQTY" + index}
                        value={index}
                        class="w-25"
                        type="number"
                        value={item.quantity}
                      />
                      <button
                        value="+"
                        class="rounded"
                        onClick={(e) => {
                          UpdateCartQuantity(e, index, cart);
                        }}
                      >
                        +
                      </button>
                    </div>
                    <p>
                      ${item.salesPrice ? item.salesPrice : item.regularPrice}
                    </p>
                    <span id={"item-total" + index}>${item.total}</span>
                  </div>
                  <div class="product-middle-info py-3 border-bottom border-secondary">
                    <div class="p-desc-button d-flex justify-content-between mt-3">
                      {item.selectedColor ? (
                        <span>
                          <strong>Color:</strong>
                          {item.selectedColor}
                        </span>
                      ) : (
                        ""
                      )}
                      {item.selectedSize ? (
                        <span>
                          <strong>Size:</strong> {item.selectedSize}
                        </span>
                      ) : (
                        ""
                      )}
                      <button
                        onClick={() => {
                          RemoveCartItem(cart, index, history);
                        }}
                        class="text-dark bg-light border-1 border-dark py-1 px-3 rounded fw-normal "
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        );
      })}
    </>
  );
};

const cartBottomLeft = (cart) => {
  return (
    <>
      <section id="cart-end-information" class="col-lg-5 col-md-6 col-12 mt-3">
        <button class="text-dark bg-light border-1 border-dark py-1 px-3 mb-3 rounded fw-bold d-block w-75">
          Save for later
        </button>
        <button class="text-light bg-dark border-1 border-dark py-1 px-3 mb-3 rounded fw-bold d-block w-75">
          Share cart link
        </button>
      </section>
    </>
  );
};

const cartBottomRight = (cartSubTotal) => {
  return (
    <>
      <section
        id="cart-end-total"
        class="col-lg-6 col-md-6 col-12 mt-3 mx-auto"
      >
        <p class="w-100 fw-bold text-dark">
          Cart Subtotal
          <span id="bottom-subtotal" class="float-right fw-bold text-dark">
            ${cartSubTotal}
          </span>
        </p>
        <button class="w-100 rounded p-2 bg-dark fw-bold text-light text-center">
          Proceed to checkout
        </button>
      </section>
    </>
  );
};

const RemoveCartItem = (cart, index, history) => {
  cart.splice(index, index + 1);
  document.getElementById("cartLength").innerHTML = "(" + cart.length + ")";
  document.getElementById("basket-total-top").innerHTML =
    "(" + cart.length + ")";
  reactLocalStorage.setObject("cartSessions", [...cart]);

  history.push("cart");
};

const UpdateCartQuantity = (e, index, cart) => {
  if (e.target.value == "+") {
    cart[index].quantity++;
  } else {
    cart[index].quantity--;
    if (cart[index].quantity == 0) {
      cart[index].quantity = 1;
    }
  }
  cart.map((cartitem, index) => {
    if (cart.salesPrice && cart.salesPrice > 0) {
      cart[index].total = cart[index].salesPrice * cart[index].quantity;
    } else {
      cart[index].total = cart[index].regularPrice * cart[index].quantity;
    }
  });
  document.getElementById("itemsQTY" + index).value = cart[index].quantity;

  let cartSubTotal = 0;
  cartSubTotal = cc.GetCartSubTotal(cart);
  document.getElementById("bottom-subtotal").innerHTML = "$" + cartSubTotal;

  document.getElementById("cart-total-top").innerHTML = "$" + cartSubTotal;

  reactLocalStorage.setObject("cartSessions", [...cart]);

  document.getElementById("item-total" + index).innerHTML = cart[index].total;
};

export default Cart;
