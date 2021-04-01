import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";

export const GetCart = () => {
  let shopingCart = [];
  const [{ basket }, dispatch] = useStateValue();
  shopingCart = reactLocalStorage.getObject("cartSessions");
  if (shopingCart && shopingCart.length > 0) {
  } else {
    shopingCart = [];
  }
  return shopingCart;
};

export const GetCartSubTotal = (cart) => {
  let subTotal = 0;
  if (cart && cart.length > 0) {
    cart.map((cartItem) => {
      subTotal += cartItem.total;
    });
  }

  return subTotal;
};

export const getCartSessions = (basket, dispatch) => {
  let cart = [];
  if (!basket || basket.length <= 0) {
    cart = reactLocalStorage.getObject("cartSessions");
    dispatch({
      type: "ADD_TO_BASKET",
      item: [...cart],
    });
  }
  return cart;
};
