import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { login } from "../../redux/actions";

import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import logoImg from "../../assets/images/logo.png";
import "./login.less";

const Item = Form.Item;

class Login extends Component {
  login = (values) => {
    // console.log("hello", values);
    const { username, password } = values;

    this.props.login(username, password);

    // const result = await reqLogin(username, password);

    // if (result.status === 0) {
    //   message.success("Login success");
    //   const user = result.data;
    //   memoryUtils.user = user;
    //   storegeUtils.saveUser(user);
    //   this.props.history.replace("/home");
    // } else {
    //   message.error(result.msg);
    // }
    // console.log("Successful", result);
  };

  validatePWD = (rule, value) => {
    // console.log("validatePWD()", rule, value);
    if (!value) {
      return Promise.reject("Password empty");
    } else if (value.length < 4) {
      return Promise.reject("Password length isn't larger than 4");
    } else if (value.length > 12) {
      return Promise.reject("Password length isn't less than 12");
    } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
      return Promise.reject("Only letter, number or underscore ");
    } else {
      return Promise.resolve();
    }
  };

  render() {
    const user = this.props.user;
    if (user && user._id) {
      return <Redirect to="/home" />;
    }

    const errorMsg = this.props.user.errorMsg;
    console.log(errorMsg);

    return (
      <div className="login">
        <header className="login-header">
          <img src={logoImg} alt="logo" />
          <h1>React Project: The System of Administration</h1>
        </header>

        <section className="login-content">
          <div className={user.errorMsg ? "error-msg show" : "error-msg"}>
            {user.errorMsg}
          </div>
          <h3>User Login</h3>
          <Form
            onFinish={(values) => this.login(values)}
            className="login-form"
          >
            <Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  whitespace: true,
                  message: "No whitespace",
                },
                {
                  min: 4,
                  message: ">= 4 characters",
                },
                {
                  max: 12,
                  message: "<= 12 characters",
                },
                {
                  pattern: /^[a-zA-Z0-9_]+$/,
                  message: "Only letter, number or underscore",
                },
              ]}
            >
              <Input
                prefix={
                  <UserOutlined
                    className="site-form-item-icon"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                placeholder="Username"
              />
            </Item>
            <Item name="password" rules={[{ validator: this.validatePWD }]}>
              <Input
                prefix={
                  <LockOutlined
                    className="site-form-item-icon"
                    style={{ color: "rgba(0,0,0,.25)" }}
                  />
                }
                type="password"
                placeholder="Password"
              />
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}

export default connect((state) => ({ user: state.user }), { login })(Login);
