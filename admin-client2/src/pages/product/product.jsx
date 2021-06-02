import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ProductHome from "./home";
import ProductDetail from "./detail";
import ProductAddUpdate from "./add-update";

import "./product.less";

class Product extends Component {
  render() {
    return (
      <Switch>
        <Route path="/product" component={ProductHome} exact={true} />
        <Route
          path="/product/addupdate"
          component={ProductAddUpdate}
          exact={true}
        />
        <Route path="/product/detail" component={ProductDetail} exact={true} />
        <Redirect to="/product" />
      </Switch>
    );
  }
}

export default Product;
