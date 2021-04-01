import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import * as API from "./API";
import { reactLocalStorage } from "reactjs-localstorage";
export const siteLogo = "images/logo.png";
export const headerTopMessage = "Content Goes Here If Any";
let texono = [];

export let taxonomy = [];
export let allProducts = [];

taxonomy = reactLocalStorage.getObject("allTaxonomy");
allProducts = reactLocalStorage.getObject("allProductsData");

API.GetTaxonomyfromAPI();

if (Object.entries(allProducts).length > 0) {
} else {
  //  API.allProductsAPI();
  // allProducts = reactLocalStorage.getObject("allProductsData");
}

allProducts = reactLocalStorage.getObject("allProductsData");
