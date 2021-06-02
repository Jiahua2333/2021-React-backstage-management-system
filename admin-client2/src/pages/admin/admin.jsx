import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { Layout } from "antd";

import Header from "../../components/header";
import LeftNav from "../../components/left-nav";
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar";
import Line from "../charts/line";
import Pie from "../charts/pie";
import NotFound from "../404/404";

const { Footer, Sider, Content } = Layout;

class Admin extends Component {
  render() {
    const user = this.props.user;
    if (!user || !user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ minHeight: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header />
          <Content style={{ backgroundColor: "white", margin: "20px" }}>
            <Switch>
              <Redirect from="/" to="/home" exact />
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/line" component={Line} />
              <Route path="/charts/pie" component={Pie} />
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaaaaa" }}>
            Made by Jiahua Liao
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect((state) => ({ user: state.user }), {})(Admin);
