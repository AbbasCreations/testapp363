import * as Data from "../../Data";
import { reactLocalStorage } from "reactjs-localstorage";
import { useState, useEffect } from "react";

export const getHeaderMessage = () => {
  let topMessage = Data.headerTopMessage;
  return topMessage;
};

export const getSiteLogo = () => {
  let logo = Data.siteLogo;
  return logo;
};

export const redictect = (e, url, history) => {
  e.preventDefault();
  history.push(url);
};

export const addFilters = (e, dispatchedData, dispatch, history) => {
  e.preventDefault();

  reactLocalStorage.setObject("storedFilters", {});

  let parentValue = [];
  let txonomy = dispatchedData.taxonomy;
  let taxonomyValue = dispatchedData.taxonomyValue;
  let taxonomyUrl = dispatchedData.taxonomyUrl;
  let redirect_Url = dispatchedData.redirectUrl;
  dispatch({
    type: "LOADING_STATUS",
    laoder: true,
  });

  // dispatch the item into the data layer
  dispatch({
    type: "ADD_FILTERS",
    filterItems: {
      [txonomy]: taxonomyValue,
      [redirect_Url]: taxonomyUrl,
    },
  });
  history.push(`/category/${taxonomyUrl}`);
  // window.location.replace(`/category/${taxonomyUrl}`);
};

export const GetTaxonomy = (taxo, argDEPT, argTyp, argsubTyp_1) => {
  let level = 1;
  let categories = [];

  let i = 0;
  if (argsubTyp_1 != null) {
    level = 4;
  } else if (argTyp != null) {
    level = 3;
  } else if (argDEPT != null) {
    level = 2;
  } else level = 1;
  switch (level) {
    case 1:
      categories = [];
      i = 0;

      if (Object.entries(taxo).length > 0) {
        taxo.map((cat) => {
          if (cat.TYP && cat.TYP.toUpperCase() == "EMPTY") {
            categories.push({
              taxonomy: "DEPT",
              category: cat.DEPT,
              url: cat.URL,
            });
          }
        });
      }

      return categories;
      break;
    case 2:
      categories = [];
      i = 0;
      if (Object.entries(taxo).length > 0) {
        taxo.map((cat) => {
          if (
            cat.DEPT == argDEPT &&
            cat.TYP &&
            cat.TYP.toUpperCase() != "EMPTY" &&
            cat.SUBTYP_1 &&
            cat.SUBTYP_1.toUpperCase() == "EMPTY"
          ) {
            categories.push({
              taxonomy: "TYP",
              category: cat.TYP,
              url: cat.URL,
            });
          }
        });
      }
      return categories;
      break;
    case 3:
      categories = [];
      i = 0;
      if (Object.entries(taxo).length > 0) {
        taxo.map((cat) => {
          if (
            cat.DEPT == argDEPT &&
            cat.TYP == argTyp &&
            cat.SUBTYP_1.toUpperCase() != "EMPTY" &&
            cat.SUBTYP_2.toUpperCase() == "EMPTY"
          ) {
            i++;
            categories.push({
              taxonomy: "subTyp_1",
              category: cat.SUBTYP_1,
              url: cat.URL,
            });
          }
        });
      }
      return categories;
      break;
    case 4:
      categories = [];
      i = 0;
      if (Object.entries(taxo).length > 0) {
        taxo.map((cat) => {
          if (
            cat.DEPT == argDEPT &&
            cat.TYP == argTyp &&
            cat.SUBTYP_1 == argsubTyp_1 &&
            cat.SUBTYP_2.toUpperCase() != "EMPTY"
          ) {
            i++;
            categories.push({
              taxonomy: "subTyp_2",
              category: cat.SUBTYP_2,
              url: cat.URL,
            });
          }
        });
      }


function openMobile() {
  var x = document.getElementById("navbarResponsive");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

      return categories;
      break;
  }
};
