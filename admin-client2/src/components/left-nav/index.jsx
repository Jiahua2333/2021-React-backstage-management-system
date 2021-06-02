import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Menu } from "antd";

import menuList from "../../config/menuConfig";
import logo from "../../assets/images/logo.png";

import "./index.less";
import { setHeadTitle } from "../../redux/actions";

const { SubMenu } = Menu;

class LeftNav extends Component {
  hasAuth = (item) => {
    const key = item.key;
    const menuSet = this.menuSet;

    if (
      item.isPublic ||
      this.props.user.username === "admin" ||
      menuSet.has(key)
    ) {
      return true;
    } else if (item.children) {
      return !!item.children.find((child) => menuSet.has(child.key));
    }

    return false;
  };

  getMenu = (menuList) => {
    const path = this.props.location.pathname;

    return menuList.map((item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          if (item.key === path || path.indexOf(item.key) === 0) {
            this.props.setHeadTitle(item.title);
          }

          return (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link
                to={item.key}
                onClick={() => this.props.setHeadTitle(item.title)}
              >
                {item.title}
              </Link>
            </Menu.Item>
          );
        } else {
          if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
            this.openKey = item.key;
          }
          return (
            <SubMenu key={item.key} icon={item.icon} title={item.title}>
              {this.getMenu(item.children)};
            </SubMenu>
          );
        }
      } else {
        return null;
      }
    });
  };

  UNSAFE_componentWillMount() {
    this.menuSet = new Set(this.props.user.role.menus || []);
    this.menuNodes = this.getMenu(menuList);
  }

  render() {
    let selectKey = this.props.location.pathname;
    // console.log(selectKey);
    if (selectKey.indexOf("/product") === 0) {
      selectKey = "/product";
    }
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>ReactJS Client Admin</h1>
        </Link>

        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { setHeadTitle })(
  withRouter(LeftNav)
);
