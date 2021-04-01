import React from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";

function Magiczoomfixer() {
  let history = useHistory();
  let id = 0;
  let url = "";
  const params = useParams();
  id = params.id;
  url = params.url;
  history.push(/product/ + id + "/" + url);
  return "";
}

export default Magiczoomfixer;
