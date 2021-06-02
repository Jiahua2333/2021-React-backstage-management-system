import React, { Component } from "react";
import PropTypes from "prop-types";

import { Form, Select, Input } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class AddForm extends Component {
  formRef = React.createRef();

  componentDidUpdate() {
    this.formRef.current.setFieldsValue({
      categories: this.props.categories,
      parentId: this.props.parentId,
    });
  }
  render() {
    const { categories, parentId } = this.props;
    // console.log(categories);
    return (
      <Form ref={this.formRef}>
        <Item name="parentId" initialValue={parentId}>
          <Select>
            <Option key="0" value="0">
              Subjects
            </Option>
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          name="categoryName"
          rules={[{ required: true, message: "Cannot Empty" }]}
        >
          <Input placeholder="Please enter item name" />
        </Item>
      </Form>
    );
  }
}

AddForm.prototypes = {
  categories: PropTypes.array.isRequired,
  parentId: PropTypes.string.isRequired,
};

export default AddForm;
