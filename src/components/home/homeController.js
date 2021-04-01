import * as Data from "../../Data";
import { productColorsStyle } from "../../settings";
import { reactLocalStorage } from "reactjs-localstorage";

export const getFeaturedProducts = (allProductsData) => {
  let featuredProducts = [];
  featuredProducts = allProductsData.filter(
    (product) => product.FEATURED != "yes"
  );
  featuredProducts.length = 6;
  return featuredProducts;
};

export const getRecentlyViewed = () => {
  let rViewedProducts = [];
  rViewedProducts = reactLocalStorage.getObject("recentlyViewed");
  if (rViewedProducts && rViewedProducts.length > 0) {
  } else {
    rViewedProducts = [];
  }

  return rViewedProducts;
};
