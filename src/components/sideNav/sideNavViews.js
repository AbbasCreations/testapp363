import { useStateValue } from "../../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import * as snC from "../sideNav/sideNavController";
import * as Data from "../../Data";
import { Link } from "react-router-dom";
import taxonomyData from "../taxonomy.json";

export const SideBarViews = (props) => {
  let currentFilters = {};
  let currentproducts = [];
  const [{ basket, sFilters }, dispatch] = useStateValue();
  let storedFilters;
  let filters = reactLocalStorage.getObject("storedFilters");

  currentFilters = props.filters;
  currentproducts = props.products;

  function addCategories(
    filters,
    keyterm,
    keyValue,
    CurrentCatUrl,
    history,
    e
  ) {
    e.preventDefault();
    let tempFilters = {};
    tempFilters = filters;
    let key = keyterm;
    let termUrl;
    termUrl = keyterm + "_Url";
    if (tempFilters[key] == null || tempFilters[key].length == 0) {
      tempFilters[key] = [];
    }

    tempFilters[key].push(keyValue);
    tempFilters[termUrl] = CurrentCatUrl;

    filters = tempFilters;

    // reactLocalStorage.clear('storedFilters')
    //delete filters.DEPT;
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_FILTERS",
      filterItems: {
        ...filters,
      },
    });
    history.push(`/category/${CurrentCatUrl}`);
  }

  const CheckAvailable = (setCheckAvailability, value) => {
    setCheckAvailability(value);
  };

  //********************** SRART ADDTHISFILTERS*********************
  function addThisFilter(filters, status, keyterm, keyValue) {
    let tempFilters = {};
    if (status == true) {
      let index;
      if (
        keyterm == "BRAND" ||
        keyterm == "color" ||
        keyterm == "CALIBER" ||
        keyterm == "size" ||
        keyterm == "PRICERANGE"
      ) {
        index = filters[keyterm].indexOf(keyValue);
        filters[keyterm] = filters[keyterm].filter((el) => el != keyValue);
        if (filters[keyterm].length == 0) {
          delete filters[keyterm];

          //  reactLocalStorage.clear('storedFilters')
          //delete filters.DEPT;
          // dispatch the item into the data layer
          dispatch({
            type: "ADD_FILTERS",
            filterItems: {
              ...filters,
            },
          });
        } else {
          // reactLocalStorage.clear('storedFilters')
          //delete filters.DEPT;
          // dispatch the item into the data layer
          dispatch({
            type: "ADD_FILTERS",
            filterItems: {
              ...filters,
            },
          });
        }
      }
    } else {
      tempFilters = filters;
      let key = keyterm;
      if (tempFilters[key] == null || tempFilters[key].length == 0) {
        tempFilters[key] = [];
      }
      if (keyterm == "priceRange") {
        tempFilters[key] = [];
        tempFilters[key].push(keyValue);
      } else {
        tempFilters[key].push(keyValue);
      }
      filters = tempFilters;

      //reactLocalStorage.clear('storedFilters')
      //delete filters.DEPT;
      // dispatch the item into the data layer
      dispatch({
        type: "ADD_FILTERS",
        filterItems: {
          ...filters,
        },
      });
    }
  }
  //********************** END ADDTHISFILTERS*********************

  let history = useHistory();
  let CategoriesData = {};
  let taxonomy = "";
  let categories = [];
  CategoriesData = snC.shopByCategories(
    currentFilters,
    props.url,
    props.products
  );
  taxonomy = CategoriesData.taxonomy;
  categories = CategoriesData.categories;
  let itmCount = -1;
  let caliberCount = -1;

  let getBrands = snC.shopByBrand(props.products).brand;
  let BrandsItemsCount = snC.shopByBrand(props.products).itemsCount;

  let getCalibers = snC.shopByCaliber(props.products).calibers;
  let calibersItemsCount = snC.shopByCaliber(props.products).itemsCount;
  console.log("kali");
  console.log(calibersItemsCount);

  return (
    <>
      <section
        id="SideNav"
        className="col-lg-2 col-md-4 col-12 filters pt-5-lg pt-3-md pt-1-sm pt-2"
      >
        <div
          className="accordion accordion-flush pt-5-lg pt-3-md pt-1-sm pt-2"
          id="accordionFlush"
        >
          <div className="accordion-item ">
            <h2 className="accordion-header" id="flush-heading">
              <button
                id="filterby"
                className="text-uppercase fw-bold outline-none bg-transparent border-0 w-100 fs-5 text-left pl-4"
                type="button"
                data-toggle="collapse"
                data-target="#flush-collapse"
                aria-expanded="false"
                aria-controls="flush-collapse"
              >
                Filter By
              </button>
            </h2>
            <div id="selected" className="py-3">
              <p className="mb-0 pb-3">Selected</p>
              {snC.GetSelectedFilters(props)}
            </div>
            <div
              id="flush-collapse"
              className="accordion-collapse collapse show border-white border"
              aria-labelledby="flush-heading"
              data-parent="#accordionFlush"
            >
              <div className="accordion-body border-white">
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div
                    id="BrandFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button collapsed text-uppercase px-0 border-0 fw-bold bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Availability
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingTwo"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="checkAvailable"
                            id="all-items"
                            onClick={() => {
                              CheckAvailable(
                                props.setCheckAvailability,
                                "all-items"
                              );
                            }}
                          />
                          <label class="form-check-label" for="all-items">
                            Show All Items
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="checkAvailable"
                            id="out-of-stock-items"
                            onClick={() => {
                              CheckAvailable(
                                props.setCheckAvailability,
                                "out-of-stock-items"
                              );
                            }}
                          />
                          <label
                            class="form-check-label"
                            for="out-of-stock-items"
                          >
                            Out of Stock Items
                          </label>
                        </div>
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="radio"
                            name="checkAvailable"
                            id="in-stock-items"
                            onClick={() => {
                              CheckAvailable(
                                props.setCheckAvailability,
                                "in-stock-items"
                              );
                            }}
                          />
                          <label class="form-check-label" for="in-stock-items">
                            In Stock Items
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    id="CategoryFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingOne">
                      <button
                        className="accordion-button collapsed text-uppercase fw-bold border-0 px-0 outline-none bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Category
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingOne"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        {categories
                          ? categories.map((category) => {
                              let status = false;
                              if (
                                props.filters[props.filters.taxonomy] ==
                                category
                              ) {
                                status = true;
                              } else {
                                status = false;
                              }
                              let CurrentCategoryUrl = getCategoryData(
                                category,
                                taxonomy,
                                props.filters
                              );
                              return (
                                <Link
                                  to=""
                                  className="text-decoration-none active text-capitalize d-block mb-2"
                                  onClick={(e) => {
                                    addCategories(
                                      props.filters,
                                      taxonomy,
                                      category,
                                      CurrentCategoryUrl,
                                      history,
                                      e
                                    );
                                  }}
                                >
                                  {category}
                                </Link>
                              );
                            })
                          : ""}
                      </div>
                    </div>
                  </div>

                  <div
                    id="BrandFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button collapsed text-uppercase px-0 border-0 fw-bold bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Brand
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingTwo"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        {getBrands.map((brandName) => {
                          itmCount++;
                          let status = false;
                          if (props.filters.BRAND == brandName) status = true;
                          else status = false;

                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input active"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={status ? "checked" : ""}
                                onClick={() => {
                                  addThisFilter(
                                    props.filters,
                                    status,
                                    "BRAND",
                                    brandName
                                  );
                                }}
                              />
                              <label
                                className={`form-check-label ${
                                  status ? " active " : " "
                                } text-capitalize `}
                                for="flexCheckDefault"
                              >
                                {brandName}({BrandsItemsCount[itmCount]})
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  <div
                    id="BrandFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button collapsed text-uppercase px-0 border-0 fw-bold bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Caliber
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingTwo"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        {getCalibers.map((caliber) => {
                          caliberCount++;
                          let status = false;
                          if (props.filters.CALIBER == caliber) status = true;
                          else status = false;

                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input active"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={status ? "checked" : ""}
                                onClick={() => {
                                  addThisFilter(
                                    props.filters,
                                    status,
                                    "CALIBER",
                                    caliber
                                  );
                                }}
                              />
                              <label
                                className={`form-check-label ${
                                  status ? " active " : " "
                                } text-capitalize `}
                                for="flexCheckDefault"
                              >
                                {caliber}({calibersItemsCount[caliberCount]})
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/*
                    <div
                      id="BrandFilter"
                      className="accordion-item border-bottom border-1"
                    >
                      <h2 className="accordion-header" id="flush-headingTwo">
                        <button
                          className="accordion-button collapsed text-uppercase px-0 border-0 fw-bold bg-transparent"
                          type="button"
                          data-toggle="collapse"
                          data-target="#flush-collapseTwo"
                          aria-expanded="false"
                          aria-controls="flush-collapseTwo"
                        >
                          Color
                        </button>
                      </h2>
                      <div
                        id="flush-collapseTwo"
                        className="accordion-collapse collapse show border-0"
                        aria-labelledby="flush-headingTwo"
                        data-parent="#accordionFlushExample"
                      >
                        <div className="accordion-body px-1">
                          {snC.shopByColor(props.products).map((colors) => {
                            let status = false;
                            if (props.filters.color != null) {
                              if (props.filters.color.includes(colors)) {
                                status = true;
                              }
                            }
                            let setColors = { color: colors };
                            return (
                              <div className="form-check">
                                <input
                                  className="form-check-input active"
                                  type="checkbox"
                                  value=""
                                  id="flexCheckDefault"
                                  checked={status ? "checked" : ""}
                                  onClick={() => {
                                    addThisFilter(
                                      props.filters,
                                      status,
                                      "color",
                                      colors
                                    );
                                  }}
                                />
                                <label
                                  className={`form-check-label ${
                                    status ? " active " : " "
                                  }  text-capitalize`}
                                  for="flexCheckDefault"
                                >
                                  {colors}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                        */}

                  {/*
        
                  <div
                    id="BrandFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingTwo">
                      <button
                        className="accordion-button collapsed text-uppercase px-0 border-0 fw-bold bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                      >
                        Size
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingTwo"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        {snC.shopBySize(props.products).map((sizes) => {
                          let status = false;
                          if (props.filters.size != null) {
                            if (props.filters.size.includes(sizes)) {
                              status = true;
                            }
                          }
                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input active"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={status ? "checked" : ""}
                                onClick={() => {
                                  addThisFilter(
                                    props.filters,
                                    status,
                                    "size",
                                    sizes
                                  );
                                }}
                              />
                              <label
                                className={`form-check-label ${
                                  status ? " active " : " "
                                }  text-capitalize`}
                                for="flexCheckDefault"
                              >
                                {sizes}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                      */}
                  <div
                    id="PriceFilter"
                    className="accordion-item border-bottom border-1"
                  >
                    <h2 className="accordion-header" id="flush-headingThree">
                      <button
                        className="accordion-button collapsed text-uppercase border-0 px-0 fw-bold bg-transparent"
                        type="button"
                        data-toggle="collapse"
                        data-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        Price Range
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse show border-0"
                      aria-labelledby="flush-headingThree"
                      data-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body px-1">
                        {snC.shopByPrice(props.products).map((priceRange) => {
                          let status = false;

                          if (props.filters.priceRange == null) {
                          } else {
                            if (
                              priceRange == "below $50" &&
                              props.filters.priceRange.includes("below 50")
                            ) {
                              status = true;
                            } else if (
                              priceRange == "$51-$100" &&
                              props.filters.priceRange.includes("51-100")
                            ) {
                              status = true;
                            } else if (
                              priceRange == "$101-$150" &&
                              props.filters.priceRange.includes("101-150")
                            ) {
                              status = true;
                            } else if (
                              priceRange == "$151-$200" &&
                              props.filters.priceRange.includes("151-200")
                            ) {
                              status = true;
                            } else if (
                              priceRange == "$201-$250" &&
                              props.filters.priceRange.includes("201-250")
                            ) {
                              status = true;
                            } else if (
                              priceRange == "above $250" &&
                              props.filters.priceRange.includes("above 250")
                            ) {
                              status = true;
                            } else {
                              status = false;
                            }
                          }
                          if (props.filters.priceRange == null) {
                          } else {
                            if (props.filters.priceRange.includes(priceRange)) {
                              status = true;
                            }
                          }
                          return (
                            <div className="form-check">
                              <input
                                className="form-check-input active"
                                type="checkbox"
                                value=""
                                id="flexCheckDefault"
                                checked={status ? "checked" : ""}
                                onClick={() => {
                                  addThisFilter(
                                    props.filters,
                                    status,
                                    "priceRange",
                                    priceRange
                                  );
                                }}
                              />
                              <label
                                className={`form-check-label ${
                                  status ? " active " : " "
                                }  text-capitalize `}
                                for="flexCheckDefault"
                              >
                                {priceRange}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const getCategoryData = (category, taxonomy, filters) => {
  let currentCategoryData = "";
  let categoryUrl = "";
  taxonomyData.map((categories) => {
    if (taxonomy == "DEPT") {
      if (
        categories.DEPT.toUpperCase() == category.toUpperCase() &&
        categories.DEPT != "EMPTY" &&
        categories.TYP == "EMPTY"
      ) {
        currentCategoryData = categories.URL;
      }
    } else if (taxonomy == "TYP") {
      if (
        categories.TYP.toUpperCase() == category.toUpperCase() &&
        categories.DEPT.toUpperCase() == filters.DEPT.toUpperCase() &&
        categories.TYP != "EMPTY" &&
        categories.SUBTYP_1 == "EMPTY"
      ) {
        currentCategoryData = categories.URL;
      }
    } else if (taxonomy == "SUBTYP_1") {
      if (
        categories.SUBTYP_1.toUpperCase() == category.toUpperCase() &&
        categories.TYP.toUpperCase() == filters.TYP.toUpperCase() &&
        categories.SUBTYP_1 != "EMPTY" &&
        categories.SUBTYP_2 == "EMPTY"
      ) {
        currentCategoryData = categories.URL;
      }
    } else if (taxonomy == "SUBTYP_2") {
      if (
        categories.SUBTYP_2.toUpperCase() == category.toUpperCase() &&
        categories.SUBTYP_1.toUpperCase() == filters.SUBTYP_1.toUpperCase() &&
        categories.SUBTYP_2 != "EMPTY" &&
        categories.SUBTYP_3 == "EMPTY"
      ) {
        currentCategoryData = categories.URL;
      }
    } else if (taxonomy == "SUBTYP_3") {
      if (
        categories.SUBTYP_3.toUpperCase() == category.toUpperCase() &&
        categories.SUBTYP_2.toUpperCase() == filters.SUBTYP_2.toUpperCase() &&
        categories.SUBTYP_3 != "EMPTY" &&
        categories.SUBTYP_4 == "EMPTY"
      ) {
        currentCategoryData = categories.URL;
      }
    }
  });
  return currentCategoryData;
};
