import React from "react";
import { useParams } from "react-router";

export default function Cms() {
  let url = "";
  const params = useParams();
  if (params) {
    url = params.url;
  }
  let name = url.replace("-", " ");
  return (
    <>
      <section id="contentHolder" className="container-fluid">
        <h1>
          <strong>{name}</strong>
        </h1>
        <p>coming soon</p>
      </section>
    </>
  );
}
