import React from 'react'
import { taxonomy } from '../Data'
import * as methods from '../Functions'

const HeaderContent = () => {
  let topMessage = 'Content Goes Here If Any'
  let logo = 'images/logo.png'
  let cartValue = 2

  let middle = {
    sitelogo: logo,
    cartItems: cartValue,
  }

  return (
    <React.Fragment>
      <header className="bg-dark">
        <DropDownCart />
        <HeaderTop topMessage={topMessage} />
        <HeaderMiddle middle={middle} />
        <HeaderNav />
      </header>
    </React.Fragment>
  )
}

// Drop Down Cart Component
const DropDownCart = () => {
  return (
    <>
      <div id="cartDrpDown" className="collapse">
        <div className="cart-content">
          <span className="items"><em>(3)</em> items</span>
          <div className="cart-body">
            <div id="cartCarousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner">
                <div className="carousel-item">
                  <div className="row">
                    <div className="cart-image col">
                      <img
                        src="images/hp_product_img_m.jpg"
                        alt="cart product image"
                      />
                    </div>
                    <div className="cart-item col">
                      <span className="cart-name">bogs</span>
                      <span className="cart-desc">woemn's crandall tall wool boot</span>
                      <span className="cart-price">$160.00</span>
                      <span className="cart-quantity">quantity: 1</span>
                    </div>
                  </div>
                </div>
                <div className="carousel-item active">
                  <div className="row">
                    <div className="cart-image col">
                      <img
                        src="images/hp_product_img_m.jpg"
                        alt="cart product image"
                      />
                    </div>
                    <div className="cart-item col">
                      <span className="cart-name">bogs</span>
                      <span className="cart-desc">woemn's crandall tall wool boot</span>
                      <span className="cart-price">$160.00</span>
                      <span className="cart-quantity">quantity: 1</span>
                    </div>
                  </div>
                </div>
              </div>
              <a
                className="left carousel-control-prev prev-caret"
                href="##cartCarousel"
                data-slide="prev"
              ><span className="prev-banner"></span
              ></a>
              <a
                className="right carousel-control-next next-caret"
                href="##cartCarousel"
                data-slide="next"
              ><span className="next-banner"></span
              ></a>
              <span className="slide-count">1 of 1</span>
            </div>
          </div>
          <div className="cart-footer">
            <div className="row no-gutters">
              <div className="col-12">
                <span className="line float-left"></span>
                <span className="subtotal-text">Subtotal</span>
                <span className="subtotal-amount float-right">$136.97</span>
                <span className="line float-left"></span>
              </div>
              <div className="col-12">
                <a href="##" className="checkout-cart">checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Header Top Component
const HeaderTop = (props) => {
  return (
    <div id="top" className="w-100 mx-auto">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-12 col-md-12 col-sm-12 col-12 one  justify-content-center align-self-center text-right text-light text-capitalize">
            <p>{props.topMessage}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Header Middle Component
const HeaderMiddle = (props) => {
  return (
    <>
      <div id="middle">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-3 col-md-4 col-sm-12 col-12 logo justify-content-start align-self-center"
            >
              <a href="##"
              ><img src={props.middle.sitelogo} alt="site logo" className="img-fluid w-100"
                /></a>
            </div>
            <div
              className="col-lg-6 col-md-4 col-sm-8 col-7 search justify-content-center align-self-center text-center position-relative"
            >
              <input
                type="text"
                placeholder="search"
                className="w-100 border-0 outline-none outine-0 text-capitalize py-2 pl-2"
              />
              <button
                className="bg-transparent p-0 outline-0 outline-none border-0 position-absolute top-50 right-0 pr-3"
              >
                <i className="fas fa-search text-light"></i>
              </button>
            </div>
            <div
              className="col-lg-3 col-md-4 col-sm-4 col-5 profile justify-content-end align-self-center text-right text-light"
            >
              <a href="##" className="text-light text-decoration-none text-capitalize"
              ><i className="fas fa-user pr-2"></i>log in</a
              >
              <a
                href="##"
                className="text-light text-decoration-none text-capitalize"
                id="header-cart"
                data-toggle="collapse"
                data-target="##cartDrpDown"
                aria-controls="cartDrpDown"
                aria-expanded="false"
              ><i className="fas fa-shopping-cart pr-2"></i>cart<span
                className="text-danger"
              >({props.middle.cartItems})</span
                ></a
              >
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Header Nav Component
const HeaderNav = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark static-top'>
        <div className='container p-0'>
          <button
            className='navbar-toggler'
            type='button'
            data-toggle='collapse'
            data-target='#navbarResponsive'
            aria-controls='navbarResponsive'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarResponsive'>
            <ul className='navbar-nav ml-auto d-flex w-100 justify-content-between'>
              {methods.getTaxonomy().map((dept) => {
                return (
                  <li className='nav-item active'>
                    <i className='fas fa-angle-down down d-lg-none d-md-block d-sm-block'></i>
                    <a
                      className='nav-link text-uppercase text-light '
                      href='#'
                      type='button'
                      id='dropdownMenu2'
                      data-toggle='dropdown'
                      aria-expanded='false'
                    >
                      {dept}
                    </a>

                    <div
                      className='dropdown-menu position-absolute w-100 rounded-0'
                      aria-labelledby='dropdownMenu2'
                    >
                      <div className='container'>
                        <div className='row'>
                          {methods.getTaxonomy(dept).map((typ) => {
                            return (
                              <div className='col-lg-3 col-md-12 col-12 first m-2'>
                                <a
                                  href='##'
                                  className='title d-block text-dark text-decoration-none text-capitalize  mb-1 border-bottom border-dark'
                                >
                                  {typ}
                                </a>
                                <i
                                  className='fas fa-angle-down d-none'
                                  data-toggle='collapse'
                                  data-target='##accordone1'
                                  aria-expanded='false'
                                ></i>
                                <div id='accordone1' className='collapse show'>
                                  {methods
                                    .getTaxonomy(dept, typ)
                                    .map((subTyp_1) => {
                                      return (
                                        <a
                                          href='##'
                                          className='d-block text-dark text-decoration-none text-capitalize mb-1'
                                        >
                                          {subTyp_1}
                                        </a>
                                      )
                                    })}
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}
export default HeaderContent
