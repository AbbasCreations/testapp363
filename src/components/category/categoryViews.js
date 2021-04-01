import React, { Suspense, useState } from "react";
import Pagination from "react-js-pagination";
import { comingSoonS, prodImagesDir } from "../../settings";
import { colorOrImage } from "../../settings";
import * as cC from "./categoryController";
import { Link } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
import Autosuggest from "react-autosuggest";

export const productsStatus = (currentproducts, products) => {
  return (
    <div className="col-lg-6 col-md-6 col-12 totalproduct text-left pb-5-lg pb-3-md pb-3">
      <p className="text-capitalize catgrey">
        {currentproducts.length} of Total {products.length} products
      </p>
    </div>
  );
};

export const productsPerpageView = (cC, setPerpageProductscount, products) => {
  return (
    <div className="col-md">
      <div className="d-flex justify-content-end align-items-center selection">
        <label for="floatingSelectGrid" className="pr-2">
          View
        </label>
        <select
          className="form-select one"
          id="floatingSelectGrid"
          aria-label="Floating label select example"
          onChange={(e) => cC.handleChangePerPage(setPerpageProductscount, e)}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="40">40</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
  );
};

export const ProductsSearchSection = (products, setSearchText) => {
  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : products.filter(
          (prod) => prod.NAME.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;
  const renderSuggestion = (suggestion) => <div>{suggestion.name}</div>;

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (e, { newValue }) => {
    setValue(newValue);
    let text = e.target.value;
    setSearchText(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: "Type C here for now",
    id: "abbas",

    value,
    //onChange: onChange,
    onChange: onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );

  return (
    <>
      <input
        type="text"
        class="w-100 border-1 mb-5  py-2 pl-2"
        placeholder="Search Here"
        name="searchProds"
        id="searchProds"
        onChange={(e) => {
          RefineSearch(e, setSearchText);
        }}
      />
    </>
  );
};

export const productsSortSection = (property, dispatch) => {
  let p = "";
  p = property;
  let slectedOption = "";
  return (
    <div className="col-md">
      <div className="d-flex justify-content-end align-items-center selection">
        <label for="" className="pr-2">
          Sort:
        </label>

        <select
          key={Math.floor(Math.random() * 99999)}
          className="form-select two"
          id="floatingSelectGrid"
          aria-label="Floating label select example"
          onChange={(e) => {
            handleChange(e, dispatch);
          }}
        >
          <option
            value="default"
            {...(property == "default"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Default
          </option>

          <option
            value="name(a-z)"
            {...(property == "name(a-z)"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Name(A-Z)
          </option>

          <option
            value="name(z-a)"
            {...(property == "name(z-a)"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Name(Z-A)
          </option>

          <option
            value="featuredASC"
            {...(property == "featuredASC"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Featured
          </option>
          <option
            value="price-high-to-low"
            {...(property == "price-high-to-low"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Price(High-Low)
          </option>
          <option
            value="price-low-to-high"
            {...(property == "price-low-to-high"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Price(Low-High)
          </option>
        </select>
      </div>
    </div>
  );
};

const RefineSearch = (e, setSearchText) => {
  e.preventDefault();
  let text = e.target.value;
  setSearchText(text);
};

const handleChange = (e, dispatch) => {
  e.preventDefault();

  let sortingText = e.target.value;

  dispatch({
    type: "SORT_BY",
    sortText: sortingText,
  });
};

export const categoryTitleSection = (categoryTile) => {
  return (
    <div className="col-6 catheading pb-2">
      <h1 className="text-uppercase border-bottom border-2 pb-1">
        {categoryTile}
      </h1>
    </div>
  );
};

export const ProductThumbnail = (currentproducts, loading) => {
  let result = {};
  console.log("cuuuuuuuuuuuu3333");
  console.log(currentproducts);

  let cumtomIndex = -1;
  return (
    <>
      {loading == true ? (
        <>
          <div class="text-center">
            <div class="spinner-grow text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-secondary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-success" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-light" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-dark" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : currentproducts.length > 0 ? (
        currentproducts.map((product, index) => {
          product.SALES_PRICE = 0;
          return (
            <div className="col-ag-3 col-md-4 col-sm-6 col-6 mb-4">
              <div className="productListing text-center">
                <Link
                  style={{ zIndex: -1, position: "relative" }}
                  to={`${product.URL}`}
                  className="product text-decoration-none text-left"
                >
                  <span className="image text-left mb-2 d-block">
                    <img
                      id={"img" + product.STYLE_ID}
                      src={product.image}
                      alt="product image"
                      className={product.NAME}
                      width={183}
                    />
                  </span>
                  <span className="brand">{product.BRAND}</span>
                  <span className="name">{product.NAME} </span>
                  <span className="pricing">
                    <strong className="itemPrice">
                      Price: ${product.REGULAR_PRICE}
                    </strong>
                    {product.SALES_PRICE != 0 &&
                      product.SALES_PRICE < product.REGULAR_PRICE && (
                        <strong className="salePrice">
                          Price: ${product.SALES_PRICE}
                        </strong>
                      )}
                  </span>
                </Link>
              </div>
              <div className="d-flex justify-content-center">
                {cC.getColorAttrOnThumbs(colorOrImage, product.style_id).name ==
                "image"
                  ? cC
                      .getColorAttrOnThumbs(colorOrImage, product.style_id)
                      .data.map((colorImage) => {
                        return (
                          <span className="border-1 border-dark rounded p-1  d-block color-span">
                            <img
                              src={colorImage}
                              alt="color Image"
                              onClick={(e) => {
                                changeImage(e, product.style_id);
                              }}
                            />
                          </span>
                        );
                      })
                  : cC.getColorAttrOnThumbs(colorOrImage, product.style_id)
                      .name == "colorCode"
                  ? cC
                      .getColorAttrOnThumbs(colorOrImage, product.style_id)
                      .data.map((colorCode) => {
                        cumtomIndex++;
                        return (
                          <span className="border-1 border-dark rounded p-1  d-block color-span">
                            <button
                              style={{
                                backgroundColor: colorCode,
                                color: colorCode,

                                fontSize: 0 + "px",
                              }}
                              value={
                                cC.getColorAttrOnThumbs(
                                  colorOrImage,
                                  product.style_id
                                ).images[cumtomIndex]
                              }
                              onClick={(e) => {
                                changeColorImage(e, product.style_id);
                              }}
                            >
                              colorCode
                            </button>
                          </span>
                        );
                      })
                  : ""}
              </div>
            </div>
          );
        })
      ) : (
        <h3>No Products Avaiable</h3>
      )}
    </>
  );
};
const changeImage = (e, ProdID) => {
  let cImage = e.target.src;
  if (cImage && cImage != "") {
    document.getElementById(ProdID).src = cImage;
  } else {
    document.getElementById(ProdID).src = prodImagesDir + comingSoonS;
  }
};

const changeColorImage = (e, ProdID) => {
  let cImage = e.target.value;
  if (cImage && cImage != "") {
    document.getElementById(ProdID).src = cImage;
  } else {
    document.getElementById(ProdID).src = prodImagesDir + comingSoonS;
  }
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

export const categotyProductsView = (
  categoryTile,
  currentproducts,
  products,
  cC,
  setPerpageProductscount,
  dispatch,
  property,
  loading,
  paginationContent,
  setSearchText
) => {
  return (
    <>
      <section id="CategoryProducts" className="col-lg-10 col-md-8 col-12">
        <div className="row">
          <div className="col-12">
            <div className="row">
              {categoryTitleSection(categoryTile)}
              {paginationView(
                paginationContent.activePage,
                paginationContent.productsPerPage,
                paginationContent.products,
                paginationContent.cC,
                paginationContent.setCurrentPage
              )}
            </div>
          </div>
          <div className="col-12 catproductinner" id="catproductinner">
            <div className="row">
              {productsStatus(currentproducts, products)}

              <div className="col-lg-6 col-md-6 col-12 categoryselect text-right pb-5-lg pb-3-md pb-3">
                <div className="row g-2">
                  {productsPerpageView(cC, setPerpageProductscount, products)}

                  {productsSortSection(property, dispatch)}
                </div>
              </div>
              <div> {ProductsSearchSection(products, setSearchText)}</div>
              {ProductThumbnail(currentproducts, loading)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const paginationView = (
  activePage,
  productsPerPage,
  products,
  cC,
  setCurrentPage
) => {
  return (
    <>
      <section
        id="Pagination"
        className="col-6 py-0 d-flex mx-auto justify-content-between"
      >
        <Pagination
          activePage={activePage}
          itemsCountPerPage={productsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={4}
          onChange={(e) => {
            cC.handlePageChange(setCurrentPage, e);
          }}
        />
      </section>
    </>
  );
};
