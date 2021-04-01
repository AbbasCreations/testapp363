import React, { useState, useEffect } from "react";
import * as Data from "../../Data";
import { prodImagesDir } from "../../settings";
import * as hC from "../header/headerController";
import MagicZoom from "../../js/magiczoomplusReactJs";
import { Link } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import * as API from "../../API";

export const getProduct = (id) => {
  let product = Data.allProducts.find((prod) => prod.STYLE_ID == id);

  return product;
};
export const getProductBreadCrumbs = (product, history, dispatch) => {
  let breadcrumbs = [];
  let breadcrumbsContent = [];
  console.log("brrrrrr");
  console.log(Data.taxonomy);
  let taxonomy = [];
  let exists = [];
  Data.taxonomy.map((categories) => {
    if (
      product.DEPT.toUpperCase() == categories.DEPT.toUpperCase() &&
      product.TYP == "EMPTY" &&
      product.DEPT != "EMPTY"
    ) {
      if (exists.includes(categories.DEPT)) {
      } else {
        exists.push(categories.DEPT);

        breadcrumbs.push({
          item: categories.DEPT,
          url: categories.URL,
          taxonomy: "DEPT",
          redirectUrl: "DEPT_Url",
        });
      }
    } else if (
      product.TYP.toUpperCase() == categories.TYP.toUpperCase() &&
      product.SUBTYP_1 == "EMPTY" &&
      product.TYP != "EMPTY"
    ) {
      if (exists.includes(categories.DEPT)) {
      } else {
        exists.push(categories.DEPT);

        breadcrumbs.push({
          item: categories.TYP,
          url: categories.URL,
          taxonomy: "TYP",
          redirectUrl: "TYP_Url",
        });
      }
    } else if (
      product.SUBTYP_1.toUpperCase() == categories.SUBTYP_1.toUpperCase() &&
      product.SUBTYP_2 == "EMPTY" &&
      product.SUBTYP_1 != "EMPTY"
    ) {
      if (exists.includes(categories.DEPT)) {
      } else {
        exists.push(categories.DEPT);

        breadcrumbs.push({
          item: categories.SUBTYP_1,
          url: categories.URL,
          taxonomy: "SUBTYP_1",
          redirectUrl: "SUBTYP_1_Url",
        });
      }
    } else if (
      product.SUBTYP_2.toUpperCase() == categories.SUBTYP_2.toUpperCase() &&
      product.SUBTYP_3 == "EMPTY" &&
      product.SUBTYP_2 != "EMPTY"
    ) {
      if (exists.includes(categories.DEPT)) {
      } else {
        exists.push(categories.DEPT);

        breadcrumbs.push({
          item: categories.SUBTYP_2,
          url: categories.URL,
          taxonomy: "SUBTYP_2",
          redirectUrl: "SUBTYP_2_Url",
        });
      }
    } else if (
      product.SUBTYP_3.toUpperCase() == categories.SUBTYP_3.toUpperCase() &&
      product.SUBTYP_4 == "EMPTY" &&
      product.SUBTYP_3 != "EMPTY"
    ) {
      if (exists.includes(categories.DEPT)) {
      } else {
        exists.push(categories.DEPT);

        breadcrumbs.push({
          item: categories.SUBTYP_3,
          url: categories.URL,
          taxonomy: "SUBTYP_3",
          redirectUrl: "SUBTYP_2_Url",
        });
      }
    } else {
    }
  });

  if (breadcrumbs.length == 0) {
    breadcrumbs.push({
      item: "All Products",
      url: "all-products",
      taxonomy: "All Products",
      redirectUrl: "",
    });
  }

  // ADDED PRODUCT'S NAME IN THE END
  breadcrumbs.push({
    item: product.NAME,
    url: product.URL,
    taxonomy: "Product",
    redirectUrl: "",
  });

  breadcrumbsContent.push(
    <li className="breadcrumb-item">
      <Link to="/" className="text-dark text-decoration-none">
        Home
      </Link>
    </li>
  );

  let i = -1;
  console.log("baaaaaaa");
  console.log(breadcrumbs);
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
              hC.addFilters(e, dispatchedData, dispatch, history);
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

export const getProductImage = (props) => {
  let productLargeImage = {};

  if (props.product.LARGEIMAGE) {
    productLargeImage.image = props.product.LARGEIMAGE;
    productLargeImage.altText = props.product.NAME;
  } else {
    productLargeImage.image = prodImagesDir + "default-image.jpeg";
    productLargeImage.altText = "Default Image";
  }

  return productLargeImage;
};

export const getProductSmallImage = (product) => {
  let productSmallImage = "";
  if (product.SMALLIMAGE) {
    productSmallImage = product.SMALLIMAGE;
  } else {
    productSmallImage = prodImagesDir + "default-image.jpeg";
  }

  return productSmallImage;
};

export const getProductInfo = (props) => {
  let product = props.product;
  return product;
};

export const getProductNewsLetters = (props) => {
  return "";
};

export const getProductDetails = (props) => {
  return "";
};

export const getAdditionalProducts = (API, props, number) => {
  let prodDept = props.product.DEPT;
  let prodBrand = props.product.BRAND;
  API.getWeRecommend(
    "",
    prodBrand,
    6,
    props.setAdditionalProducts,
    props.setLoading
  );

  return "";
};

export const productPricing = (product) => {
  let prodPrice = {
    REGULAR_PRICE: 0,
    SALES_PRICE: 0,
  };
  if (product.SALES_PRICE && product.SALES_PRICE > 0) {
    prodPrice.REGULAR_PRICE = product.REGULAR_PRICE;
    prodPrice.SALES_PRICE = product.SALES_PRICE;
  } else {
    prodPrice.REGULAR_PRICE = product.REGULAR_PRICE;
  }
  return prodPrice;
};

export const GetProductSizes = (product, setProdSizes) => {
  let sizes = [];

  sizes = API.getProductSizes(product.STYLE_ID, "", "", "", "", setProdSizes);

  return sizes;
};

export const GetProductColors = (product, setProdColors) => {
  let sizes = [];

  useEffect(() => {
    API.getProductColors(product.STYLE_ID, "", "", "", "", setProdColors);
  }, [product.STYLE_ID]);

  return "";
};

export const updateQuantity = (e, selectedProduct) => {
  selectedProduct.quantity = e.target.value;
  return selectedProduct;
};

export const SizeButtonEffectsOnClick = (
  clickType,
  e,
  product,
  selectedProduct
) => {
  if (clickType == "select") {
    if (e.target.value == "" || e.target.value == "Select a Size") {
      selectedProduct.selectedSize = "";
      document.getElementById("selected-size").innerHTML = "";
      selectedProduct.selectedSize = "";
    } else {
      selectedProduct.selectedSize = e.target.value;
      document.getElementById("selected-size").innerHTML = e.target.value;
      document.getElementById("sizeAlert").classList.add("d-none");
    }
  } else {
    if (e.target.classList.contains("selected")) {
      document.getElementById("selected-size").innerHTML = "";
      selectedProduct.selectedSize = "";
      e.target.classList.remove("selected");
    } else {
      try {
        let SizeBtnParent = document.getElementById("sizeButtons");
        let allSizeButtons = SizeBtnParent.getElementsByTagName("button");
        for (var i = 0; i < allSizeButtons.length; i++) {
          allSizeButtons[i].classList.remove("selected");
        }
      } catch (err) {}
      e.target.classList.add("selected");
      selectedProduct.selectedSize = e.target.value;
      document.getElementById("selected-size").innerHTML = e.target.value;
    }
  }
  return selectedProduct;
};

export const GetSelectedColors = (
  clickType,
  e,
  product,
  selectedProduct,
  productColorsStyle,
  allowOutOfStock,
  colorsRec,
  setColorsRec
) => {
  e.preventDefault();

  // START SIZE BUTTONS SELECTION/UNSELECTION AND BORDER CHNAGE
  selectedProduct = SizeButtonEffectsOnClick(
    clickType,
    e,
    product,
    selectedProduct
  );
  // END SIZE BUTTONS SELECTION/UNSELECTION AND BORDER CHNAGE

  let selectedSize = e.target.value;

  // OBJECT TO HOLD COLOR ATTRIBUTES DATA
  let colorsData = {
    color: [],
    colorCode: [],
    colorSmallImage: [],
    colorLargeImage: [],
    colorStock: [],
    altImages: [],
  };

  colorsData = FetchColorAttributes(
    selectedSize,
    product,
    colorsData,
    colorsRec,
    setColorsRec
  );

  console.log("colordataaaaaaaaa");
  console.log(colorsData);
  // GET PRICE OF SELECTED SIZE
  getSelectedSizePrice(product);

  // DISPLAY COLOR ATTRIBUTES LAYOUT ACCORDING TO SETTINGS

  if (productColorsStyle == "select") {
    // DISPLAY SIZE ATTRIBUTES AS SELECT
    selectedProduct = displayColorAsSelect(
      e,
      selectedProduct,
      colorsData,
      allowOutOfStock
    );
  }

  if (productColorsStyle == "colors") {
    // DISPLAY SIZE ATTRIBUTES AS BUTTONS
    selectedProduct = displayColorAsColor(
      e,
      selectedProduct,
      colorsData,
      allowOutOfStock
    );
  }

  if (productColorsStyle == "buttons") {
    // DISPLAY SIZE ATTRIBUTES AS BUTTONS
    selectedProduct = displayColorAsButtons(
      e,
      selectedProduct,
      colorsData,
      allowOutOfStock
    );
  }

  if (productColorsStyle == "images") {
    // DISPLAY SIZE ATTRIBUTES AS BUTTONS
    selectedProduct = displayColorAsImages(
      e,
      selectedProduct,
      colorsData,
      allowOutOfStock
    );
  }
  if (selectedProduct.selectedSize) {
    document.getElementById("sizeAlert").classList.add("d-none");
  }

  return selectedProduct;
};

export const actionOnStockStatus = (
  stock,
  selectedProduct,
  allowOutOfStock
) => {
  let stockInfo = {
    availability: "Out of Stock",
    stock: 0,
  };

  if (stock && stock > 0) {
    stockInfo.availability = "In Stock";
    stockInfo.stock = stock;
  } else {
    stockInfo.availability = "Out of Stock";
    stockInfo.stock = stock;
  }

  document.getElementById("stock-status").innerHTML = stockInfo.availability;

  selectedProduct.stock = parseInt(stockInfo.stock);
  if (selectedProduct.stock > 0) {
    document.getElementById("AddToCart").innerHTML = "add to cart";
    document.getElementById("AddToCart").disabled = false;

    document
      .getElementById("AddToCart")
      .setAttribute("data-bs-target", "#exampleModal");
  } else {
    if (allowOutOfStock == "yes") {
    } else {
      document.getElementById("AddToCart").innerHTML = "Out of Stock";
      document.getElementById("AddToCart").disabled = true;
      document.getElementById("AddToCart").setAttribute("data-bs-target", "");
    }
  }
  return selectedProduct;
};

export const FetchColorAttributes = (
  selectedSize,
  prod,
  colorsData,
  colorsRec,
  setColorsRec
) => {
  let a = {};
  API.getProductColors(
    prod.STYLE_ID,
    "",
    "",
    "",
    "",
    colorsRec,
    setColorsRec
  ).then((response) => {
    if (Object.entries(response).length > 0) {
    } else {
      response = [];
    }

    for (let x = 0; x < response.length; x++) {
      colorsData.color.push(response[x].ORIGATTR1);
      colorsData.colorCode.push(response[x].HEX);
      colorsData.colorSmallImage.push(response[x].COLORSMALLIMAGE);
      colorsData.colorLargeImage.push(response[x].COLORLARGEIMAGE);
      colorsData.colorStock.push(response[x].QOH);
      colorsData.altImages.push([]);
    }
    reactLocalStorage.setObject("storedColors", colorsData);
  });
  let colors = reactLocalStorage.getObject("storedColors");
  reactLocalStorage.setObject("storedColors", []);
  console.log("colorssssssssss");
  console.log(colors);

  return colors;
};

const getSelectedSizePrice = (prod) => {
  let rprice = 0;
  let sprice = 0;
  if (prod.SALES_PRICE) {
    rprice = prod.REGULAR_PRICE;
    sprice = prod.SALES_PRICE;
    document.getElementById("rPrice").innerHTML = "<del>$" + rprice + "</del>";
    document.getElementById("sPrice").innerHTML = "$" + sprice;
    document.getElementById("sPrice").classList.remove("d-none");
  } else {
    rprice = prod.REGULAR_PRICE;
    document.getElementById("rPrice").innerHTML = "$" + rprice;
    document.getElementById("sPrice").classList.add("d-none");
  }
};

const displayColorAsSelect = (
  e,
  selectedProduct,
  colorsData,
  allowOutOfStock
) => {
  let colorSelect = document.getElementById("color");
  colorSelect.innerHTML = "";

  colorSelect.onchange = function (e) {
    selectedProduct.selectedColor = e.target.value;
    let attrStock = this.options[this.selectedIndex].getAttribute("data-stock");
    selectedProduct.colorImage = this.options[this.selectedIndex].getAttribute(
      "data-image"
    );

    selectedProduct = actionOnStockStatus(
      attrStock,
      selectedProduct,
      allowOutOfStock
    );
    selectedProduct.stock = parseInt(attrStock);

    // alert(e.target.options[e.target.selectedIndex].dataset.stock);
    if (e.target.value && e.target.value != "Select a Color") {
      document.getElementById(
        "selected-color"
      ).innerHTML = `<strong> ${e.target.value}</strong>`;
    } else {
      document.getElementById("selected-color").innerHTML = "";
    }

    // GET ALT IMAGES
    if (altImagesData && altImagesData.length > 0) {
      displayAltimages(e.target.value, altImagesData);
    }

    if (selectedProduct.selectedColor) {
      document.getElementById("colorAlert").classList.add("d-none");
    }
  };

  let myOption = document.createElement("option");

  myOption.text = "Select a Color";
  myOption.value = "Select a Color";
  colorSelect.appendChild(myOption);
  let customIndex = -1;
  let altImagesData = [];
  colorsData.color.map((colorValue) => {
    customIndex++;

    if (colorsData.altImages[customIndex].length > 0) {
      altImagesData.push({
        color: colorValue,
        altImages: colorsData.altImages[customIndex],
      });
    }

    if (colorsData.colorSmallImage[customIndex] != "") {
      if (Object.entries(altImagesData) > 0) {
        altImagesData[0].altImages.push(
          colorsData.colorSmallImage[customIndex]
        );
      } else {
        let cArray = [];
        cArray.push(colorsData.colorSmallImage[customIndex]);
        altImagesData.push({
          color: colorValue,
          altImages: cArray,
        });
      }
    }

    let myOption = document.createElement("option");
    myOption.text = colorValue;
    myOption.value = colorValue;
    myOption.setAttribute("data-stock", colorsData.colorStock[customIndex]);
    myOption.setAttribute(
      "data-image",
      colorsData.colorSmallImage[customIndex]
    );
    colorSelect.appendChild(myOption);
  });

  return selectedProduct;
};

export const displayColorAsColor = (
  e,
  selectedProduct,
  colorsData,
  allowOutOfStock
) => {
  let colorButtons = document.getElementById("colorButtons");
  colorButtons.innerHTML = "";
  let colorNameIndex = -1;
  let customIndex = -1;
  let altImagesData = [];

  colorsData.colorCode.map((colorValue) => {
    customIndex++;
    colorNameIndex++;
    let colorName = colorsData.color[colorNameIndex];

    selectedProduct.colorImage =
      prodImagesDir + colorsData.colorSmallImage[customIndex];

    if (colorsData.altImages[customIndex].length > 0) {
      altImagesData.push({
        color: colorName,
        altImages: colorsData.altImages[customIndex],
      });
    }

    if (colorsData.colorSmallImage[customIndex] != "") {
      if (Object.entries(altImagesData) > 0) {
        altImagesData[0].altImages.push(
          colorsData.colorSmallImage[customIndex]
        );
      } else {
        let cArray = [];
        cArray.push(colorsData.colorSmallImage[customIndex]);
        altImagesData.push({
          color: colorName,
          altImages: cArray,
        });
      }
    }

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    if (!colorValue) {
      button.setAttribute("value", colorName);
    } else {
      // button.style.backgroundColor = colorValue + ' !important'
      button.setAttribute(
        "style",
        `background-Color:${colorValue} !important;color:${colorValue} !important;`
      );
      button.setAttribute("value", colorName);
    }

    button.setAttribute(
      "class",
      "border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20"
    );
    button.setAttribute("data-stock", colorsData.colorStock[customIndex]);
    button.setAttribute("data-image", colorsData.colorSmallImage[customIndex]);
    let fontColor = "black";
    if (colorValue == null) {
      colorValue = "red";
      fontColor = "red";
    } else {
      fontColor = colorValue;
    }

    button.setAttribute(
      "style",
      `background-color:${colorValue} !important;color:${fontColor} !important`
    );

    if (colorsData.colorStock[customIndex] <= 0) {
      button.classList.add("disabled");
      button.innerHTML = "<span></span>" + colorName;
    } else {
      button.innerHTML = colorName;
    }

    button.onclick = function (e) {
      if (e.target.classList.contains("selected")) {
        document.getElementById("selected-color").innerHTML = "";
        selectedProduct.selectedColor = "";
        e.target.classList.remove("selected");
      } else {
        try {
          let colorBtnParent = document.getElementById("colorButtons");
          let allColorButtons = colorBtnParent.getElementsByTagName("button");
          for (var i = 0; i < allColorButtons.length; i++) {
            allColorButtons[i].classList.remove("selected");
          }
        } catch (err) {}

        let attrStock = e.target.getAttribute("data-stock");
        selectedProduct.colorImage = e.target.getAttribute("data-image");

        selectedProduct = actionOnStockStatus(
          attrStock,
          selectedProduct,
          allowOutOfStock
        );
        selectedProduct.stock = parseInt(attrStock);

        e.target.classList.add("selected");
        selectedProduct.selectedColor = e.target.value;
        document.getElementById("selected-color").innerHTML = e.target.value;
      }

      // GET ALT IMAGES
      if (altImagesData && altImagesData.length > 0) {
        displayAltimages(colorName, altImagesData);
      }

      if (selectedProduct.selectedColor) {
        document.getElementById("colorAlert").classList.add("d-none");
      }
    };
    colorButtons.appendChild(button);
  });

  return selectedProduct;
};

const displayColorAsButtons = (
  e,
  selectedProduct,
  colorsData,
  allowOutOfStock
) => {
  let colorButtons = document.getElementById("colorButtons");
  colorButtons.innerHTML = "";
  let customIndex = -1;
  let altImagesData = [];
  colorsData.color.map((colorValue) => {
    customIndex++;

    if (colorsData.altImages[customIndex].length > 0) {
      altImagesData.push({
        color: colorValue,
        altImages: colorsData.altImages[customIndex],
      });
    }

    if (colorsData.colorSmallImage[customIndex] != "") {
      if (Object.entries(altImagesData) > 0) {
        altImagesData[0].altImages.push(
          colorsData.colorSmallImage[customIndex]
        );
      } else {
        let cArray = [];
        cArray.push(colorsData.colorSmallImage[customIndex]);
        altImagesData.push({
          color: colorValue,
          altImages: cArray,
        });
      }
    }

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("value", colorValue);
    button.setAttribute(
      "class",
      "border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20"
    );
    button.setAttribute("data-stock", colorsData.colorStock[customIndex]);
    button.setAttribute("data-image", colorsData.colorSmallImage[customIndex]);

    if (colorsData.colorStock[customIndex] <= 0) {
      button.classList.add("disabled");
      button.innerHTML = "<span></span>" + colorValue;
    } else {
      button.innerHTML = colorValue;
    }

    button.onclick = function (e) {
      if (e.target.classList.contains("selected")) {
        document.getElementById("selected-color").innerHTML = "";
        selectedProduct.selectedColor = "";
        e.target.classList.remove("selected");
      } else {
        try {
          let colorBtnParent = document.getElementById("colorButtons");
          let allColorButtons = colorBtnParent.getElementsByTagName("button");
          for (var i = 0; i < allColorButtons.length; i++) {
            allColorButtons[i].classList.remove("selected");
          }
        } catch (err) {}

        let attrStock = e.target.getAttribute("data-stock");
        selectedProduct.colorImage = e.target.getAttribute("data-image");

        selectedProduct = actionOnStockStatus(
          attrStock,
          selectedProduct,
          allowOutOfStock
        );
        selectedProduct.stock = parseInt(attrStock);

        e.target.classList.add("selected");
        selectedProduct.selectedColor = e.target.value;
        document.getElementById("selected-color").innerHTML = e.target.value;
      }

      // GET ALT IMAGES
      if (altImagesData && altImagesData.length > 0) {
        displayAltimages(colorValue, altImagesData);
      }

      if (selectedProduct.selectedColor) {
        document.getElementById("colorAlert").classList.add("d-none");
      }
    };
    colorButtons.appendChild(button);
  });

  return selectedProduct;
};

const displayColorAsImages = (
  e,
  selectedProduct,
  colorsData,
  allowOutOfStock
) => {
  let colorButtons = document.getElementById("colorImages");
  colorButtons.innerHTML = "";
  let colorImages = document.getElementById("colorImages");
  colorImages.innerHTML = "";
  let customIndex = -1;
  let altImages = [];
  let altImagesData = [];
  colorsData.colorSmallImage.map((colorSmallImage) => {
    customIndex++;

    let colorName = colorsData.color[customIndex];
    altImagesData.push({
      color: colorName,
      altImages: colorsData.altImages[customIndex],
    });
    if (!colorSmallImage) {
      //DISPLAY SIZE AS BUTTON IF COLOR IMAGE NOT AVAIABLE
      selectedProduct = displaySizeImageAsButtons(
        e,
        selectedProduct,
        colorsData,
        allowOutOfStock,
        customIndex,
        colorName,
        colorButtons,
        altImagesData
      );
    } else {
      let img = document.createElement("IMG");
      img.src = prodImagesDir + colorSmallImage;

      img.setAttribute("data-stock", colorsData.colorStock[customIndex]);
      img.setAttribute("data-image", colorsData.colorSmallImage[customIndex]);

      img.setAttribute("width", 50);
      img.setAttribute("height", 50);
      img.classList.add("ml-2");
      img.setAttribute(
        "class",
        "border-info p-1  bg-transparent mt-2 rounded "
      );
      img.onclick = function (e) {
        if (e.target.classList.contains("border-red")) {
          document.getElementById("selected-color").innerHTML = "";
          selectedProduct.selectedColor = "";
          e.target.classList.remove("border-red");

          document.getElementById("stock-status").innerHTML =
            "Select An Attribute";

          document.getElementById("AddToCart").innerHTML = "add to cart";
          document.getElementById("AddToCart").disabled = false;

          document
            .getElementById("AddToCart")
            .setAttribute("data-bs-target", "#exampleModal");

          let altImagesContainer = document.getElementById("alt-images");
          altImagesContainer.innerHTML = "";
        } else {
          try {
            let colorBtnParent = document.getElementById("colorImages");
            let allColorButtons = colorBtnParent.getElementsByTagName("button");
            for (var i = 0; i < allColorButtons.length; i++) {
              allColorButtons[i].classList.remove("selected");
            }

            let colorImagesParent = document.getElementById("colorImages");
            let allColorImages = colorImagesParent.getElementsByTagName("IMG");
            for (var i = 0; i < allColorImages.length; i++) {
              allColorImages[i].classList.remove("border-red");
            }
          } catch (err) {}

          let attrStock = e.target.getAttribute("data-stock");
          selectedProduct.colorImage = e.target.getAttribute("data-image");

          selectedProduct = actionOnStockStatus(
            attrStock,
            selectedProduct,
            allowOutOfStock
          );
          selectedProduct.stock = parseInt(attrStock);

          e.target.classList.add("border-red");
          selectedProduct.selectedColor = colorName;
          document.getElementById("selected-color").innerHTML = colorName;
          console.log("aaaaaaaaaaaaaaaaaaaaaa");
          console.log(altImagesData);
          // GET ALT IMAGES

          let selectedAltImages = altImagesData.find(
            (altImage) => altImage.color == colorName
          ).altImages;

          if (Object.entries(selectedAltImages).length > 0) {
            displayAltimages(colorName, altImagesData);
          } else {
            altImagesData.map((alt) => {
              if (alt.color == colorName) {
                alt.altImages.push(selectedProduct.colorImage);
              }
            });
            displayAltimages(colorName, altImagesData);
          }

          if (selectedProduct.selectedColor) {
            document.getElementById("colorAlert").classList.add("d-none");
          }
        }
      };
      colorImages.appendChild(img);
    }
  });

  return selectedProduct;
};

export const displayAltimages = (colorName, allAltImages) => {
  let selectedAltImages = [];

  try {
    selectedAltImages = allAltImages.find(
      (altImage) => altImage.color == colorName
    ).altImages;
  } catch (err) {}

  let altImagesContainer = document.getElementById("alt-images");
  altImagesContainer.innerHTML = "";

  if (Object.entries(selectedAltImages).length > 0) {
    selectedAltImages.map((altImg) => {
      let imgUrl = prodImagesDir + altImg;
      let altAnchor = document.createElement("a");

      altAnchor.setAttribute("href", imgUrl);
      altAnchor.setAttribute("data-image", imgUrl);
      altAnchor.setAttribute("data-zoom-id", "zoomer");
      altAnchor.setAttribute("class", "mz-thumb");

      let resizedImage = CreateThumnailImage(altImg, imgUrl);
      altAnchor.appendChild(resizedImage);
      altImagesContainer.appendChild(altAnchor);
    });
  } else {
    let mzLens = document.getElementsByClassName("mz-lens")[0];
    mzLens.getElementsByTagName("img")[0].src = "";
  }
  MagicZoom.refresh();
};

var CreateThumnailImage = function (imageName, currentImage) {
  var myCan = document.createElement("canvas");
  let img = new Image();
  img.setAttribute("crossorigin", "anonymous"); // works for me

  img.src = currentImage;
  var nImg = document.createElement("img");
  img.onload = function () {
    myCan.id = imageName;
    var tsize = 64;
    myCan.width = 80;
    myCan.height = 95;

    var cntxt = myCan.getContext("2d");
    cntxt.drawImage(img, 0, 0, myCan.width, myCan.height);
    setTimeout(abc(myCan), 1000);

    function abc(myCan) {
      var dataURL = myCan.toDataURL();

      nImg.src = dataURL;
      nImg.setAttribute("name", imageName);
      nImg.setAttribute("data-url", currentImage);
      nImg.setAttribute("class", "img-fluid mr-1");

      nImg.onclick = () => {
        let altContainer = document.getElementById("alt-images");
        let altChildren = altContainer.getElementsByTagName("img");
        try {
          for (var i = 0; i < altChildren.length; i++) {
            altChildren[i].classList.remove("mz-border");
          }
        } catch (err) {}

        let mzLens = document.getElementsByClassName("mz-lens")[0];
        mzLens.getElementsByTagName("img")[0].src = currentImage;

        nImg.setAttribute("class", "img-fluid mr-1 mz-border");
      };
    }
  };
  return nImg;
};

const displaySizeImageAsButtons = (
  e,
  selectedProduct,
  colorsData,
  allowOutOfStock,
  customIndex,
  colorName,
  colorButtons,
  altImagesData
) => {
  let element;
  let element_label = "button";
  let element_labe2 = "img";

  let wrapper = "colorImages";

  element = document.createElement(element_label);
  element.setAttribute("type", element_label);
  element.setAttribute("value", colorName);
  element.setAttribute("class", element_label);
  element.setAttribute("data-stock", colorsData.colorStock[customIndex]);
  element.setAttribute("data-image", colorsData.colorSmallImage[customIndex]);

  element.style.height = "59px";
  element.style.width = "59px";

  // element.style.border = 'solid 1px rgb(185 185 185)'
  element.style.outline = "none";
  element.innerHTML = colorName;
  element.classList.add("ml-2");

  element.setAttribute(
    "class",
    "border-info p-1  bg-transparent mt-2 rounded "
  );

  //  button.classList.add('h-25')
  element.onclick = function (e) {
    if (e.target.classList.contains("selected")) {
      document.getElementById("selected-color").innerHTML = "";
      selectedProduct.selectedColor = "";
      e.target.classList.remove("selected");
    } else {
      try {
        let colorBtnParent = document.getElementById(wrapper);
        let allColorButtons = colorBtnParent.getElementsByTagName(
          element_label
        );
        for (var i = 0; i < allColorButtons.length; i++) {
          allColorButtons[i].classList.remove("selected");
        }

        let attrStock = e.target.getAttribute("data-stock");
        selectedProduct.colorImage = e.target.getAttribute("data-image");
        selectedProduct = actionOnStockStatus(
          attrStock,
          selectedProduct,
          allowOutOfStock
        );
        selectedProduct.stock = parseInt(attrStock);

        let colorImagesParent = document.getElementById(wrapper);
        let allColorImages = colorImagesParent.getElementsByTagName(
          element_labe2
        );
        for (var i = 0; i < allColorImages.length; i++) {
          allColorImages[i].classList.remove("border-red");
        }
      } catch (err) {}
      e.target.classList.add("selected");
      selectedProduct.selectedColor = e.target.value;
      document.getElementById("selected-color").innerHTML = e.target.value;
    }

    // GET ALT IMAGES
    if (altImagesData && altImagesData.length > 0)
      displayAltimages(colorName, altImagesData);

    if (selectedProduct.selectedColor) {
      document.getElementById("colorAlert").classList.add("d-none");
    }
  };
  colorButtons.appendChild(element);
  return selectedProduct;
};

export const CartRelated = (product) => {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(true);
  let property = "";
  useEffect(() => {
    API.ApiProducts(
      "",
      "",
      "BRAND",
      product.BRAND,
      setProds,
      setLoading,
      "",
      ""
    );
  }, [product]);

  let cartRelated = [];
  cartRelated = prods.filter(
    (prod) => prod.BRAND == product.BRAND && prod.STYLE_ID != product.STYLE_ID
  );
  if (!cartRelated || cartRelated.length < 1) cartRelated = [];
  if (cartRelated.length > 4) {
    cartRelated.length = 4;
  }
  return cartRelated;
};

export const setRecentlyViewed = (product) => {
  let recentlyViewedTemp = [];
  let recentlyViewed = [];
  recentlyViewedTemp = reactLocalStorage.getObject("recentlyViewed");
  //reactLocalStorage.clear("recentlyViewed");
  if (recentlyViewedTemp && recentlyViewedTemp.length > 0) {
  } else {
    recentlyViewedTemp = [];
  }
  let matched = false;
  recentlyViewedTemp.map((item) => {
    if (JSON.stringify(item) == JSON.stringify(product)) {
      matched = true;
    } else {
    }
  });

  if (matched == true) {
  } else {
    recentlyViewedTemp.unshift(product);
  }

  recentlyViewedTemp.map((prod, index) => {
    if (index < 6) {
      recentlyViewed.push(prod);
    }
  });

  reactLocalStorage.setObject("recentlyViewed", [...recentlyViewed]);
};
