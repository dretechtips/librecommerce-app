import React from "react";
import MainPanel from "../components/MainPanel";
import Router from "./Router";

export default () => {
  return (
    <MainPanel routes={Router}/>
  )
}