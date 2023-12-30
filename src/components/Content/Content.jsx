import React from "react";
import s from "./Content.module.scss";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Dashboard/Dashboard";
import Categories from "../../Categories/Categories";

const Content = () => {
  return (
    <div className={s.container}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
      </Routes>
    </div>
  );
};

export default Content;
