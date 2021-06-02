import React, { Component } from "react";

import { Card, Table, Button, Modal, message } from "antd";

import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from "../../api";
import { formateDate } from "../../utils/dateUtils";
import { PAGE_SIZE } from "../../utils/constants";
import LinkButton from "../../components/link-button";
import UserForm from "./userForm";

class User extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.state = {
      isShow: false,
      users: [],
      roles: [],
      loading: false,
    };
  }

  initColumns = () => {
    this.columns = [
      {
        title: "User Name",
        dataIndex: "username",
      },
      {
        title: "E-mail",
        dataIndex: "email",
      },
      {
        title: "Phone",
        dataIndex: "phone",
      },
      {
        title: "Create Time",
        dataIndex: "create_time",
        render: formateDate,
      },
      {
        title: "Role",
        dataIndex: "role_id",
        render: (role_id) => this.roleNames[role_id],
      },
      {
        title: "Operartion",
        render: (user) => (
          <span>
            <LinkButton onClick={() => this.showUpdateUser(user)}>
              Update
            </LinkButton>{" "}
            &nbsp; &nbsp;
            <LinkButton onClick={() => this.clickDelete(user)}>
              Delete
            </LinkButton>
          </span>
        ),
      },
    ];
  };

  initRoleNames = (roles) => {
    this.roleNames = roles.reduce((pre, role) => {
      pre[role._id] = role.name;
      return pre;
    }, {});
  };

  getUsers = async () => {
    this.setState({ loading: true });
    const result = await reqUsers();
    this.setState({ loading: false });
    if (result.status === 0) {
      const { users, roles } = result.data;

      this.initRoleNames(roles);
      this.setState({ users: users, roles: roles });
    } else {
      message.error("Fail to get user list");
    }
  };

  AddOrUpdateUser = () => {
    this.formRef.current.formRef.current
      .validateFields()
      .then(async (values, err) => {
        if (!err) {
          this.setState({ isShow: false, loading: true });

          let user = values;

          if (this.user) {
            user._id = this.user._id;
          }

          const result = await reqAddOrUpdateUser(user);

          this.setState({ loading: false });

          if (result.status === 0) {
            this.getUsers();
          } else {
            message.error("Fail to update or add user");
          }
        }
      });
  };

  showAddUser = () => {
    this.user = null;
    this.setState({ isShow: true });
  };

  showUpdateUser = (user) => {
    this.user = user;
    this.setState({ isShow: true });
  };

  clickDelete = (user) => {
    Modal.confirm({
      content: `Do you want to delete user: ${user.username}`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id);
        if (result.status === 0) {
          message.success("Deleted");
          this.getUsers();
        } else {
          message.error("Fail to delete user");
        }
      },
    });
  };

  UNSAFE_componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    const { isShow, users, roles, loading } = this.state;

    const user = this.user || {};

    const title = (
      <Button type="primary" onClick={this.showAddUser}>
        Create User
      </Button>
    );

    return (
      <Card title={title}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={users}
          columns={this.columns}
          pagination={{ defaultPageSize: PAGE_SIZE, showQuickJumper: true }}
        />

        <Modal
          title={user._id ? "Update User" : "Add User"}
          visible={isShow}
          onOk={this.AddOrUpdateUser}
          onCancel={() => this.setState({ isShow: false })}
        >
          <UserForm ref={this.formRef} roles={roles} user={user} />
        </Modal>
      </Card>
    );
  }
}

export default User;
