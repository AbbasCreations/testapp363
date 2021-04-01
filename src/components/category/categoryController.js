import * as Data from "../../Data";
import * as hC from "../header/headerController";
import { prodImagesDir } from "../../settings";
import { Link } from "react-router-dom";
import taxonomy from "../taxonomy.json";

export const getProducts = (
  filters,
  products,
  dispatch,
  property,
  url,
  taxonomy,
  category
) => {
  let getProducts = [];
  let selectedProducts = [];
  let allProducts = products;

  let i = -1;

  if (url == "all-products") {
    filters["all-products"] = "all-products";
  }
  getProducts = allProducts;

  if (taxonomy == "SUBTYP_2") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.SUBTYP_2 == category &&
        prod.SUBTYP_3 == "EMPTY" &&
        prod.SUBTYP_2 != "EMPTY"
    );
  } else if (taxonomy == "SUBTYP_1") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.SUBTYP_1 == category &&
        prod.SUBTYP_2 == "EMPTY" &&
        prod.SUBTYP_1 != "EMPTY"
    );
  } else if (taxonomy == "TYP") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.TYP.toUpperCase() == category.toUpperCase() &&
        prod.SUBTYP_1 == "EMPTY" &&
        prod.TYP != "EMPTY"
    );
  } else if (taxonomy == "DEPT") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.DEPT.toUpperCase() == category.toUpperCase() && prod.TYP == "EMPTY"
    );
  } else if (url == "all-products") {
    getProducts = [];
    getProducts = allProducts;
  } else {
    getProducts = [];
  }

  if (Object.entries(filters).length !== 0) {
    //Load products by seleted color filters
    if (filters.color) {
      getProducts = productsBySelectedColors(filters, getProducts);
    }

    //Load products by seleted brand filters
    if (filters.BRAND) {
      getProducts = productsBySelectedBrands(filters, getProducts);
    }

    if (filters.CALIBER) {
      getProducts = productsBySelectedCaliber(filters, getProducts);
    }

    //Load products by seleted size filters
    if (filters.size) {
      getProducts = productsBySelectedSize(filters, getProducts);
    }

    //Load products by seleted price Ranges filters
    if (filters.priceRange) {
      getProducts = productsBySelectedPriceRanges(filters, getProducts);
    }
  } else {
  }

  if (property == "default") {
  } else {
    getProducts = SortProducts(property, getProducts, dispatch);
  }

  return getProducts;
};

const productsBySelectedColors = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.gener == "simple") {
        /* prods.color.map((clr) => {
          if (filters.color.includes(clr)) {
            if (selectedProducts.includes(prods)) {
            } else {
              selectedProducts.push(prods)
            }
          }
        })*/
      } else {
        prods.VARIANTS.map((vproduct) => {
          vproduct.COLOR.map((clr) => {
            if (filters.color.includes(clr.NAME)) {
              if (selectedProducts.includes(prods)) {
              } else {
                selectedProducts.push(prods);
              }
            }
          });
        });
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

const productsBySelectedBrands = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.BRAND == filters.BRAND) {
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

const productsBySelectedCaliber = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.CALIBER == filters.CALIBER) {
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

const productsBySelectedSize = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.GENER == "simple") {
        /* prods.color.map((clr) => {
           if (filters.color.includes(clr)) {
             if (selectedProducts.includes(prods)) {
             } else {
               selectedProducts.push(prods)
             }
           }
         })*/
      } else {
        prods.VARIANTS.map((vproduct) => {
          vproduct.SIZE.map((siz) => {
            if (filters.size.includes(siz)) {
              if (selectedProducts.includes(prods)) {
              } else {
                selectedProducts.push(prods);
              }
            }
          });
        });
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

const productsBySelectedPriceRanges = (filters, getProducts) => {
  let selectedProducts = [];

  if (filters.priceRange) {
    if (getProducts) {
      getProducts.map((prods) => {
        filters.priceRange.map((price) => {
          if (prods.PRICERANGE == price) {
            if (selectedProducts.includes(prods)) {
            } else {
              selectedProducts.push(prods);
            }
          }
        });
      });
    } else {
      selectedProducts = [];
    }
  }
  return selectedProducts;
};

export const getCategoryTitle = (props) => {
  let categoryHeading = "";
  if (props.filters.SUBTYP_3) {
    categoryHeading = props.filters.SUBTYP_3;
  } else if (props.filters.SUBTYP_2) {
    categoryHeading = props.filters.SUBTYP_2;
  } else if (props.filters.SUBTYP_1) {
    categoryHeading = props.filters.SUBTYP_1;
  } else if (props.filters.TYP) {
    categoryHeading = props.filters.TYP;
  } else if (props.filters.DEPT) {
    categoryHeading = props.filters.DEPT;
  } else if (props.filters.BRAND) {
    categoryHeading = props.filters.BRAND;
  } else if (props.filters.All) {
    categoryHeading = props.filters.All;
  } else {
  }

  return categoryHeading;
};

export const pagination = (products, productsPerPage, activePage) => {
  let pagination = {};
  // Logic for displaying current products
  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentproducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  pagination.currentproducts = currentproducts;
  return pagination;
};

export const handlePageChange = (setCurrentPage, e) => {
  setCurrentPage(e);
};

export const handleChangePerPage = (setPerpageProductscount, e) => {
  let value = e.target.value;
  setPerpageProductscount(value);
};

export const getCategoryBreadCrumbs = (props) => {
  let breadcrumbs = [];
  let breadcrumbsContent = [];

  if (props.urlData.taxonomy && props.urlData.taxonomy == "DEPT") {
    breadcrumbs.push({
      item: props.urlData.category,
      url: props.urlData.url,
      taxonomy: "DEPT",
      redirectUrl: "DEPT_Url",
    });
  } else if (props.urlData.taxonomy == "TYP") {
    let DEPT = "";
    let DEPT_Url = "";

    Data.taxonomy.map((categories) => {
      if (
        categories.TYP.toUpperCase() == props.urlData.category.toUpperCase() &&
        categories.URL == props.urlData.url &&
        categories.SUBTYP_1 == "EMPTY"
      ) {
        DEPT = categories.DEPT;

        Data.taxonomy.map((cat) => {
          if (
            cat.DEPT.toUpperCase() == DEPT.toUpperCase() &&
            cat.TYP == "EMPTY"
          ) {
            DEPT_Url = cat.URL;
          }
        });
      }
    });

    breadcrumbs.push(
      {
        item: DEPT,
        url: DEPT_Url,
        taxonomy: "DEPT",
        redirectUrl: "DEPT_Url",
      },
      {
        item: props.urlData.category,
        url: props.urlData.url,
        taxonomy: "TYP",
        redirectUrl: "TYP_Url",
      }
    );
  } else if (props.urlData.taxonomy == "SUBTYP_1") {
    let DEPT = "";
    let DEPT_Url = "";

    let TYP = "";
    let TYP_Url = "";

    Data.taxonomy.map((categories) => {
      if (
        categories.SUBTYP_1.toUpperCase() ==
          props.urlData.category.toUpperCase() &&
        categories.URL == props.urlData.url &&
        categories.SUBTYP_2 == "EMPTY"
      ) {
        DEPT = categories.DEPT;
        TYP = categories.TYP;
        Data.taxonomy.map((cat) => {
          if (
            cat.DEPT.toUpperCase() == DEPT.toUpperCase() &&
            cat.TYP == "EMPTY"
          ) {
            DEPT_Url = cat.URL;
          }
        });

        Data.taxonomy.map((cat) => {
          if (
            cat.DEPT.toUpperCase() == DEPT.toUpperCase() &&
            cat.TYP == TYP &&
            cat.SUBTYP_1 == "EMPTY"
          ) {
            TYP_Url = cat.URL;
          }
        });
      }
    });

    breadcrumbs.push(
      {
        item: DEPT,
        url: DEPT_Url,
        taxonomy: "DEPT",
        redirectUrl: "DEPT_Url",
      },
      {
        item: TYP,
        url: TYP_Url,
        taxonomy: "TYP",
        redirectUrl: "TYP_Url",
      },

      {
        item: props.urlData.category,
        url: props.urlData.url,
        taxonomy: "SUBTYP_1",
        redirectUrl: "SUBTYP_1_Url",
      }
    );
  } else if (props.urlData.url == "all-products") {
    breadcrumbs.push({
      item: "All Products",
      url: "all-products",
      taxonomy: "All Products",
      redirectUrl: "",
    });
  }

  breadcrumbsContent.push(
    <li className="breadcrumb-item">
      <Link to="/" className="text-dark text-decoration-none">
        Home
      </Link>
    </li>
  );

  let i = -1;
  for (const [key, value] of Object.entries(breadcrumbs)) {
    i++;

    if (i == breadcrumbs.length - 1) {
      breadcrumbsContent.push(
        <li className="breadcrumb-item active" aria-current="page">
          {value.item}
        </li>
      );
    } else {
      breadcrumbsContent.push(
        <li className="breadcrumb-item">
          <Link
            to=""
            className="text-dark text-decoration-none"
            onClick={(e) => {
              let dispatchedData = {};

              dispatchedData = {
                taxonomy: value.taxonomy,
                redirectUrl: value.redirectUrl,
                taxonomyValue: value.item,
                taxonomyUrl: value.url,
              };
              hC.addFilters(e, dispatchedData, props.dispatch, props.history);
            }}
          >
            {value.item}
          </Link>
        </li>
      );
    }
  }

  return breadcrumbsContent;
};
const SortProducts = (property, products, dispatch) => {
  let tempProducts = [];
  let Sorting = { value: "default", order: "ASC" };

  if (property == "name(a-z)") {
    Sorting = { value: "NAME", order: "ASC" };
  } else if (property == "name(z-a)") {
    Sorting = { value: "NAME", order: "DESC" };
  } else if (property == "featuredASC") {
    Sorting = { value: "FEATURED", order: "ASC" };
  } else if (property == "price-high-to-low") {
    Sorting = { value: "REGULAR_PRICE", order: "DESC" };
  } else if (property == "price-low-to-high") {
    Sorting = { value: "REGULAR_PRICE", order: "ASC" };
  } else {
    Sorting = { value: "default", order: "ASC" };
  }

  tempProducts = products.sort(SortProcess(Sorting));

  return tempProducts;
};
const SortProcess = (sorting) => {
  let property = "default";
  let order = "ASC";
  property = sorting.value;
  order = sorting.order;

  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    if (order == "ASC") {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    } else {
      var result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    }
    return result * sortOrder;
  };
};

export const getUrlTaxonomy = (url) => {
  let categoryData = {};
  taxonomy.map((categories) => {
    if (
      url == categories.URL &&
      categories.SUBTYP_3 != "EMPTY" &&
      categories.SUBTYP_4 == "EMPTY"
    ) {
      categoryData = { taxonomy: "SUBTYP_3", category: categories.SUBTYP_3 };
    } else if (
      url == categories.URL &&
      categories.SUBTYP_2 != "EMPTY" &&
      categories.SUBTYP_3 == "EMPTY"
    ) {
      categoryData = { taxonomy: "SUBTYP_2", category: categories.SUBTYP_2 };
    } else if (
      url == categories.URL &&
      categories.SUBTYP_1 != "EMPTY" &&
      categories.SUBTYP_2 == "EMPTY"
    ) {
      categoryData = { taxonomy: "SUBTYP_1", category: categories.SUBTYP_1 };
    } else if (
      url == categories.URL &&
      categories.TYP != "EMPTY" &&
      categories.SUBTYP_1 == "EMPTY"
    ) {
      categoryData = { taxonomy: "TYP", category: categories.TYP };
    } else if (
      url == categories.URL &&
      categories.DEPT != "EMPTY" &&
      categories.TYP == "EMPTY"
    ) {
      categoryData = { taxonomy: "DEPT", category: categories.DEPT };
    } else if (url == "all-products") {
      categoryData = { taxonomy: "All", category: "All Products" };
    }
  });
  return categoryData;
};

export const getColorAttrOnThumbs = (colorOrImages, id) => {
  let results = {};
  let colorImages = [];
  let colorCode = [];
  let content = "";

  /*
  let product = Data.allProducts.find((prod) => prod.style_id == id);

  if (product && product.gener != "simple") {
    if (colorOrImages == "images") {
      colorImages = getThumbColorImages(product);
      results = { name: "image", data: [...colorImages] };
    } else if (colorOrImages == "color") {
      colorCode = getThumbColorcode(product);
      colorImages = getThumbColorImages(product);
      results = {
        name: "colorCode",
        data: [...colorCode],
        images: [...colorImages],
      };
    } else {
      results = {};
    }
  } else {
    results = {};
  }
*/
  return results;
};
const getThumbColorImages = (product) => {
  let smallColorImages = [];
  let imageUrl = "";
  if (product.GENER === "simple") {
  } else {
    product.VARIANTS.map((vProduct) => {
      vProduct.COLOR.map((color) => {
        if (color.COLORSMALLIMAGE && color.COLORSMALLIMAGE != "") {
          imageUrl = prodImagesDir + color.COLORSMALLIMAGE;
          smallColorImages.push(imageUrl);
        }
      });
    });
  }
  return smallColorImages;
};

const getThumbColorcode = (product) => {
  let colorCode = [];

  product.VARIANTS.map((vProduct) => {
    vProduct.COLOR.map((color) => {
      colorCode.push(color.COLORCODE);
    });
  });

  return colorCode;
};
