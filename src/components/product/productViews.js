import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import * as pC from "../product/productController";
//import { productSizesStyle } from "../../settings";
//import { productColorsStyle } from "../../settings";
import { allowOutOfStock } from "../../settings";
import { prodImagesDir } from "../../settings";
import { defaultImage } from "../../settings";
import { comingSoonS } from "../../settings";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Alert } from "react-bootstrap";
import MagicZoom from "../../js/magiczoomplusReactJs";
import { Redirect } from "react-router-dom";

let productSizesStyle = "select";
let productColorsStyle = "select";

let selectedProduct = {
  style_id: 0,
  name: "",
  brand: "",
  image: "",
  colorImage: "",
  cartImage: defaultImage,
  regularPrice: 0,
  salesPrice: 0,
  quantity: 0,
  total: 0,
  selectedSize: "",
  selectedColor: "",
  stock: 0,
  stockMessage: "Out of Stock",
};
export const BreadCrumbDisplay = (breadcrumbs) => {
  return (
    <>
      <section id="BreadCrumbs" className="col-12 pt-3">
        <nav aria-label="breadcrumb" className="bg-transparent p-0">
          <ol className="breadcrumb bg-transparent p-0">
            {breadcrumbs.map((item) => {
              return item;
            })}
          </ol>
        </nav>
      </section>
    </>
  );
};

export const displayProductImage = (imageInfo) => {
  return (
    <>
      <section
        id="productmainimage"
        onload={scrolltop()}
        className="col-lg-7 col-md-6 col-12"
      >
        <Link
          id="zoomer"
          to={imageInfo.image}
          className="MagicZoom"
          data-options="rightClick: true; expand: off;"
        >
          <img
            id="zoom-image"
            itemprop="image"
            className="w-100"
            src={imageInfo.image}
            alt=" Mask"
          />
        </Link>

        {/*
          <img
            src={imageInfo.image}
            className='img-fluid w-100'
            alt={imageInfo.altText}
          />
        */}

        <article
          id="alt-images"
          className="altimages d-flex justify-content-center my-2"
        ></article>
      </section>
    </>
  );
};

export const displayProductInfo = (props) => {
  return (
    <>
      <section id="productinfo" className="col-lg-5 col-md-6 col-12">
        <div className="infoinner">
          {productMainInfo(props)}

          {productPrice(props)}
          {productQuantity(props)}

          {props.GENER == "variable" ? productAttributes(props) : ""}

          {ProductAddtoButtons(props)}
          {AddToCartPopUp(props)}
          {productShareButtons(props)}
        </div>
      </section>
    </>
  );
};

const productMainInfo = (product) => {
  let stockStatus = checkStockAvailability(product);
  return (
    <>
      <article className="productdesc">
        <h1 className="pname">{product.NAME}</h1>
        <p className="pcode">
          <span>product code:</span>
          <span>{product.UPC}</span>
        </p>
        <p className="pbrand">
          <span>brand:</span>
          <span>{product.BRAND}</span>
        </p>
        <p className="pstatus">
          <span>availability:</span>
          {product.OVERALLQOH > 0 ? (
            <i i className="fas fa-check" />
          ) : (
            <i i className="fas fa-times" />
          )}

          <span id="stock-status">{stockStatus.availability}</span>
        </p>
      </article>
    </>
  );
};

const productPrice = (product) => {
  let prodPrice = pC.productPricing(product);

  return (
    <>
      <article className="pricing">
        {prodPrice.SALES_PRICE > 0 ? (
          <>
            <p id="rPrice" className="">
              <del>${prodPrice.REGULAR_PRICE}</del>
            </p>
            <p id="sPrice" className="color-red">
              ${prodPrice.SALES_PRICE}
            </p>
          </>
        ) : (
          <>
            <p id="rPrice" className="">
              ${prodPrice.REGULAR_PRICE}
            </p>
            <p id="sPrice" className="color-red d-none">
              ${prodPrice.SALES_PRICE}
            </p>
          </>
        )}
      </article>
    </>
  );
};

const productQuantity = (props) => {
  return (
    <>
      <article className="quantity">
        <label for="quantity">qty</label>
        <input
          type="number"
          id="qty"
          name="qty"
          min="1"
          defaultValue="1"
          onChange={(e) => {
            selectedProduct = pC.updateQuantity(e, selectedProduct);
          }}
        />
      </article>
    </>
  );
};

const productAttributes = (props) => {
  return (
    <>
      {GetSizes(props)}
      {GetColors(props)}
    </>
  );
  // CAN ADD MORE ATTRIBUTES HERE
};

const GetSizes = (product) => {
  const [prodSizes, setProdSizes] = useState([]);
  const [sizeLoading, setSizeLoading] = useState(true);

  const [colorsRec, setColorsRec] = useState({});

  if (product.STYLE_ID && product.STYLE_ID == 4285) {
    productSizesStyle = "select";
    productColorsStyle = "images";
  } else if (product.STYLE_ID && product.STYLE_ID == 11) {
    productSizesStyle = "buttons";
    productColorsStyle = "colors";
  } else if (product.STYLE_ID && product.STYLE_ID == 22) {
    productSizesStyle = "buttons";
    productColorsStyle = "images";
  }
  useEffect(() => {
    let ID = product.STYLE_ID;
    let webStyle = "";
    let siz = "";
    let attr1 = "";
    let attr2 = "";

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
    setSizeLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProdSizes(data);
        setSizeLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setSizeLoading(false);
      });

    // pC.GetProductSizes(product, setProdSizes).then((response) => {
    //  console.log("xxxxxxxxxxxxx");
    //  console.log(response);
    //  setColorsRec(response);
    // reactLocalStorage.setObject("storedSizes", response);
    // });
  }, []);

  let productSizes = prodSizes;

  console.log("yyyyyyyyyyyyyyyy");
  console.log(colorsRec);
  if (Object.entries(productSizes).length > 0) {
  } else {
    productSizes = [];
  }
  console.log("aproduct");
  console.log(product);
  product.SIZELIST = ["S"];

  // productSizes = [];
  //product.SIZELIST = [];

  return (
    <>
      {product.SIZELIST != null && sizeLoading ? (
        <>
          Size :
          <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </>
      ) : (
        ""
      )}

      {Object.entries(productSizes).length > 0 ? (
        <article className="size">
          <div id="sizeButtons" className="sizebox">
            <label for="size" className="fw-bold">
              size : <span id="selected-size" className="selected-size"></span>
            </label>
            {/******START DISPLAY SIZE AS SELECT DROP DOWN******/}
            {productSizesStyle == "select" ? (
              <select
                name="choosesize"
                id="size"
                onChange={(e) => {
                  selectedProduct = pC.GetSelectedColors(
                    "select",
                    e,
                    product,
                    selectedProduct,
                    productColorsStyle,
                    allowOutOfStock,
                    colorsRec,
                    setColorsRec
                  );
                }}
              >
                <option value="Select a Size">Select a Size</option>
                {productSizes.map((sizes) => {
                  return (
                    <option value={sizes.ORIGSIZ}>
                      {sizes.ORIGSIZ}
                      {" - "}
                      {"$" + sizes.PRICE}
                      {" - "}
                      {sizes.QOH > 0 ? "In Stock" : "Out of Stock"}
                    </option>
                  );
                })}
              </select>
            ) : (
              ""
            )}
            {/******END DISPLAY SIZE AS SELECT DROP DOWN******/}

            {/******START DISPLAY SIZE AS BUTTONS******/}

            {productSizesStyle == "buttons"
              ? productSizes.map((size) => {
                  return (
                    <>
                      <button
                        className="border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20"
                        value={size}
                        type="button"
                        onClick={(e) => {
                          selectedProduct = pC.GetSelectedColors(
                            "buttons",
                            e,
                            product,
                            selectedProduct,
                            productColorsStyle,
                            allowOutOfStock
                          );
                        }}
                      >
                        {size}
                      </button>
                    </>
                  );
                })
              : ""}

            {/******END DISPLAY SIZE AS BUTTONS******/}
          </div>
        </article>
      ) : (
        ""
      )}
    </>
  );
};

const GetColors = (product) => {
  const [prodColors, setProdColors] = useState([]);
  const [colorLoading, setColorLoading] = useState(true);
  let colorsData = {
    color: [],
    colorCode: [],
    colorSmallImage: [],
    colorLargeImage: [],
    colorStock: [],
    altImages: [],
  };

  let productColors = [];
  productColorsStyle = "images"; //select, colors, buttons, images

  useEffect(() => {
    let url =
      "http://localhost:8500/celerant360/server/CF/API.cfc?method=getProductColors&ID=" +
      product.STYLE_ID +
      "&webStyle=''" +
      "&siz=''" +
      "&attr1=''" +
      "&attr2=''";
    setColorLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProdColors(data);
        setColorLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(function () {
        setColorLoading(false);
      });
    if (Object.entries(prodColors).length > 0) {
      productColors = prodColors;
    } else {
      productColors = [];
    }
  }, []);

  if (
    productColorsStyle == "colors" ||
    productColorsStyle == "buttons" ||
    productColorsStyle == "images" ||
    productColorsStyle == "select"
  ) {
    for (let x = 0; x < prodColors.length; x++) {
      colorsData.color.push(prodColors[x].ORIGATTR1);
      colorsData.colorCode.push(prodColors[x].HEX);
      colorsData.colorSmallImage.push(prodColors[x].COLORSMALLIMAGE);
      colorsData.colorLargeImage.push(prodColors[x].COLORLARGEIMAGE);
      colorsData.colorStock.push(prodColors[x].QOH);
      colorsData.altImages.push([]);
    }
  }

  let colorNameIndex = -1;
  let customIndex = -1;
  let altImagesData = [];

  console.log("paaaaaaaaaaaaaa");
  console.log(colorsData);
  let styles = "background-color: red !important";
  return (
    <>
      <article className="color">
        <div className="colorbox">
          <label for="color" className="fw-bold">
            Color :<span id="selected-color" className="selected-color"></span>
          </label>
          <br />

          {/******START DISPLAY Colors AS SELECT DROP DOWN******/}
          {productColorsStyle == "select" ? (
            <select
              name="choosecolor"
              id="color"
              className="d-block border-1 border-secondary rounded"
            >
              <option value="Select a Color">Select a Color</option>
              {colorsData.color.map((colorValue) => {
                let colorSelect = document.getElementById("color");
                try {
                  colorSelect.innerHTML = "";
                } catch (err) {}
                let myOption2 = document.createElement("option");

                myOption2.text = "Select a Color";
                myOption2.value = "Select a Color";
                try {
                  colorSelect.appendChild(myOption2);
                } catch (err) {}
                let customIndex = -1;
                let altImagesData = [];

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
                myOption.setAttribute(
                  "data-stock",
                  colorsData.colorStock[customIndex]
                );
                myOption.setAttribute(
                  "data-image",
                  colorsData.colorSmallImage[customIndex]
                );
                try {
                  colorSelect.appendChild(myOption);
                  colorSelect.onchange = function (e) {
                    selectedProduct.selectedColor = e.target.value;
                    let attrStock = this.options[
                      this.selectedIndex
                    ].getAttribute("data-stock");
                    selectedProduct.colorImage = this.options[
                      this.selectedIndex
                    ].getAttribute("data-image");

                    selectedProduct = pC.actionOnStockStatus(
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
                      pC.displayAltimages(e.target.value, altImagesData);
                    }

                    if (selectedProduct.selectedColor) {
                      document
                        .getElementById("colorAlert")
                        .classList.add("d-none");
                    }
                  };
                } catch (err) {}
              })}
            </select>
          ) : (
            ""
          )}
          {/******END DISPLAY Colors AS SELECT DROP DOWN******/}

          {/******START DISPLAY Colors AS BUTTONS******/}
          {productColorsStyle == "buttons" ? (
            <div id="colorButtons">
              {colorsData.color.map((colorValue) => {
                let colorButtons = document.getElementById("colorButtons");
                try {
                  colorButtons.innerHTML = "";
                } catch (err) {}
                let customIndex = -1;
                let altImagesData = [];

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
                button.setAttribute(
                  "data-stock",
                  colorsData.colorStock[customIndex]
                );
                button.setAttribute(
                  "data-image",
                  colorsData.colorSmallImage[customIndex]
                );

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
                      let colorBtnParent = document.getElementById(
                        "colorButtons"
                      );
                      let allColorButtons = colorBtnParent.getElementsByTagName(
                        "button"
                      );
                      for (var i = 0; i < allColorButtons.length; i++) {
                        allColorButtons[i].classList.remove("selected");
                      }
                    } catch (err) {}

                    let attrStock = e.target.getAttribute("data-stock");
                    selectedProduct.colorImage = e.target.getAttribute(
                      "data-image"
                    );

                    selectedProduct = pC.actionOnStockStatus(
                      attrStock,
                      selectedProduct,
                      allowOutOfStock
                    );
                    selectedProduct.stock = parseInt(attrStock);

                    e.target.classList.add("selected");
                    selectedProduct.selectedColor = e.target.value;
                    document.getElementById("selected-color").innerHTML =
                      e.target.value;
                  }

                  // GET ALT IMAGES
                  if (altImagesData && altImagesData.length > 0) {
                    pC.displayAltimages(colorValue, altImagesData);
                  }

                  if (selectedProduct.selectedColor) {
                    document
                      .getElementById("colorAlert")
                      .classList.add("d-none");
                  }
                };
                try {
                  colorButtons.appendChild(button);
                } catch (err) {}
              })}
            </div>
          ) : (
            ""
          )}
          {/******END DISPLAY Colors AS BUTTONS******/}

          {/******START DISPLAY Colors AS Colors******/}
          {productColorsStyle == "colors" ? (
            <div id="colorButtons">
              {colorsData.colorCode.map((colorValue) => {
                let fontColor = "black";
                if (colorValue == null) {
                  colorValue = "red";
                  fontColor = "red";
                } else {
                  fontColor = colorValue;
                }
                customIndex++;
                colorNameIndex++;
                let colorName = colorsData.color[colorNameIndex];

                let colorButtons = document.getElementById("colorButtons");
                try {
                  colorButtons.innerHTML = "";
                } catch (err) {}

                selectedProduct.colorImage =
                  prodImagesDir + colorsData.colorSmallImage[customIndex];
                let btnClass = "";
                if (colorsData.colorStock[customIndex] <= 0) {
                  btnClass =
                    "border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20";
                } else {
                  btnClass =
                    "border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20 disabled";
                }
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
                button.setAttribute(
                  "data-stock",
                  colorsData.colorStock[customIndex]
                );
                button.setAttribute(
                  "data-image",
                  colorsData.colorSmallImage[customIndex]
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
                      let colorBtnParent = document.getElementById(
                        "colorButtons"
                      );
                      let allColorButtons = colorBtnParent.getElementsByTagName(
                        "button"
                      );
                      for (var i = 0; i < allColorButtons.length; i++) {
                        allColorButtons[i].classList.remove("selected");
                      }
                    } catch (err) {}

                    let attrStock = e.target.getAttribute("data-stock");
                    selectedProduct.colorImage = e.target.getAttribute(
                      "data-image"
                    );

                    selectedProduct = pC.actionOnStockStatus(
                      attrStock,
                      selectedProduct,
                      allowOutOfStock
                    );
                    selectedProduct.stock = parseInt(attrStock);

                    e.target.classList.add("selected");
                    selectedProduct.selectedColor = e.target.value;
                    document.getElementById("selected-color").innerHTML =
                      e.target.value;
                  }

                  // GET ALT IMAGES
                  if (altImagesData && altImagesData.length > 0) {
                    pC.displayAltimages(colorName, altImagesData);
                  }

                  if (selectedProduct.selectedColor) {
                    document
                      .getElementById("colorAlert")
                      .classList.add("d-none");
                  }
                };
                try {
                  colorButtons.appendChild(button);
                } catch (err) {}
                return "";
              })}
            </div>
          ) : (
            ""
          )}
          {/******END DISPLAY Colors AS Colors******/}

          {/******START DISPLAY Colors AS IMAGES******/}
          {productColorsStyle == "images" ? (
            <div id="colorImages">
              {colorsData.colorSmallImage.map((colorSmallImage) => {
                let colorButtons = document.getElementById("colorImages");
                let colorImages = document.getElementById("colorImages");
                try {
                  colorImages.innerHTML = "";
                } catch (err) {}
                try {
                  colorButtons.innerHTML = "";
                } catch (err) {}

                let customIndex = -1;
                let altImages = [];
                let altImagesData = [];

                customIndex++;

                let colorName = colorsData.color[customIndex];
                altImagesData.push({
                  color: colorName,
                  altImages: colorsData.altImages[customIndex],
                });
                if (!colorSmallImage) {
                  //DISPLAY SIZE AS BUTTON IF COLOR IMAGE NOT AVAIABLE
                  {
                    colorsData.color.map((colorValue) => {
                      let colorButtons = document.getElementById("colorImages");
                      colorButtons.innerHTML = "";
                      let customIndex = -1;
                      let altImagesData = [];

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
                      button.setAttribute(
                        "data-stock",
                        colorsData.colorStock[customIndex]
                      );
                      button.setAttribute(
                        "data-image",
                        colorsData.colorSmallImage[customIndex]
                      );

                      if (colorsData.colorStock[customIndex] <= 0) {
                        button.classList.add("disabled");
                        button.innerHTML = "<span></span>" + colorValue;
                      } else {
                        button.innerHTML = colorValue;
                      }

                      button.onclick = function (e) {
                        if (e.target.classList.contains("selected")) {
                          document.getElementById("selected-color").innerHTML =
                            "";
                          selectedProduct.selectedColor = "";
                          e.target.classList.remove("selected");
                        } else {
                          try {
                            let colorBtnParent = document.getElementById(
                              "colorButtons"
                            );
                            let allColorButtons = colorBtnParent.getElementsByTagName(
                              "button"
                            );
                            for (var i = 0; i < allColorButtons.length; i++) {
                              allColorButtons[i].classList.remove("selected");
                            }
                          } catch (err) {}

                          let attrStock = e.target.getAttribute("data-stock");
                          selectedProduct.colorImage = e.target.getAttribute(
                            "data-image"
                          );

                          selectedProduct = pC.actionOnStockStatus(
                            attrStock,
                            selectedProduct,
                            allowOutOfStock
                          );
                          selectedProduct.stock = parseInt(attrStock);

                          e.target.classList.add("selected");
                          selectedProduct.selectedColor = e.target.value;
                          document.getElementById("selected-color").innerHTML =
                            e.target.value;
                        }

                        // GET ALT IMAGES
                        if (altImagesData && altImagesData.length > 0) {
                          pC.displayAltimages(colorValue, altImagesData);
                        }

                        if (selectedProduct.selectedColor) {
                          document
                            .getElementById("colorAlert")
                            .classList.add("d-none");
                        }
                      };
                      colorButtons.appendChild(button);
                    });
                  }
                } else {
                  let img = document.createElement("IMG");
                  img.src = prodImagesDir + colorSmallImage;

                  img.setAttribute(
                    "data-stock",
                    colorsData.colorStock[customIndex]
                  );
                  img.setAttribute(
                    "data-image",
                    colorsData.colorSmallImage[customIndex]
                  );

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

                      document.getElementById("AddToCart").innerHTML =
                        "add to cart";
                      document.getElementById("AddToCart").disabled = false;

                      document
                        .getElementById("AddToCart")
                        .setAttribute("data-bs-target", "#exampleModal");

                      let altImagesContainer = document.getElementById(
                        "alt-images"
                      );
                      altImagesContainer.innerHTML = "";
                    } else {
                      try {
                        let colorBtnParent = document.getElementById(
                          "colorImages"
                        );
                        let allColorButtons = colorBtnParent.getElementsByTagName(
                          "button"
                        );
                        for (var i = 0; i < allColorButtons.length; i++) {
                          allColorButtons[i].classList.remove("selected");
                        }

                        let colorImagesParent = document.getElementById(
                          "colorImages"
                        );
                        let allColorImages = colorImagesParent.getElementsByTagName(
                          "IMG"
                        );
                        for (var i = 0; i < allColorImages.length; i++) {
                          allColorImages[i].classList.remove("border-red");
                        }
                      } catch (err) {}

                      let attrStock = e.target.getAttribute("data-stock");
                      selectedProduct.colorImage = e.target.getAttribute(
                        "data-image"
                      );

                      selectedProduct = pC.actionOnStockStatus(
                        attrStock,
                        selectedProduct,
                        allowOutOfStock
                      );
                      selectedProduct.stock = parseInt(attrStock);

                      e.target.classList.add("border-red");
                      selectedProduct.selectedColor = colorName;
                      document.getElementById(
                        "selected-color"
                      ).innerHTML = colorName;
                      console.log("aaaaaaaaaaaaaaaaaaaaaa");
                      console.log(altImagesData);
                      // GET ALT IMAGES

                      let selectedAltImages = altImagesData.find(
                        (altImage) => altImage.color == colorName
                      ).altImages;

                      if (Object.entries(selectedAltImages).length > 0) {
                        pC.displayAltimages(colorName, altImagesData);
                      } else {
                        altImagesData.map((alt) => {
                          if (alt.color == colorName) {
                            alt.altImages.push(selectedProduct.colorImage);
                          }
                        });
                        pC.displayAltimages(colorName, altImagesData);
                      }

                      if (selectedProduct.selectedColor) {
                        document
                          .getElementById("colorAlert")
                          .classList.add("d-none");
                      }
                    }
                  };
                  try {
                    colorImages.appendChild(img);
                  } catch (err) {}
                }
              })}
            </div>
          ) : (
            ""
          )}
          {/******END DISPLAY Colors AS BUTTONS******/}
        </div>
      </article>
    </>
  );
};

function colorClick(e, altImagesData, colorName) {
  console.log("alttttt");
  console.log(altImagesData);

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

    selectedProduct = pC.actionOnStockStatus(
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
    pC.displayAltimages(colorName, altImagesData);
  }

  if (selectedProduct.selectedColor) {
    document.getElementById("colorAlert").classList.add("d-none");
  }
}

const ProductAddtoButtons = (product) => {
  const [{ basket }, dispatch] = useStateValue();
  let history = useHistory();
  console.log("BUTONSSSSSSSSS");
  console.log(product);

  if (selectedProduct && selectedProduct.STYLE_ID > 0) {
    if (product.GENER == "simple") {
    } else {
      product.variants.map((vProduct) => {
        vProduct.color.map((clr) => {
          if (clr.name == selectedProduct.selectedColor) {
            selectedProduct.stock = parseInt(clr.stock);
            if (selectedProduct.stock > 0) {
              selectedProduct.stockMessage = "In Stock";
            } else {
              selectedProduct.stockMessage = "Out of Stock";
            }
          }
        });
      });
    }
  } else {
    if (product.STOCK && product.STOCK > 0) {
      selectedProduct.stock = parseInt(product.STOCK);
      selectedProduct.stockMessage = "In Stock";
    } else {
      selectedProduct.stock = 0;
      selectedProduct.stockMessage = "Out of Stock";
    }
  }

  return (
    <>
      <article className="addtobuttons">
        <div id="sizeAlert" className="alert alert-danger d-none" role="alert">
          Select an Avaiable Size
        </div>
        <div id="colorAlert" className="alert alert-danger d-none" role="alert">
          Select an Avaiable Color
        </div>
        {product.STOCK > 0 ? (
          <>
            <button
              id="AddToCart"
              className="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch, history);
              }}
            >
              add to cart
            </button>
            <button className="AddToWishlist">+ add to wishlist</button>
          </>
        ) : allowOutOfStock == "yes" ? (
          <>
            <button
              id="AddToCart"
              className="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch, history);
              }}
            >
              add to cart
            </button>
            <button className="AddToWishlist">+ add to wishlist</button>
          </>
        ) : (
          <>
            <button
              id="AddToCart"
              class="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch, history);
              }}
            >
              Out of Stock
            </button>
          </>
        )}
      </article>
    </>
  );
};
let newsBasket = [];
export const AddToCart = (e, product, basket, dispatch, history) => {
  e.preventDefault();
  console.log("5555555555555555555555555555555555555555555555555555555555555");
  console.log(product);

  let cart = [];
  let itemIndex = -1;
  if (product.GENER == "simple") {
    selectedProduct.colorImage = "";
  }
  selectedProduct.quantity = parseInt(document.getElementById("qty").value, 10);

  if (selectedProduct.stock && selectedProduct.stock > 0) {
    selectedProduct.stockMessage = "In Stock";
  } else {
    selectedProduct.stockMessage = "Out of Stock";
  }

  if (
    selectedProduct.quantity &&
    selectedProduct.quantity != "" &&
    parseInt(selectedProduct.quantity, 10)
  ) {
  } else {
    alert("Please select a quantity in Numbers");
    return;
  }
  console.log("00000000000000000");
  console.log(product);

  if (allowOutOfStock == "yes" || selectedProduct.stock > 0) {
    selectedProduct.image = pC.getProductSmallImage(product);

    selectedProduct.style_id = product.STYLE_ID;
    selectedProduct.name = product.NAME;

    // selectedProduct.stock = product.stock;
    selectedProduct.brand = product.BRAND;
    selectedProduct.regularPrice = product.REGULAR_PRICE;
    selectedProduct.salesPrice = product.SALES_PRICE;

    if (selectedProduct.colorImage && selectedProduct.colorImage != "") {
      if (selectedProduct.colorImage.includes(prodImagesDir)) {
        selectedProduct.colorImage = selectedProduct.colorImage;
      } else {
        selectedProduct.colorImage = prodImagesDir + selectedProduct.colorImage;
      }

      selectedProduct.cartImage = selectedProduct.colorImage;
      selectedProduct.image = selectedProduct.colorImage;
    } else if (selectedProduct.image && selectedProduct.image != "") {
      selectedProduct.image = selectedProduct.image;
      selectedProduct.cartImage = selectedProduct.image;
    } else {
      selectedProduct.image = selectedProduct.image;
      selectedProduct.cartImage = selectedProduct.image;
    }

    let price = 0;
    if (selectedProduct.salesPrice && selectedProduct.salesPrice > 0) {
      price = selectedProduct.salesPrice;
    } else {
      price = selectedProduct.regularPrice;
    }

    selectedProduct.total = price * selectedProduct.quantity;

    if (product.GENER == "simple") {
      // START ADD SIMPLE PRODUCT IN THE CART

      let sessions = [];
      let cart = [];
      sessions = reactLocalStorage.getObject("cartSessions");
      cart = reactLocalStorage.getObject("cartSessions");

      let itemMatched = false;
      if (sessions.length > 0) {
        let tempCart = [];
        tempCart = [...sessions];
        let tempSeletedProduct = {};
        tempSeletedProduct = { ...selectedProduct };

        tempCart.map((item) => {
          item.quantity = 0;
          item.total = 0;

          tempSeletedProduct.quantity = 0;
          tempSeletedProduct.total = 0;

          if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
            itemMatched = true;
            itemIndex = tempCart.indexOf(item);
          }
        });

        if (itemMatched == true) {
          let qty = 0;
          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }
          qty = cart[itemIndex].quantity;
          cart[itemIndex].quantity = qty + 1;
          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        } else {
          cart.push({ ...selectedProduct });
          itemIndex = cart.length - 1;

          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }

          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        }
      } else {
        cart = [];
        cart.push({ ...selectedProduct });
        itemIndex = cart.length - 1;

        let itemPrice = 0;
        if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
          itemPrice = cart[itemIndex].salesPrice;
        } else {
          itemPrice = cart[itemIndex].regularPrice;
        }

        cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
        reactLocalStorage.setObject("cartSessions", [...cart]);
        dispatch({
          type: "ADD_TO_BASKET",
          item: [...cart],
        });
      }
      let content = updateCartPopUp(cart, itemIndex);
      document.getElementById("currentItem").innerHTML = content;
      openModal();

      var vcrt = document.getElementById("vCart");
      vcrt.addEventListener(
        "click",
        function () {
          closeModal();

          history.replace("/cart");
        },
        false
      );

      // END ADD SIMPLE PRODUCT IN THE CART
    } else {
      if (
        (Object.entries(product.SIZELIST).length > 0 &&
          selectedProduct.selectedSize == "") ||
        selectedProduct.selectedSize == "Select a Size"
      ) {
        document.getElementById("sizeAlert").classList.remove("d-none");
      } else {
        if (
          selectedProduct.selectedColor == "" ||
          selectedProduct.selectedColor == "Select a Color"
        ) {
          document.getElementById("colorAlert").classList.remove("d-none");
        } else {
          // START ADD VARIABLE PRODUCT IN THE CART

          let sessions = [];
          let cart = [];
          sessions = reactLocalStorage.getObject("cartSessions");
          cart = reactLocalStorage.getObject("cartSessions");

          let itemMatched = false;
          if (sessions.length > 0) {
            let tempCart = [];
            tempCart = [...sessions];
            let tempSeletedProduct = {};
            tempSeletedProduct = { ...selectedProduct };

            tempCart.map((item) => {
              item.quantity = 0;
              item.total = 0;

              tempSeletedProduct.quantity = 0;
              tempSeletedProduct.total = 0;

              if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
                itemMatched = true;
                itemIndex = tempCart.indexOf(item);
              }
            });

            if (itemMatched == true) {
              let qty = 0;
              let itemPrice = 0;
              if (
                cart[itemIndex].salesPrice &&
                cart[itemIndex].salesPrice > 0
              ) {
                itemPrice = cart[itemIndex].salesPrice;
              } else {
                itemPrice = cart[itemIndex].regularPrice;
              }
              qty = cart[itemIndex].quantity;
              cart[itemIndex].quantity = qty + 1;
              cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
              reactLocalStorage.setObject("cartSessions", [...cart]);
              dispatch({
                type: "ADD_TO_BASKET",
                item: [...cart],
              });
            } else {
              cart.push({ ...selectedProduct });
              itemIndex = cart.length - 1;

              let itemPrice = 0;
              if (
                cart[itemIndex].salesPrice &&
                cart[itemIndex].salesPrice > 0
              ) {
                itemPrice = cart[itemIndex].salesPrice;
              } else {
                itemPrice = cart[itemIndex].regularPrice;
              }

              cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
              reactLocalStorage.setObject("cartSessions", [...cart]);
              dispatch({
                type: "ADD_TO_BASKET",
                item: [...cart],
              });
            }
          } else {
            cart = [];
            cart.push({ ...selectedProduct });
            itemIndex = cart.length - 1;

            let itemPrice = 0;
            if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
              itemPrice = cart[itemIndex].salesPrice;
            } else {
              itemPrice = cart[itemIndex].regularPrice;
            }

            cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
            reactLocalStorage.setObject("cartSessions", [...cart]);
            dispatch({
              type: "ADD_TO_BASKET",
              item: [...cart],
            });
          }
          let content = updateCartPopUp(cart, itemIndex);
          document.getElementById("currentItem").innerHTML = content;
          openModal();

          var vcrt = document.getElementById("vCart");
          vcrt.addEventListener(
            "click",
            function () {
              closeModal();

              history.replace("/cart");
            },
            false
          );
          document.getElementById("basket-total-top").innerHTML =
            "(" + cart.length + ")";
          // END ADD VARIABLE PRODUCT IN THE CART
        }
      }
    }
    // openModal();
  }
};

const productShareButtons = (props) => {
  return (
    <>
      <article className="share">
        <p>share</p>
        <p>
          <Link to="" title="">
            <i className="fab fa-facebook-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-twitter-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-pinterest-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fas fa-envelope-square"></i>
          </Link>
        </p>
      </article>
    </>
  );
};

export const displayProductNewsLetters = (props) => {
  return (
    <>
      <section id="newsletters" className="col-lg-7 col-md-6 col-12">
        <aside className="px-4 py-5 text-left border">
          <p className="d-block w-100 ">Receive instant lower price quote</p>
          <form
            id="lowerpricequote"
            className="d-flex justify-content-between align-content-center text-capitalize"
          >
            <label>email:</label>
            <input className="w-50 text-dark" />
            <button className="bg-dark text-light text-uppercase text-center border-0 py-1 px-3">
              get lower price
            </button>
          </form>
        </aside>
        <aside className="px-4 py-5 text-left border">
          <p>Sign up for price alerts</p>
          <form
            id="pricealerts"
            className="d-flex justify-content-between align-content-center text-capitalize"
          >
            <label>email:</label>
            <input className="w-50 text-dark" />
            <button className="bg-dark text-light text-uppercase text-center border-0 py-1 px-3">
              sign me up
            </button>
          </form>
        </aside>
      </section>
    </>
  );
};

export const displayProductDetails = (props) => {
  return (
    <>
      <section id="descandreview" class=" col-12 mt-5 mb-3 module">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="text-uppercase accordion-button"
                type="button"
                onClick={() => {
                  collapseOne();
                }}
              >
                Description
              </button>
            </h2>
            <div id="collapseOne" class="" style={{ display: "block" }}>
              <div class="accordion-body">{props.product.DESCRIPTION}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="text-uppercase accordion-button collapsed"
                type="button"
                onClick={() => {
                  collapseTwo();
                }}
              >
                review
              </button>
            </h2>
            <div id="collapseTwo" class="" style={{ display: "none" }}>
              <div class="accordion-body">
                Reviews will go here. Coming Soon....
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayAdditionalProducts = (
  products,
  basket,
  dispatch,
  history
) => {
  return (
    <>
      <section id="productslider" class="mb-4 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase headings-animation">
              <p>Related Products</p>
            </div>

            <div class="product-slider">
              <div class="product-slider__slider_product">
                {products.map((prod) => {
                  prod.STYLE_ID = prod.id;
                  prod.URL = prod.product_url;

                  prod.SMALLIMAGE = prod.image;

                  prod.NAME = prod.name;
                  prod.BRAND = prod.brand;
                  prod.REGULAR_PRICE = prod.price;
                  prod.SALES_PRICE = 0;
                  prod.GENER = "simple";

                  return (
                    <>
                      <div class="product-slider__item">
                        <div class="productListing module text-center p-1 ">
                          <Link
                            to={
                              "/magiczoomfixer/" +
                              prod.STYLE_ID +
                              "/" +
                              prod.URL
                            }
                            class="product text-decoration-none text-left"
                          >
                            <span class="image text-center mb-2 d-block">
                              <img
                                id={"img" + prod.STYLE_ID}
                                class="item"
                                src={prod.SMALLIMAGE}
                                alt={prod.NAME}
                              />
                            </span>
                            <span class="brand text-capitalize  text-dark d-block mb-1">
                              {prod.BRAND}
                            </span>
                            <span class="name text-dark d-block mb-1">
                              {prod.NAME}
                            </span>
                            <span class="pricing">
                              <strong class="listPrice  text-dark d-block mb-1">
                                $
                                {prod.SALES_PRICE
                                  ? prod.SALES_PRICE
                                  : prod.REGULAR_PRICE}
                              </strong>
                            </span>
                            {/*
                              <div class="add-to-cart-button">
                                {prod.gener == "simple" ? (
                                  <button
                                    onClick={(e) => {
                                      simpleAddToCart(
                                        e,
                                        prod,
                                        basket,
                                        dispatch,
                                        history
                                      );
                                    }}
                                    class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                  >
                                    Add To Cart
                                  </button>
                                ) : (
                                  <a
                                    href={
                                      "/product/" +
                                      prod.style_id +
                                      "/" +
                                      prod.url
                                    }
                                    class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                  >
                                    View Options
                                  </a>
                                )}
                              </div>
                                  */}
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const checkStockAvailability = (product) => {
  let stockInfo = {};
  if (product.STOCK > 0) {
    stockInfo.stock = product.STOCK;
    stockInfo.availability = "In Stock";
  } else {
    stockInfo.stock = 0;
    stockInfo.availability = "Out of Stock";
  }

  return stockInfo;
};

function openModal() {
  var element = document.getElementById("exampleModal");
  element.classList.add("show");
  element.classList.add("d-block");
  element.style.overflowX = "hidden";
  element.style.overflowY = "auto";
  var tag = document.createElement("div");
  tag.id = "overlay";
  tag.classList.add("modal-backdrop");
  tag.classList.add("show");
  tag.classList.add("fade");
  document.body.appendChild(tag);
}

function closeModal() {
  document.getElementById("exampleModal").classList.remove("show");
  document.getElementById("exampleModal").classList.remove("d-block");
  document.getElementById("overlay").classList.remove("show");
  document.getElementById("overlay").classList.remove("fade");
  var myobj = document.getElementById("overlay");
  myobj.remove();
}

const AddToCartPopUp = (product) => {
  let history = useHistory();

  let cart = [];

  let RecentCartProd = {};
  cart = reactLocalStorage.getObject("cartSessions");
  if (cart.length > 0) {
    RecentCartProd = cart[0];
  } else {
    cart = [];
  }
  let prodCount = 0;
  let rprods = "";
  return (
    <>
      <div id="popup">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12"></div>
          </div>
        </div>
      </div>
      <div
        class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg shadow-lg">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5
                class="modal-title text-dark fw-bolder"
                id="exampleModalLabel"
              >
                <i class="far fa-check-circle pr-3"></i>
                <span>Added to cart</span>
              </h5>
              <button
                type="button"
                class="btn-close border-1 rounded border-dark border-2"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  closeModal();
                }}
              ></button>
            </div>
            <div class="modal-body" id="cartPopupContent">
              <div class="container-fluid">
                <div id="currentItem" class="row">
                  <div class="col-4">
                    <img
                      id="currentItem-img"
                      src={RecentCartProd.cartImage}
                      class="img-fluid p-image"
                      alt={RecentCartProd.name}
                    />
                  </div>
                  <div class="col-8">
                    <p
                      id="currentItem-brand"
                      class="d-block text-capitalize text-secondary fw-bold mb-1"
                    >
                      <strong>Brand: </strong> {RecentCartProd.brand}
                    </p>
                    <span
                      id="currentItem-name"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Name: </strong> {RecentCartProd.name}
                    </span>

                    <span
                      id="currentItem-qty"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Quantity: </strong> {RecentCartProd.quantity}
                    </span>
                  </div>
                  <div class="col-12 mt-3">
                    <h6 id="currentItem-cart-total" class="fw-bolder text-dark">
                      Cart subtotal: $168.00
                      <br />
                      <span id="currentItem-no-item" class="text-secondary">
                        (2 items)
                      </span>
                    </h6>
                  </div>
                  <div class="col-12 my-3 d-flex justify-content-between">
                    <button class="rounded bg-dark text-light py-3 text-capitalize fw-bolder w-48 border-0">
                      <a href="/cart">View Vart</a>
                    </button>
                    <button class="rounded bg-light text-dark py-3 text-capitalize fw-bolder w-48 border-1 border-dark">
                      <span>continue shopping</span>
                    </button>
                  </div>
                </div>
                {rProdsPopup(product)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const rProdsPopup = (product) => {
  let relProducts = pC.CartRelated(product);
  console.log("relProducts");

  console.log(relProducts);
  console.log("relProducts");

  let rProds = '<div class="row">';
  rProds += '<div class="col-12 border-top border-secondary mb-3">';
  rProds += '<h4 class="text-dark fw-bold pt-2">Related Products</h4>';
  rProds += "</div>";

  relProducts.map((prod, index) => {
    rProds += `<div class="col-lg-3 col-md-3 col-sm-6 col-6">`;
    rProds += `<a
                            href=${
                              "/product/" + prod.STYLE_ID + "/" + prod.URL
                            }>`;
    rProds += `<img
                              src="http://template2icumulus-com.ntc5-p2stl.ezhostingserver.com/dragndrop/images/hp_product_img_m.jpg"
                              class="img-fluid mb-1"
                            />`;
    rProds += ` <span class="lh-sm d-block mb-1 text-secondary fw-normal">
                              ${prod.BRAND}
                            </span>`;
    rProds += `<p class="lh-sm mb-2 text-capitalize text-dark fw-bold">
                              ${prod.NAME}
                            </p>`;

    rProds += `<span class="lh-sm d-block fw-bold saleprice text-danger">`;
    prod.SALES_PRICE
      ? (rProds += prod.SALES_PRICE)
      : (rProds += prod.REGULAR_PRICE);

    rProds += `</span>`;
    rProds += `</a>`;
    rProds += `</div>`;
  });
  rProds += `</div>`;

  try {
    document.getElementById("relatedP").innerHTML = rProds;
  } catch (err) {}

  return "";
};

const updateCartPopUp = (cart, itemIndex) => {
  console.log("naaaaaaaaaaaaaaaaaaaaaa");
  console.log(cart);

  let cartContent = "";
  cartContent = `                  <div class="col-4">
                    <img
                      id="currentItem-img"
                      src=${cart[itemIndex].cartImage}
                      class="img-fluid p-image"
                      alt="${cart[itemIndex].name}"
                    />
                  </div>
                  <div class="col-8">
                    <p
                      id="currentItem-brand"
                      class="d-block text-capitalize text-secondary fw-bold mb-1"
                    >
                      <strong>Brand: </strong> ${cart[itemIndex].brand}
                    </p>
                    <span
                      id="currentItem-name"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Name: </strong> ${cart[itemIndex].name}
                    </span>

                    <span
                      id="currentItem-qty"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Quantity: </strong> ${cart[itemIndex].quantity}
                    </span>
                  </div>
                  <div class="col-12 mt-3">
                    <h6 id="currentItem-cart-total" class="fw-bolder text-dark">
                      Cart subtotal: $168.00
                      <br />
                      <span id="currentItem-no-item" class="text-secondary">
                        (${cart.length} items)
                      </span>
                    </h6>
                  </div>
                  <div class="col-12 my-3 d-flex justify-content-between">
                    <button class="rounded bg-dark text-light py-3 text-capitalize fw-bolder w-48 border-0">
                      <a id="vCart" href="#">View Cart</a>
                    </button>
                    <button class="rounded bg-light text-dark py-3 text-capitalize fw-bolder w-48 border-1 border-dark">
                      <span>continue shopping</span>
                    </button>
                  </div>
                                  <div id="relatedP">aaa</div>

`;
  return cartContent;
};

export const simpleAddToCart = (e, product, basket, dispatch, history) => {
  e.preventDefault();
  let cart = [];
  let itemIndex = -1;

  selectedProduct.quantity = 1;

  if (product.stock && product.stock > 0) {
    product.stockMessage = "In Stock";
  } else {
    product.stockMessage = "Out of Stock";
  }

  if (allowOutOfStock == "yes" || selectedProduct.stock > 0) {
    selectedProduct.image = pC.getProductSmallImage(product);

    selectedProduct.style_id = product.STYLE_ID;
    selectedProduct.name = product.NAME;

    // selectedProduct.stock = product.stock;
    selectedProduct.brand = product.BRAND;
    selectedProduct.regularPrice = product.REGULAR_PRICE;
    selectedProduct.salesPrice = product.SALES_PRICE;

    selectedProduct.cartImage = prodImagesDir + product.SMALLIMAGE;

    let price = 0;
    if (selectedProduct.salesPrice && selectedProduct.salesPrice > 0) {
      price = selectedProduct.salesPrice;
    } else {
      price = selectedProduct.regularPrice;
    }

    selectedProduct.total = price * selectedProduct.quantity;

    if (product.GENER == "simple") {
      // START ADD SIMPLE PRODUCT IN THE CART

      let sessions = [];
      let cart = [];
      sessions = reactLocalStorage.getObject("cartSessions");
      cart = reactLocalStorage.getObject("cartSessions");

      let itemMatched = false;
      if (sessions.length > 0) {
        let tempCart = [];
        tempCart = [...sessions];
        let tempSeletedProduct = {};
        tempSeletedProduct = { ...selectedProduct };

        tempCart.map((item) => {
          item.quantity = 0;
          item.total = 0;

          tempSeletedProduct.quantity = 0;
          tempSeletedProduct.total = 0;

          if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
            itemMatched = true;
            itemIndex = tempCart.indexOf(item);
          }
        });

        if (itemMatched == true) {
          let qty = 0;
          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }
          qty = cart[itemIndex].quantity;
          cart[itemIndex].quantity = qty + 1;
          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        } else {
          cart.push({ ...selectedProduct });
          itemIndex = cart.length - 1;

          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }

          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        }
      } else {
        cart = [];
        cart.push({ ...selectedProduct });
        itemIndex = cart.length - 1;

        let itemPrice = 0;
        if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
          itemPrice = cart[itemIndex].salesPrice;
        } else {
          itemPrice = cart[itemIndex].regularPrice;
        }

        cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
        reactLocalStorage.setObject("cartSessions", [...cart]);
        dispatch({
          type: "ADD_TO_BASKET",
          item: [...cart],
        });
      }
      document.getElementById("basket-total-top").innerHTML =
        "(" + cart.length + ")";
      document.getElementById("cartdropdown").style.display = "block";
      var top = document.getElementById("cartdropdown").offsetTop;
      window.scrollTo(0, top);
      history.push("/");

      // END ADD SIMPLE PRODUCT IN THE CART
    }
  } else {
    alert("Zero Stock Availabale");
  }
};

function collapseOne() {
  const x = document.getElementById("collapseOne");
  if (x.style.display == "none") {
    document.getElementById("collapseOne").style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("collapseOne").style.display = "none";
  }
}

function collapseTwo() {
  const x = document.getElementById("collapseTwo");
  if (x.style.display == "none") {
    document.getElementById("collapseTwo").style.display = "block";
  } else {
    x.style.display = "none";
    document.getElementById("collapseTwo").style.display = "none";
  }
}

function scrolltop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  } else {
  }
}
