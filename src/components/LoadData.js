import React from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import * as API from "../API";
import { useStateValue } from "../StateProvider";

export default function LoadData() {
  const [
    { loading, allProductsData, sFilters, sortby },
    dispatch,
  ] = useStateValue();

  let apiUrl =
    "http://localhost:8500/celerant360/server/CF/API.cfc?method=getAllProducts&property=sortby&caturl=firearms&taxonomy=All&category=Firearms";

  let data = [];
  axios.get(apiUrl).then((response) => {
    data = response.data;
    console.log(data);
    dispatch({
      type: "ALL_PRODUCTS",
      aProducts: [...data],
    });
  });

  return allProductsData;
}
