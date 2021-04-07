import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-bg-dark">
      <div className="container py-5">
        <div className="row">
          <FooterBlockFirst />
          <FooterBlockSecond />
          <FooterBlockThird />
          <FooterBlockFourth />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

const FooterBlockFirst = () => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 unique">
        <span
          className="nav-title collapsed text-light text-uppercase d-block mb-3"
          data-toggle="collapse"
          data-target="##accordzero"
          aria-expanded="false"
        >
          customer service
        </span>
        <div id="accordzero" className=" text-light text-capitalize">
          <Link
            to="/info/track-your-order"
            className="d-block text-decoration-none text-light mb-1"
          >
            track your order
          </Link>
          <Link
            to="/info/return"
            className="d-block text-decoration-none text-light mb-1"
          >
            returns
          </Link>
          <Link
            to="/info/shipping"
            className="d-block text-decoration-none text-light mb-1"
          >
            shipping
          </Link>
          <Link
            to="/info/product-policies"
            className="d-block text-decoration-none text-light mb-1"
          >
            product policies
          </Link>
          <Link
            to="/info/warranty"
            className="d-block text-decoration-none text-light mb-1"
          >
            warranty information
          </Link>
          <Link
            to="/info/suggestions"
            className="d-block text-decoration-none text-light mb-1"
          >
            suggestion box
          </Link>
          <Link
            to="/info/report-issues"
            className="d-block text-decoration-none text-light mb-1"
          >
            report website issue
          </Link>
          <Link
            to="/info/customer-survey"
            className="d-block text-decoration-none text-light mb-1"
          >
            customer survey
          </Link>
          <Link
            to="/info/contact-us"
            className="d-block text-decoration-none text-light mb-1"
          >
            contact us
          </Link>
        </div>
      </div>
    </>
  );
};

const FooterBlockSecond = () => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 unique">
        <span
          className="nav-title collapsed text-light fs-6  text-uppercase d-block mb-3"
          data-toggle="collapse"
          data-target="##accordone"
          aria-expanded="false"
        >
          information
        </span>
        <div id="accordone" className=" text-light text-capitalize">
          <Link
            to="/info/recall-information"
            className="d-block text-decoration-none text-light mb-1"
          >
            recall information
          </Link>
          <Link
            to="/info/privacy-policy"
            className="d-block text-decoration-none text-light mb-1"
          >
            privacy policy
          </Link>
          <Link
            to="/info/terms-of-use"
            className="d-block text-decoration-none text-light mb-1"
          >
            terms <span>of</span> use
          </Link>
        </div>
      </div>
    </>
  );
};

const FooterBlockThird = () => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 unique">
        <span
          className="nav-title collapsed text-light fs-6  text-uppercase d-block mb-3"
          data-toggle="collapse"
          data-target="##accordtwo"
          aria-expanded="false"
        >
          information
        </span>
        <div id="accordtwo" className=" text-light text-capitalize">
          <Link
            to="/info/recall-information"
            className="d-block text-decoration-none text-light mb-1"
          >
            recall information
          </Link>
          <Link
            to="/info/privacy-policy"
            className="d-block text-decoration-none text-light mb-1"
          >
            privacy policy
          </Link>
          <Link
            to="/info/terms-of-use"
            className="d-block text-decoration-none text-light mb-1"
          >
            terms <span>of</span> use
          </Link>
        </div>
      </div>
    </>
  );
};

const FooterBlockFourth = () => {
  return (
    <>
      <div className="col-lg-3 col-md-6 col-12 normal">
        <span className="nav-title text-light fs-6  text-uppercase d-block mb-3">
          follow us
        </span>
        <Link to="">
          <i className="fab fa-facebook text-light"></i>
        </Link>
        <Link to="">
          <i className="fab fa-twitter-square text-light"></i>
        </Link>
        <Link to="">
          <i className="fab fa-pinterest text-light"></i>
        </Link>
      </div>
    </>
  );
};

const FooterBottom = () => {
  return (
    <>
      <div id="footer-bottom">
        <div className="copyright container py-3">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-12 text-left reserve text-light fw-normal text-capitalize">
              <p>&copy; 2021 all rights reserved</p>
            </div>
            <div className="col-lg-4 col-md-4 col-12 text-center payment">
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-diners-club text-light"></i>
              </Link>
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-discover text-light"></i>
              </Link>
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-mastercard text-light"></i>
              </Link>
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-paypal text-light"></i>
              </Link>
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-amex text-light"></i>
              </Link>
              <Link to="" className="text-decoration-none">
                <i className="fab fa-cc-visa text-light"></i>
              </Link>
            </div>
            <div className="col-lg-4 col-md-4 col-12 text-right company text-light fs-6 fw-normal text-capitalize">
              <p>
                ecommerce site by{" "}
                <Link to="" className="text-decoration-none">
                  <img
                    src="/images/hp_footer_cumulus_logo.png"
                    alt="Cumulus retail logo"
                    className="img-fluid"
                  />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
