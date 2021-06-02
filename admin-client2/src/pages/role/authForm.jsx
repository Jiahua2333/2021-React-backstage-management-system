import React, { Component } from "react";
import PropTypes from "prop-types";

import { Input, Tree, Form } from "antd";

import menuList from "../../config/menuConfig";

const Item = Form.Item;
// const { TreeNode } = Tree;

class AuthForm extends Component {
  constructor(props) {
    super(props);
    const { menus } = this.props.role;
    this.state = {
      checkedKeys: menus,
    };
  }

  getTreeNodes = () => {
    this.treeData = [
      {
        title: "The Authrization",
        key: "all",
      },
    ];
    this.treeData[0].children = menuList;
  };

  getMenus = () => this.state.checkedKeys;

  onCheck = (checkedKeys) => {
    this.setState({ checkedKeys });
  };

  UNSAFE_componentWillMount() {
    this.treeNodes = this.getTreeNodes();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log("componentWillReceiveProps()", nextProps);
    const menus = nextProps.role.menus;
    this.setState({
      checkedKeys: menus,
    });
    // this.state.checkedKeys = menus
  }

  render() {
    const { role } = this.props;
    const { checkedKeys } = this.state;
    // console.log(checkedKeys, role);
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div>
        <Item label="Role Name: " {...formItemLayout}>
          <Input value={role.name} disabled />
        </Item>
        {/* <Tree
          checkable
          defaultExpandAll={true}
          //   checkedKeys={checkedKeys}
          onCheck={this.onCheck}
        >
          <TreeNode title="The Authrization" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree> */}

        <Tree
          checkable
          defaultExpandAll={true}
          checkedKeys={checkedKeys}
          onCheck={this.onCheck}
          treeData={this.treeData}
        />
      </div>
    );
  }
}

AuthForm.prototypes = {
  role: PropTypes.object,
};

export default AuthForm;
