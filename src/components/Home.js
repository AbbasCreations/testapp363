import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import * as hC from "./home/homeController";
import * as hV from "./home/homeViews";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { GetMetaTags } from "./Utilities";
import * as API from "../API";
import prodData from "./prodData.json";

export default function Home() {
  let metas = {
    title:
      "Celerant360 - Optimized Eccommerce Framework with cutting edge technologies",
    description: "dessssssss",
    keywords: "kkkkkk",
    image: "imgggggggggg",
    url: "urllllllllllllll",
    imageSrc: "srcccccccc",

    canonical: "conicalllllllll",
  };

  return (
    <div id="index">
      <GetMetaTags {...metas} />

      <IndexSlider />
      <IndexBanners />
      <IndexProductsListings />
      <CompanyIntro />
      <RecentlyViewed />
      <IndexBrandSlider />
    </div>
  );
}

const IndexSlider = () => {
  let slider = hV.displayIndexSlider();
  return slider;
};

const IndexBanners = () => {
  let miniBanners = hV.displayMiniBanners();
  return miniBanners;
};

const IndexProductsListings = () => {
  const [{ basket }, dispatch] = useStateValue();

  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* API.ApiProducts("", "", "", "", setAllProducts, setLoading, "");*/

    /* prodData.filter((product) => product.featured == "yes");*/
    setLoading(true);

    let featureProds = prodData;
    setAllProducts(featureProds);
    setLoading(false);
  }, []);

  let history = useHistory();

  let featuredProducts = [];

  featuredProducts = hC.getFeaturedProducts(allProducts);

  let featured = hV.displayFeaturedProducts(
    featuredProducts,
    basket,
    dispatch,
    history
  );
  return featured;
};

const CompanyIntro = () => {
  let companyIntro = hV.getCompanyIntro();
  return companyIntro;
};

const RecentlyViewed = () => {
  const [{ basket }, dispatch] = useStateValue();
  let history = useHistory();
  let recentlyViewed = [];
  recentlyViewed = hC.getRecentlyViewed();

  let recently = hV.displayRecentlyViewed(
    recentlyViewed,
    basket,
    dispatch,
    history
  );
  return recently;
};

const IndexBrandSlider = () => {
  let brands = [];
  brands = hV.getBrands();
  return brands;
};
