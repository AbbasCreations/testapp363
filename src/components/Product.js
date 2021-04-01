import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useParams } from "react-router";
import * as pC from "./product/productController";
import * as pV from "./product/productViews";
import * as mcss from "../css/magiczoompluscss.css";
import MagicZoom from "../js/magiczoomplusReactJs";
import { prodImagesDir } from "../settings";
import { GetMetaTags } from "./Utilities";
import * as API from "../API";

function Product() {
  const [allProducts, setAllProducts] = useState([]);
  const [additionalProducts, setAdditionalProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  let cart = [];

  const [{ basket }, dispatch] = useStateValue();
  let sessions = [];
  sessions = reactLocalStorage.getObject("cartSessions");

  const params = useParams();
  let product = {};

  useEffect(() => {
    API.getProductByID(params.id, setAllProducts, setLoading);
    MagicZoom.refresh();
  }, [params.id]);
  MagicZoom.refresh();

  // product = pC.getProduct(params.id);
  if (allProducts.length > 0) {
    product = allProducts[0];
  } else {
    product = {};
  }
  console.log("alaaaaaaaaaaa");
  console.log(product);
  product.STYLE_ID = product.id;
  product.URL = product.product_url;
  product.SMALLIMAGE = product.image;
  product.LARGEIMAGE = product.image;
  product.NAME = product.name;
  product.UPC = product.upc;
  product.STOCK = 10;

  product.BRAND = product.brand;
  product.REGULAR_PRICE = product.price;
  product.SALES_PRICE = 0;
  product.GENER = "simple";

  //pC.setRecentlyViewed(product, reactLocalStorage);
  let metas = {
    title: product.NAME,
    description: product.DESCRIPTION,
    keywords: product.NAME,
    image: product.SMALLIMAGE,
    url: window.location.href,
    imageSrc: product.SMALLIMAGE,
  };

  return (
    <>
      <GetMetaTags {...metas} />

      <section id="contentHolder">
        <div id="productpage">
          {product.STYLE_ID ? (
            <div className="container">
              <div className="row">
                <ProductImage product={product} />

                <ProductInfo product={product} />
                {/*<ProductNewsLetters product={product} />*/}
                <ProductDetails product={product} />
                <AdditionalProducts
                  product={product}
                  additionalProducts={additionalProducts}
                  setAdditionalProducts={setAdditionalProducts}
                  setLoading={setLoading}
                />
              </div>
              <div id="div1"></div>
            </div>
          ) : (
            <div>
              {noProducts()}
              {setTimeout(function () {
                try {
                  document.getElementById("div1").style.visibility = "visible";
                } catch (err) {}
              }, 10000)}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

const noProducts = () => {
  return (
    <div className="container" id="div1" style={{ visibility: "hidden" }}>
      <div className="row">
        <div class="alert alert-danger mt-2" role="alert">
          No Product Found with this ID
        </div>
      </div>
    </div>
  );
};
const BreadCrumbDisplay = (props) => {
  let history = useHistory();

  let breadcrumbs;
  breadcrumbs = pC.getProductBreadCrumbs(
    props.product,
    history,
    props.dispatch
  );
  return pV.BreadCrumbDisplay(breadcrumbs);
};

const ProductImage = (props) => {
  let prodImageInfo = pC.getProductImage(props);
  return pV.displayProductImage(prodImageInfo);
};

const ProductInfo = (props) => {
  let prodInfo = pC.getProductInfo(props);
  return pV.displayProductInfo(prodInfo);
};

const ProductNewsLetters = (props) => {
  let prodNewsLetters = pC.getProductNewsLetters(props);
  return pV.displayProductNewsLetters(prodNewsLetters);
};

const ProductDetails = (props) => {
  return pV.displayProductDetails(props);
};

const AdditionalProducts = (props) => {
  const [{ basket }, dispatch] = useStateValue();

  let history = useHistory();

  let prodDept = props.product.DEPT;
  let prodBrand = props.product.BRAND;

  useEffect(() => {
    API.getWeRecommend(
      props.product.BRAND,
      "",
      6,
      props.setAdditionalProducts,
      props.setLoading
    );
  }, [props.product.DEPT]);

  if (props.additionalProducts == null) {
    props.additionalProducts = [];
  }
  return pV.displayAdditionalProducts(
    props.additionalProducts,
    basket,
    dispatch,
    history
  );
};

export default Product;
