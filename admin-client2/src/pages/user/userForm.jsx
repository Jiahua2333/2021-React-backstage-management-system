import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import { Form, Input, Select } from "antd";

const Item = Form.Item;
const Option = Select.Option;

class UserForm extends PureComponent {
  formRef = React.createRef();

  componentDidUpdate() {
    this.formRef.current.resetFields();
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
    };

    const { roles, user } = this.props;

    return (
      <Form ref={this.formRef} {...formItemLayout}>
        <Item label="User Name: " name="username" initialValue={user.username}>
          <Input placeholder="Enter username" />
        </Item>
        {!user._id ? (
          <Item label="Password: " name="password" initialValue="">
            <Input placeholder="Enter password" />
          </Item>
        ) : null}
        <Item label="Phone: " name="phone" initialValue={user.phone}>
          <Input placeholder="Enter phone number" />
        </Item>
        <Item label="E-mail: " name="email" initialValue={user.email}>
          <Input placeholder="Enter email" />
        </Item>
        <Item label="Role: " name="role_id" initialValue={user.role_id}>
          <Select placeholder="Select Role" style={{ width: 200 }}>
            {roles.map((role) => (
              <Option value={role._id} key={role._id}>
                {role.name}
              </Option>
            ))}
          </Select>
        </Item>
      </Form>
    );
  }
}

UserForm.propTypes = {
  roles: PropTypes.array,
  user: PropTypes.object,
};

export default UserForm;
