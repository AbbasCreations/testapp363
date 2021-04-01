import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HeaderContent from "./components/Header";
import Category from "./components/Category";
import Product from "./components/Product";
import magiczoomfixer from "./components/magiczoomfixer";
import Cart from "./components/Cart";
import Test from "./components/Test";
import Cms from "./components/info/cms";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Default from "./components/Default";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/css/custom.css";
import "../src/css/owl.carousel.css";
import "../src/css/owl.carousel.min.css";
import "../src/css/owl.theme.default.min.css";

function App() {
  return (
    <>
      <HeaderContent />
      <section id="contentHolder">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/category/:url" component={Category} />
          <Route path="/product/:id/:url" component={Product} />
          <Route path="/cart" component={Cart} />
          <Route path="/info/:url" component={Cms} />
          <Route path="/magiczoomfixer/:id/:url" component={magiczoomfixer} />
          <Route path="/test/:url" component={Test} />
          <Route component={Default} />
        </Switch>
      </section>
      <Footer />
    </>
  );
}

export default App;
