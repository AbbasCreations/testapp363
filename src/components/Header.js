import React from "react";
import * as hV from "./header/headerViews";
import * as hC from "./header/headerController";
import { useStateValue } from "../StateProvider";

const HeaderContent = () => {
  let topMessage = hC.getHeaderMessage();
  let logo = hC.getSiteLogo();
  let cartValue = 2;
  let middle = {
    sitelogo: logo,
    cartItems: cartValue,
  };

  return (
    <React.Fragment>
      <header className="bg-dark">
        <DropDownCart />
        <HeaderTop topMessage={topMessage} />
        <HeaderMiddle middle={middle} />
        <HeaderNav />
      </header>
    </React.Fragment>
  );
};

// Drop Down Cart Component
const DropDownCart = () => {
  let dropCartContent = hV.GetdropCartViews();
  return dropCartContent;
};

// Header Top Component
const HeaderTop = (props) => {
  let headerTopContent = hV.GetHeaderTopViews(props);
  return headerTopContent;
};

// Header Middle Component
const HeaderMiddle = (props) => {
  let headerMiddleContent = hV.GetHeaderMiddleViews(props);
  return headerMiddleContent;
};

// Header Nav Component
const HeaderNav = () => {
  let headerNavContent = hV.GetHeaderNavViews();
  return headerNavContent;
};
export default HeaderContent;
