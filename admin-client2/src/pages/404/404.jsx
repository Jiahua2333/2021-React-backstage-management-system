import React, { Component } from "react";
import { Button, Row, Col } from "antd";
import { connect } from "react-redux";
import { setHeadTitle } from "../../redux/actions";
import "./404.less";

class NotFound extends Component {
  goHome = () => {
    this.props.setHeadTitle("Home");
    this.props.history.replace("/home");
  };
  render() {
    return (
      <Row className="not-found">
        <Col span={12} className="left"></Col>
        <Col span={12} className="right">
          <h1>404</h1>
          <h2>Sorry, the page is not found</h2>
          <div>
            <Button type="primary" onClick={this.goHome}>
              Back to Home
            </Button>
          </div>
        </Col>
      </Row>
    );
  }
}

export default connect(null, { setHeadTitle })(NotFound);
