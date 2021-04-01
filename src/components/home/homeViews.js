import { prodImagesDir } from "../../settings";
import { Link } from "react-router-dom";
import * as pV from "../product/productViews";

export const displayIndexSlider = () => {
  return (
    <>
      <section id="indexSlider" className="mb-4 index-slider-animation">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div
              id="carouselExampleIndicators"
              className="carousel slide p-0"
              data-ride="carousel"
            >
              <ol className="carousel-indicators text-center w-25 h-0 mx-auto">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className=""
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                  className=""
                ></li>
              </ol>
              <div id="sliderpictures" className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="img-fluid"
                    src="/images/main-banner1.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
                <div className="carousel-item">
                  <img
                    className="img-fluid"
                    src="/images/main-banner2.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
                <div className="carousel-item ">
                  <img
                    className="img-fluid"
                    src="/images/main-banner3.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
              </div>

              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span aria-hidden="true">
                  <i className="fas fa-angle-left display-2"></i>
                </span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span aria-hidden="true">
                  <i className="fas fa-angle-right display-2"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayMiniBanners = () => {
  return (
    <>
      <section id="threebanner" class="mb-3 module">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 half mb-3 position-relative three-banner-left-animation module">
              <img
                src="images/mini-banner1.jpg"
                alt="mini banner image"
                class="img-fluid"
              />
              <div class="overlay position-absolute left-0 right-0 top-0 text bottom-0 h-100">
                <p>
                  <strong class="text-left  text-light d-block ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Men
                    </a>
                  </strong>
                  <span class="text-left text-light d-block float-left  ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      FootWear
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Apparel
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Jackets
                    </a>
                  </span>
                  <em class="text-right fst-normal float-right">
                    <a
                      href="#"
                      class="text-capitalize text-center text-decoration-none bg-danger mt-4 mx-auto  text-light rounded-3"
                    >
                      shop now
                    </a>
                  </em>
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 half mb-3 position-relative three-banner-right-animation module">
              <img
                src="images/mini-banner2.jpg"
                alt="mini banner image"
                class="img-fluid"
              />
              <div class="overlay position-absolute left-0 right-0 top-0 text bottom-0 h-100">
                <p>
                  <strong class="text-left  text-light d-block ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Women
                    </a>
                  </strong>
                  <span class="text-left text-light d-block float-left  ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Footwear
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Apparel
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Jackets
                    </a>
                  </span>
                  <em class="text-right fst-normal float-right">
                    <a
                      href="#"
                      class="text-capitalize text-center text-decoration-none bg-danger mt-4 mx-auto  text-light rounded-3"
                    >
                      shop now
                    </a>
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayFeaturedProducts = (
  products,
  basket,
  dispatch,
  history
) => {
  const imageNotFound = (url_image, e) => {
    var image = new Image();
    image.src = url_image;
    if (image.width == 0) {
      document.getElementById(e.target.id).src =
        prodImagesDir + "default-image.jpeg";
    } else {
    }
  };

  return (
    <>
      <section id="productslider" class="mb-4 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase headings-animation">
              <p>featured items</p>
            </div>

            <div class="product-slider">
              <div class="product-slider__slider">
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
                        <div class="productListing text-center p-1">
                          <Link
                            to={prod.URL}
                            class="product text-decoration-none text-left"
                          >
                            <span class="image text-center mb-2 d-block">
                              <img
                                class="item"
                                src={prod.SMALLIMAGE}
                                alt={prod.NAME}
                                id={"img" + prod.STYLE_ID}
                                width={183}
                                onError={(e) => {
                                  imageNotFound(
                                    prodImagesDir + prod.SMALLIMAGE,
                                    e
                                  );
                                }}
                              />
                            </span>
                            <span class="brand text-capitalize  text-dark d-block mb-1">
                              {prod.BRAND}
                            </span>
                            <span class="pricing">
                              <strong class="listPrice  text-dark d-block mb-1">
                                $
                                {prod.SALES_PRICE
                                  ? prod.SALES_PRICE
                                  : prod.REGULAR_PRICE}
                              </strong>
                            </span>
                            <div class="producthover">
                              <span class="name text-dark d-block mb-1">
                                {prod.NAME}
                              </span>
                              {prod.GENER == "simple" ? (
                                <button
                                  onClick={(e) => {
                                    pV.simpleAddToCart(
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
                                <Link
                                  to={
                                    "/product/" + prod.STYLE_ID + "/" + prod.URL
                                  }
                                  class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                >
                                  View Options
                                </Link>
                              )}
                            </div>
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

export const getCompanyIntro = () => {
  return (
    <>
      <section id="promo-banner" class="pt-0  mb-4 module bg-light">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-center align-content-center flex-column product-page-left-main">
              <div class="promolayerone">
                <p class="text-dark text-capitalize fs-4">New Arrivals!</p>
                <strong class="d-block text-secondary fs-5 mb-1">
                  Denim Jacket
                </strong>
                <span class="d-block text-secondary fs-6 mb-1">
                  This newly arrived article is famous all over the world.
                  People are going crazy after this and have pre-ordered this
                  article from stores . Dont miss your chance to buy this. Hurry
                  Up and order it today!!!
                </span>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 module featured-items-animation">
              <img
                src="images/585680404f6ae202fedf26f0.png"
                class="img-fluid w-100 d-block mx-auto"
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-center align-content-center flex-column product-page-right-main">
              <div class="promolayertwo">
                <p class="text-dark fs-5 mb-1">
                  Enter promo code Denim10% for discounts
                </p>
                <p class="text-dark fs-6 mb-1">
                  Click on the link below to explore more exciting jackets
                </p>
                <button class="bg-dark text-light border-1 p-2 fw-bold border-dark rounded">
                  View Jackets
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayRecentlyViewed = (products, basket, dispatch, history) => {
  return (
    <>
      <section
        id="recentlyviewed"
        class="mb-4 mt-5 recently-viewed-animation module"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase pb-3 headings-animation">
              <p>Recently Viewed Items</p>
            </div>
            {products.map((prod) => {
              if (prod && prod.length > 0) {
                return (
                  <>
                    <div class="col-lg-3 col-md-3 col-sm-4 col-6 rec mx-auto">
                      <div class="productListing text-center p-2">
                        <Link
                          to={"/product/" + prod.style_id + "/" + prod.url}
                          class="product text-decoration-none text-left"
                        >
                          <span class="image text-center mb-2 d-block w-50 float-left">
                            <img
                              class="item img-fluid w-100"
                              src={prodImagesDir + prod.smallImage}
                            />
                          </span>
                          <div className="recentproduct w-50 float-left">
                            <span class="brand text-capitalize  text-dark d-block mb-1">
                              {prod.brand}
                            </span>
                            <span class="pricing">
                              <strong class="listPrice  text-dark d-block mb-1">
                                $
                                {prod.sales_price
                                  ? prod.sales_price
                                  : prod.regular_price}
                              </strong>
                            </span>

                            <div class="producthover">
                              <span class="name text-dark d-block mb-1">
                                {prod.name}
                              </span>
                              {prod.gener == "simple" ? (
                                <button
                                  onClick={(e) => {
                                    pV.simpleAddToCart(
                                      e,
                                      prod,
                                      basket,
                                      dispatch,
                                      history
                                    );
                                  }}
                                  class="bg-dark text-light border-1 p-2 fw-normal fs-6 border-dark  w-75 mx-auto d-block"
                                >
                                  Add To Cart
                                </button>
                              ) : (
                                <Link
                                  to={
                                    "/product/" + prod.style_id + "/" + prod.url
                                  }
                                  class="bg-dark text-light border-1 p-2 fw-normal border-dark  w-75 mx-auto d-block"
                                >
                                  View Options
                                </Link>
                              )}
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export const getBrands = () => {
  return (
    <>
      <section id="brandslider" class="mb-5 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase fs-1 headings-animation">
              <p>brands</p>
            </div>
            <div class="product-slider">
              <div class="product-slider__slider_brand">
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
                <div class="product-slider__item">
                  <a href="#">
                    <img
                      src="images/hp_brand_logo.jpg"
                      alt="brand image"
                      class="img-fluid"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
