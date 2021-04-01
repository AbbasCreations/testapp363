import React, { useState, useEffect } from "react";
import { useStateValue } from "./StateProvider";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import prodData from "../src/components/prodData.json";

export const GetTaxonomyfromAPI = async () => {
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getTaxonomy";

  try {
    const response = await axios.get(url);
    if (!response.data.includes("table.cfdump_wddx")) {
      let data = response.data;
      reactLocalStorage.setObject("allTaxonomy", data);
    }
  } catch (error) {}
  */
};

export const getProducts = (
  property,
  url,
  taxonomy,
  category,
  ID,
  featured,
  setAllProducts,
  setLoading
) => {
  let prodData = {
    products: [],
    loadder: true,
  };
  /*
  setLoading(true);
  let apiURL =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getAllProducts&property=" +
    property +
    "&caturl=" +
    url +
    "&taxonomy=" +
    taxonomy +
    "&category=" +
    category +
    "&ID=" +
    ID +
    "&featured=" +
    featured;

  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      setAllProducts(data);
      setLoading(false);
    });
    */
};

export const ApiProducts = async (
  property,
  catUrl,
  taxonomy,
  category,
  setAllProducts,
  setLoading,
  featured,
  ID
) => {
  let data = [];
  setLoading(true);
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getAllProducts&property=" +
    property +
    "&caturl=" +
    catUrl +
    "&taxonomy=" +
    taxonomy +
    "&category=" +
    category +
    "&ID=" +
    ID +
    "&featured=" +
    featured;

  try {
    const response = await axios.get(url);

    if (response.data.includes("table.cfdump_wddx")) {
      data = [];
    } else {
      data = response.data;
      if (Object.entries(data).length > 0) {
      } else {
        data = [];
      }
    }
  } catch (error) {
    data = [];
  }

  */
  setAllProducts(data);
  setLoading(false);
  return "";
};

export const getProductByID = async (ID, setAllProducts, setLoading) => {
  let data = [];
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getProductByID&ID=" +
    ID;

  try {
    const response = await axios.get(url);
    if (response.data.includes("table.cfdump_wddx")) {
      data = [];
    } else {
      data = response.data;
      if (Object.entries(data).length > 0) {
      } else {
        data = [];
      }
    }
  } catch (error) {
    data = [];
  }
  */
  setLoading(true);

  let currentProd = [];
  currentProd = prodData.filter((product) => product.id == ID);
  currentProd.STYLE_ID = prodData[0].id;
  currentProd.URL = prodData[0].product_url;
  currentProd.SMALLIMAGE = prodData[0].image;
  currentProd.LARGEIMAGE = prodData[0].image;
  currentProd.NAME = prodData[0].name;
  currentProd.BRAND = prodData[0].brand;
  currentProd.REGULAR_PRICE = prodData[0].price;
  currentProd.SALES_PRICE = 0;
  currentProd.GENER = "simple";
  console.log("pddddddddddddddd");
  console.log(currentProd);
  setAllProducts(currentProd);
  setLoading(false);
  return "";
};

export const getWeRecommend = async (
  dept,
  brand,
  number,
  setAdditionalProducts,
  setLoading
) => {
  let data = [];

  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getWeRecommend&dept=" +
    dept +
    "&brand=" +
    brand +
    "&noOfItems=" +
    number;
  try {
    const response = await axios.get(url);
    if (response.data.includes("table.cfdump_wddx")) {
      data = [];
    } else {
      data = response.data;
      if (Object.entries(data).length > 0) {
      } else {
        data = [];
      }
    }
  } catch (error) {
    data = [];
  }
  */
  setLoading(true);

  let recommanded = [];
  recommanded = prodData.filter((product) => product.brand == brand);
  recommanded.length = number;
  setAdditionalProducts(recommanded);
  setLoading(false);
  return "";
};

export const getProductSizes = async (
  ID,
  webStyle,
  siz,
  attr1,
  attr2,
  setProdSizes
) => {
  let data = [];
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getProductSizes&ID=" +
    ID +
    "&webStyle=" +
    webStyle +
    "&siz=" +
    siz +
    "&attr1=" +
    attr1 +
    "&attr2=" +
    attr2;
  try {
    const response = await axios.get(url);
    if (response.data.includes("table.cfdump_wddx")) {
      data = [];
    } else {
      data = response.data;

      if (Object.entries(data).length > 0) {
      } else {
        data = [];
      }
    }
  } catch (error) {
    data = [];
  }

  // setProdSizes(data);
  */
  return data;
};

export const getProductColors = async (
  ID,
  webStyle,
  siz,
  attr1,
  attr2,
  colorsRec,
  setProdColors
) => {
  let data = [];
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getProductColors&ID=" +
    ID +
    "&webStyle=" +
    webStyle +
    "&siz=" +
    siz +
    "&attr1=" +
    attr1 +
    "&attr2=" +
    attr2;
  try {
    const response = await axios.get(url);
    console.log("ssssssssssss");
    console.log(response.data);

    if (response.data.includes("table.cfdump_wddx")) {
      data = [];
    } else {
      data = response.data;
      if (Object.entries(data).length > 0) {
      } else {
        data = [];
      }
    }
    return data;
  } catch (error) {
    data = [];
  }
  */
  return data;
};

export const setRecentsProducts = async (productID) => {
  /*
  let url =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=setRecent&ID=" +
    productID;

  try {
    const response = await axios.post(url);
  } catch (error) {}
  */
  return "";
};

export const GetAllTaxonomy = () => {
  const [taxoItems, setTaxoItems] = useState([]);
  /*
  useEffect(() => {
    let url =
      "http://localhost:8500/celerant360/server/CF/API.cfc?method=getTaxonomy";
    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTaxoItems(data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  */
  return taxoItems;
};
