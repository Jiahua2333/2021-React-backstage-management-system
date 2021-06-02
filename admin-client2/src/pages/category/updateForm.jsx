import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

const Item = Form.Item;

class UpdateForm extends Component {
  //   UNSAFE_componentWillMount() {
  //     this.props.setForm();
  //   }
  formRef = React.createRef();

  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      categoryName: this.props.categoryName,
    });
  }

  render() {
    const { categoryName } = this.props;
    return (
      <Form ref={this.formRef}>
        <Item
          name="categoryName"
          initialValue={categoryName}
          rules={[{ required: true, message: "Cannot Empty" }]}
        >
          <Input placeholder="Please enter item name" />
        </Item>
      </Form>
    );
  }
}

UpdateForm.prototypes = {
  categoryName: PropTypes.string.isRequired,
};

export default UpdateForm;
