import React from "react";
import { useStateValue } from "../../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import * as Data from "../../Data";
import prodData from "../prodData.json";

const productsBySelectedBrands = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.brand == filters.brand) {
        if (selectedProducts.includes(prods)) {
        } else {
          selectedProducts.push(prods);
        }
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

export const GetSelectedFilters = (props) => {
  const [{ basket, sFilters }, dispatch] = useStateValue();

  let filters = reactLocalStorage.getObject("storedFilters");

  console.log("props.filters.brand");
  console.log(props.filters);

  const removeCategyFilters = (
    slectedFilters,
    term,
    value,
    history,
    isHistory
  ) => {
    let index;
    if (
      term == "brand" ||
      term == "color" ||
      term == "size" ||
      term == "caliber" ||
      term == "priceRange"
    ) {
      index = slectedFilters[term].indexOf(value);
      slectedFilters[term].splice(index, index + 1);
      if (slectedFilters[term].length == 0) {
        delete slectedFilters[term];
      }
    } else {
      delete slectedFilters[term];
      delete slectedFilters[value];
    }

    //reactLocalStorage.clear('storedFilters')

    dispatch({
      type: "ADD_FILTERS",
      filterItems: {
        ...slectedFilters,
      },
    });
    filters = reactLocalStorage.setObject("storedFilters", slectedFilters);
    if (slectedFilters.SUBTYP_3_Url) {
      history.push("/category/" + slectedFilters.SUBTYP_3_Url);
    } else if (slectedFilters.SUBTYP_2_Url) {
      history.push("/category/" + slectedFilters.SUBTYP_2_Url);
    } else if (slectedFilters.SUBTYP_1_Url) {
      history.push("/category/" + slectedFilters.SUBTYP_1_Url);
    } else if (slectedFilters.TYP_Url) {
      history.push("/category/" + slectedFilters.TYP_Url);
    } else if (slectedFilters.DEPT_Url) {
      history.push("/category/" + slectedFilters.DEPT_Url);
    } else {
      history.push("/category/all-products");
    }
  };

  const removeFilter = (slectedFilters, term, value) => {
    let index;
    if (
      term == "brand" ||
      term == "color" ||
      term == "caliber" ||
      term == "size" ||
      term == "priceRange"
    ) {
      index = slectedFilters[term].indexOf(value);
      slectedFilters[term].splice(index, index + 1);
      if (slectedFilters[term].length == 0) {
        delete slectedFilters[term];
      }
    } else {
      delete slectedFilters[term];
    }

    // reactLocalStorage.clear('storedFilters')

    dispatch({
      type: "ADD_FILTERS",
      filterItems: {
        ...slectedFilters,
      },
    });
    filters = reactLocalStorage.setObject("storedFilters", slectedFilters);
  };
  let history = useHistory();

  return (
    <>
      {props.filters.DEPT && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "DEPT",
                "DEPT_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.DEPT}
        </span>
      )}

      {props.filters.TYP && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "TYP",
                "TYP_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.TYP}
        </span>
      )}

      {props.filters.SUBTYP_1 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "SUBTYP_1",
                "SUBTYP_1_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.SUBTYP_1}
        </span>
      )}
      {props.filters.SUBTYP_2 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "SUBTYP_2",
                "SUBTYP_2_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.SUBTYP_2}
        </span>
      )}

      {props.filters.SUBTYP_3 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "SUBTYP_3",
                "SUBTYP_3_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.SUBTYP_3}
        </span>
      )}

      {props.filters.color
        ? props.filters.color.map((seleted_Color) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "color", seleted_Color);
                  }}
                ></i>
                {seleted_Color}
              </span>
            );
          })
        : ""}

      {props.filters.BRAND
        ? props.filters.BRAND.map((seleted_Brand) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "BRAND", seleted_Brand);
                  }}
                ></i>
                {seleted_Brand}
              </span>
            );
          })
        : ""}

      {props.filters.CALIBER
        ? props.filters.CALIBER.map((seleted_caliber) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "CALIBER", seleted_caliber);
                  }}
                ></i>
                {seleted_caliber}
              </span>
            );
          })
        : ""}

      {props.filters.size
        ? props.filters.size.map((slected_Sizes) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "size", slected_Sizes);
                  }}
                ></i>
                {slected_Sizes}
              </span>
            );
          })
        : ""}

      {props.filters.priceRange
        ? props.filters.priceRange.map((slected_price) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "priceRange", slected_price);
                  }}
                ></i>
                {slected_price}
              </span>
            );
          })
        : ""}
    </>
  );
};

export const shopByPrice = (getProducts) => {
  let priceRange = [];

  getProducts.map((product) => {
    if (product.PRICERANGE != null) {
      if (priceRange.includes(product.PRICERANGE)) {
      } else {
        priceRange.push(product.PRICERANGE);
      }
    }
  });
  priceRange = priceRange.sort(sortPricing);

  return priceRange;
};

var sortPricing = (n1, n2) => {
  return Number(n1.match(/(\d+)/g)[0]) - Number(n2.match(/(\d+)/g)[0]);
};

export const shopByBrand = (getProducts) => {
  let brandFilters = {
    brand: [],
    itemsCount: [],
  };
  brandFilters = [];
  let brands = [];
  let itemsCount = [];

  if (getProducts.length > 0) {
    getProducts.map((prods) => {
      if (brands.includes(prods.BRAND)) {
      } else {
        brands.push(prods.BRAND);
      }
    });
  } else {
  }

  for (let i = 0; i < brands.length; i++) {
    let count = 0;
    getProducts.map((prods) => {
      if (brands[i] == prods.BRAND) {
        count++;
        itemsCount[i] = count;
      }
    });
  }
  brandFilters.brand = [...brands];
  brandFilters.itemsCount = [...itemsCount];
  return brandFilters;
};

export const shopByCaliber = (getProducts) => {
  let caliberFilters = {
    calibers: [],
    itemsCount: [],
  };
  caliberFilters = [];
  let caliber = [];
  let itemCount = [];

  if (getProducts.length > 0) {
    getProducts.map((prods) => {
      if (caliber.includes(prods.CALIBER)) {
      } else {
        caliber.push(prods.CALIBER);
      }
    });
  } else {
  }

  for (let i = 0; i < caliber.length; i++) {
    let count = 0;
    getProducts.map((prods) => {
      if (caliber[i] == prods.CALIBER) {
        count++;
        itemCount[i] = count;
      }
    });
  }
  caliberFilters.calibers = [...caliber];
  caliberFilters.itemsCount = [...itemCount];

  return caliberFilters;
};

export const shopBySize = (getProducts) => {
  let selectedSizes = [];

  getProducts.map((product) => {
    if (product.GENER == "simple") {
    } else {
      product.VARIANTS.map((vProducts) => {
        if (vProducts.SIZE != null) {
          vProducts.SIZE.map((SIZES) => {
            if (selectedSizes.includes(SIZES)) {
            } else {
              selectedSizes.push(SIZES);
            }
          });
        }
      });
    }
  });

  return selectedSizes;
};

export const shopByColor = (getProducts) => {
  let selectedColors = [];
  console.log("pppppppppppppp");
  console.log(getProducts);

  getProducts.map((product) => {
    if (product.GENER === "simple") {
    } else {
      product.VARIANTS.map((vProducts) => {
        if (vProducts.COLOR != null) {
          vProducts.COLOR.map((prodColor) => {
            if (selectedColors.includes(prodColor.NAME)) {
            } else {
              selectedColors.push(prodColor.NAME);
            }
          });
        }
      });
    }
  });

  return selectedColors;
};

export const taxonomyLevels = (filters) => {
  let taxonomyLetvel = 0;
  if (filters.SUBTYP_2 && filters.SUBTYP_2 != "EMPTY") taxonomyLetvel = 4;
  else if (filters.SUBTYP_1 && filters.SUBTYP_1 != "EMPTY") taxonomyLetvel = 3;
  else if (filters.TYP && filters.TYP != "EMPTY") taxonomyLetvel = 2;
  else if (filters.DEPT && filters.DEPT != "EMPTY") taxonomyLetvel = 1;
  else taxonomyLetvel = 0;
  return taxonomyLetvel;
};
export const shopByCategories = (currentFilters, url, currentProds) => {
  let level = 0;
  let categoryData = {
    taxonomy: "",
    categories: [],
  };

  level = taxonomyLevels(currentFilters);
  if (level == 4) {
    currentProds.map((product) => {
      if (product.SUBTYP_3) {
        if (categoryData.categories.includes(product.SUBTYP_3)) {
        } else {
          if (
            product.SUBTYP_2.toUpperCase() ==
              currentFilters.SUBTYP_2.toUpperCase() &&
            product.SUBTYP_3 != "EMPTY" &&
            product.subTYP_4 == "EMPTY"
          ) {
            categoryData.categories.push(product.SUBTYP_3);
            categoryData.taxonomy = "SUBTYP_3";
          }
        }
      }
    });
  } else if (level == 3) {
    currentProds.map((product) => {
      if (product.SUBTYP_2) {
        if (categoryData.categories.includes(product.SUBTYP_2)) {
        } else {
          if (
            product.SUBTYP_1.toUpperCase() ==
              currentFilters.SUBTYP_1.toUpperCase() &&
            product.SUBTYP_2 != "EMPTY" &&
            product.SUBTYP_3 == "EMPTY"
          ) {
            categoryData.categories.push(product.SUBTYP_2);
            categoryData.taxonomy = "SUBTYP_2";
          }
        }
      }
    });
  } else if (level == 2) {
    currentProds.map((product) => {
      if (product.SUBTYP_1) {
        if (categoryData.categories.includes(product.SUBTYP_1)) {
        } else {
          if (
            product.TYP == currentFilters.TYP &&
            product.SUBTYP_1 != "EMPTY" &&
            product.SUBTYP_2 == "EMPTY"
          ) {
            categoryData.categories.push(product.SUBTYP_1);
            categoryData.taxonomy = "SUBTYP_1";
          }
        }
      }
    });
  } else if (level == 1) {
    prodData.map((product) => {
      if (product.TYP) {
        if (categoryData.categories.includes(product.TYP)) {
        } else {
          if (
            product.DEPT.toUpperCase() == currentFilters.DEPT.toUpperCase() &&
            product.TYP != "EMPTY" //&&
            // product.SUBTYP_1 == "EMPTY"
          ) {
            categoryData.categories.push(product.TYP);
            categoryData.taxonomy = "TYP";
          }
        }
      }
    });
  } else if (level == 0) {
    currentProds.map((product) => {
      if (product.DEPT) {
        if (
          categoryData.categories.includes(product.DEPT) ||
          product.DEPT == "" ||
          product.DEPT == " " ||
          product.DEPT == "EMPTY"
        ) {
        } else {
          categoryData.categories.push(product.DEPT);
          categoryData.taxonomy = "DEPT";
        }
      }
    });
  } else {
  }

  return categoryData;
};
