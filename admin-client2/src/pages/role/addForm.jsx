import React, { Component } from "react";

import { Form, Input } from "antd";

const Item = Form.Item;

class AddForm extends Component {
  formRef = React.createRef();

  componentDidUpdate() {
    this.formRef.current.resetFields();
  }
  render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <Form ref={this.formRef} {...formItemLayout}>
        <Item
          name="roleName"
          label="Role Name: "
          rules={[{ required: true, message: "Cannot Empty" }]}
        >
          <Input placeholder="Please enter role name" />
        </Item>
      </Form>
    );
  }
}

export default AddForm;
