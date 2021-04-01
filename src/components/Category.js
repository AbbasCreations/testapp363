import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import "bootstrap/dist/css/bootstrap.min.css";
import * as snV from "./sideNav/sideNavViews";
import * as cC from "./category/categoryController";
import * as cV from "./category/categoryViews";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { GetMetaTags } from "./Utilities";
import * as API from "../API";
import axios from "axios";
import prodData from "./prodData.json";

export default function Category() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkAvailability, setCheckAvailability] = useState("");

  let url = "";
  const params = useParams();
  if (params) {
    url = params.url;
  }
  let urlData = cC.getUrlTaxonomy(url);
  urlData.url = url;

  let filters = {};
  let history = useHistory();
  const [{ sFilters, sortby }, dispatch] = useStateValue();
  if (Object.keys(sFilters).length != 0) {
    reactLocalStorage.setObject("storedFilters", sFilters);
  }

  filters = reactLocalStorage.getObject("storedFilters");
  filters[urlData.taxonomy] = urlData.category;
  let temProducts = [];
  let property = sortby;
  let ID = "";
  let featured = "";
  let totalProducts = prodData;

  for (let x = 0; x < totalProducts.length; x++) {
    totalProducts[x].GENER = "simple";
    totalProducts[x].BRAND = totalProducts[x].brand;
    totalProducts[x].NAME = totalProducts[x].name;
    totalProducts[x].CALIBER = totalProducts[x].caliber;

    totalProducts[x].DEPT = totalProducts[x].Dept;
    totalProducts[x].TYP = totalProducts[x].Typ;
    totalProducts[x].SUBTYP_1 = "EMPTY";
    totalProducts[x].SUBTYP_2 = "EMPTY";
    totalProducts[x].SUBTYP_3 = "EMPTY";

    totalProducts[x].SALES_PRICE = x;
    totalProducts[x].REGULAR_PRICE = totalProducts[x].price;
    totalProducts[x].SIZE = totalProducts[x].size;
    totalProducts[x].STYLE_ID = totalProducts[x].id;
    totalProducts[x].URL = totalProducts[x].product_url;

    totalProducts[x].SMALLIMAGE = totalProducts[x].image;
    totalProducts[x].SIZE = [];
    totalProducts[x].COLOR = [];
  }

  temProducts = [];

  useEffect(() => {
    setLoading(true);

    setAllProducts(totalProducts);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    /*
    API.ApiProducts(
      property,
      url,
      urlData.taxonomy,
      urlData.category,
      setAllProducts,
      setLoading,
      "",
      ""
    );
    */
  }, [url]);
  useEffect(() => {
    setLoading(true);
  }, [checkAvailability]);

  temProducts = cC.getProducts(
    filters,
    allProducts,
    dispatch,
    property,
    url,
    urlData.taxonomy,
    urlData.category
  );

  if (checkAvailability == "out-of-stock-items") {
    temProducts = temProducts.filter(
      (prods) => prods.available == "Out of Stock"
    );
  } else if (checkAvailability == "in-stock-items") {
    temProducts = temProducts.filter((prods) => prods.available == "In Stock");
  } else {
    temProducts = temProducts;
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [checkAvailability]);

  let props = { filters: {} };
  props.filters = filters;
  //let categoryTile = cC.getCategoryTitle(props);
  let categoryTile = url;
  // will update data later when connected to DB

  let metas = {
    title: categoryTile,
    description: categoryTile,
    keywords: categoryTile,
    image: "",
    url: window.location.href,
    imageSrc: "",
  };

  return (
    <React.Fragment>
      <section id="contentHolder">
        <GetMetaTags {...metas} />

        <div id="category">
          <div className="container">
            <div className="row">
              <BreadCrumbDisplay
                filters={filters}
                dispatch={dispatch}
                history={history}
                urlData={urlData}
              />
              {
                <SideBarDisplay
                  filters={filters}
                  products={temProducts}
                  url={url}
                  setCheckAvailability={setCheckAvailability}
                />
              }
              <CategoryProductArea
                dispatch={dispatch}
                filters={filters}
                products={temProducts}
                property={property}
                loading={loading}
                setLoading={setLoading}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
const BreadCrumbDisplay = (props) => {
  let breadcrumbs = cC.getCategoryBreadCrumbs(props);
  return cV.BreadCrumbDisplay(breadcrumbs);
};
const SideBarDisplay = (props) => {
  let sideNavContent = snV.SideBarViews(props);
  return sideNavContent;
};
const CategoryProductArea = (props) => {
  let products = [];
  products = props.products;

  //HOOK FOR PERPAGE PRODUCTS
  const [perpageProductscount, setPerpageProductscount] = useState(10);
  const [searchText, setSearchText] = useState("");

  //HOOK FOR ACTIVE PAGE
  const [activePage, setCurrentPage] = useState(1);

  //GET CATEGORY TITLE
  let categoryTile = cC.getCategoryTitle(props);

  //PRODUCTS PER PAGE
  let productsPerPage = perpageProductscount;

  useEffect(() => {
    props.setLoading(true);
  }, [searchText]);

  if (searchText != "") {
    const regex = new RegExp(searchText, "i");
    products = products.filter(
      (product) => regex.test(product.NAME) || regex.test(product.BRAND)
    );
  }

  useEffect(() => {
    setTimeout(() => {
      props.setLoading(false);
    }, 1000);
  }, [searchText]);

  //GET PRODUCTS ACCORDING TO PAGINATION
  let currentproducts = cC.pagination(products, productsPerPage, activePage)
    .currentproducts;

  let paginationContent = {
    activePage: activePage,
    productsPerPage: productsPerPage,
    products: products,
    cC: cC,
    setCurrentPage: setCurrentPage,
  };

  return (
    <>
      {cV.categotyProductsView(
        categoryTile,
        currentproducts,
        products,
        cC,
        setPerpageProductscount,
        props.dispatch,
        props.property,
        props.loading,
        paginationContent,
        setSearchText
      )}
      {cV.paginationView(
        activePage,
        productsPerPage,
        products,
        cC,
        setCurrentPage
      )}
    </>
  );
};
