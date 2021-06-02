import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, Table, Button, Modal, message } from "antd";

import { PAGE_SIZE } from "../../utils/constants";
import { formateDate } from "../../utils/dateUtils";
import { reqRoles, reqAddRole, reqUpdateRole } from "../../api";
import AddForm from "./addForm";
import AuthForm from "./authForm";
import { logout } from "../../redux/actions";

class Role extends Component {
  formRef = React.createRef();
  authRef = React.createRef();
  state = {
    roles: [],
    role: {},
    loading: false,
    isShowAdd: false,
    isShowAuth: false,
  };

  initColumns = () => {
    this.columns = [
      {
        title: "Role Name",
        dataIndex: "name",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: formateDate,
      },
      {
        title: "Auth Time",
        dataIndex: "auth_time",
        render: formateDate,
      },
      {
        title: "Authorizer",
        dataIndex: "auth_name",
      },
    ];
  };

  onRow = (role) => {
    return {
      onClick: (event) => {
        // console.log(role);
        this.setState({ role });
      },
    };
  };

  getRoles = async () => {
    this.setState({ loading: true });

    const result = await reqRoles();

    if (result.status === 0) {
      const roles = result.data;
      message.success("Loaded the roles");
      this.setState({
        loading: false,
        roles,
      });
    } else {
      message.error("Fail to load roles");
    }
  };

  addRole = () => {
    this.formRef.current.formRef.current
      .validateFields()
      .then(async (values, err) => {
        if (!err) {
          this.setState({ isShowAdd: false });

          const { roleName } = values;

          const result = await reqAddRole(roleName);

          if (result.status === 0) {
            message.success("Created");
            const role = result.data;
            this.setState({
              roles: [...this.state.roles, role],
            });
          } else {
            message.error("Fail to Create");
          }
        }
      });
  };

  upateRole = async () => {
    this.setState({ isShowAuth: false });

    const role = this.state.role;

    const menus = this.authRef.current.getMenus();

    role.menus = menus;
    role.auth_time = Date.now();
    role.auth_name = this.props.user.username;

    const result = await reqUpdateRole(role);

    if (result.status === 0) {
      if (role._id === this.props.user.role_id) {
        this.props.logout();
        message.success("Success Auth current role");
      } else {
        message.success("Success Auth");
        this.setState({ roles: [...this.state.roles] });
      }

      // message.success("Updated role");
      // this.setState({ role: [this.state.roles] });
    } else {
      message.error("Fail to update role");
    }
  };

  UNSAFE_componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getRoles();
  }

  render() {
    const { roles, loading, role, isShowAdd, isShowAuth } = this.state;

    const title = (
      <span>
        <Button
          type="primary"
          onClick={() => this.setState({ isShowAdd: true })}
        >
          Create Role
        </Button>{" "}
        &nbsp; &nbsp;
        <Button
          type="primary"
          disabled={!role._id}
          onClick={() => this.setState({ isShowAuth: true })}
        >
          Set Authorization
        </Button>
      </span>
    );
    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={roles}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE }}
          rowSelection={{
            type: "radio",
            selectedRowKeys: [role._id],
            onSelect: (role) => {
              this.setState({ role });
            },
          }}
          onRow={this.onRow}
        />

        <Modal
          title="Add Role"
          visible={isShowAdd}
          onOk={this.updateRole}
          onCancel={() => this.setState({ isShowAdd: false })}
        >
          <AddForm ref={this.formRef} />
        </Modal>

        <Modal
          title="Set Authrization"
          visible={isShowAuth}
          onOk={this.upateRole}
          onCancel={() => this.setState({ isShowAuth: false })}
        >
          <AuthForm role={role} ref={this.authRef} />
        </Modal>
      </Card>
    );
  }
}

export default connect((state) => ({ user: state.user }), { logout })(Role);
