import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Modal } from "antd";

import LinkButton from "../link-button";
import { reqWeather } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import menuList from "../../config/menuConfig";
import { logout } from "../../redux/actions";

import "./index.less";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      systime: formateDate(Date.now()),
      weather: "",
      weatherICon: "",
    };
  }

  getSysTime = () => {
    this.intervalID = setInterval(() => {
      this.setState({
        systime: formateDate(Date.now()),
      });
    }, 1000);
  };

  getWeather = async () => {
    const { current } = await reqWeather("New York");
    // console.log(current);
    this.setState({
      weather: current.condition.text,
      weatherICon: current.condition.icon,
    });
  };

  getTitle = (path) => {
    let title;
    menuList.forEach((menu) => {
      if (menu.key === path) title = menu.title;
      else if (menu.children) {
        const cItem = menu.children.find(
          (cItem) => path.indexOf(cItem.key) === 0
        );
        if (cItem) title = cItem.title;
      }
    });
    return title;
  };

  logout = () => {
    Modal.confirm({
      content: "Do you want to Logout?",
      onOk: () => {
        // storageUtils.removeUser();
        // memoryUtils.user = {};

        // this.props.history.replace("/login");
        this.props.logout();
      },
    });
  };

  componentDidMount() {
    this.getSysTime();
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { systime, weather, weatherICon } = this.state;
    const user = this.props.user;
    // const path = this.props.location.pathname;
    //const title = this.getTitle(path);
    const title = this.props.title;

    return (
      <div className="header">
        <div className="header-top">
          <span>Welcome, {user.username}</span>
          <LinkButton onClick={this.logout}>Logout</LinkButton>
        </div>
        <div className="header-bottom">
          <div className="header-bottom-left">{title}</div>
          <div className="header-bottom-right">
            <span>{systime}</span>
            <img src={weatherICon} alt="weather" />
            <span>{weather}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ title: state.headTitle, user: state.user }),
  { logout }
)(withRouter(Header));
