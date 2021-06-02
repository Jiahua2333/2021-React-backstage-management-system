import React, { Component } from "react";

import { Card, Table, Button, message, Modal } from "antd";
import { PlusOutlined, ArrowRightOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqCategories, reqAddCategory, reqUpdateCategory } from "../../api";
import AddForm from "./addForm";
import UpdateForm from "./updateForm";

class Category extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      subCategories: [],
      parentId: "0",
      parentName: "",
      loading: false,
      showStatus: 0,
    };
  }

  formRef = React.createRef();

  initColumns = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Operations",
        width: 300,
        render: (category) => (
          <span>
            <LinkButton onClick={() => this.showUpdateModal(category)}>
              Update
            </LinkButton>
            {this.state.parentId === "0" ? (
              <LinkButton
                onClick={() => {
                  this.showSubCategories(category);
                }}
              >
                Details
              </LinkButton>
            ) : null}
          </span>
        ),
      },
    ];
  };

  getCategories = async (parentId) => {
    this.setState({
      loading: true,
    });
    parentId = parentId || this.state.parentId;
    const result = await reqCategories(parentId);
    this.setState({
      loading: false,
    });
    // console.log(result);
    if (result.status === 0) {
      const categories = result.data;
      if (parentId === "0") {
        this.setState({
          categories: categories,
        });
      } else {
        this.setState({
          subCategories: categories,
        });
      }
    } else {
      message.error("Fail to load the table");
    }
  };

  addCategory = async () => {
    this.formRef.current.formRef.current
      .validateFields()
      .then(async (values, err) => {
        if (!err) {
          const { categoryName, parentId } = values;

          this.setState({
            showStatus: 0,
          });
          this.formRef.current.formRef.current.resetFields();
          const result = await reqAddCategory({ parentId, categoryName });
          // console.log(result);
          if (result.status === 0) {
            if (parentId === this.state.parentId) {
              this.getCategories();
              message.success("Added items or subjects");
            } else if (parentId === "0") {
              this.getCategories(parentId);
              message.success("Added to Subjects");
            }
          } else {
            message.error("Fail to add item or subjects");
          }
        }
      });

    // const {
    //   categoryName,
    //   parentId,
    // } = this.formRef.current.formRef.current.getFieldsValue();

    // this.setState({
    //   showStatus: 0,
    // });
    // this.formRef.current.formRef.current.resetFields();
    // const result = await reqAddCategory({ parentId, categoryName });
    // // console.log(result);
    // if (result.status === 0) {
    //   if (parentId === this.state.parentId) {
    //     this.getCategories();
    //     message.success("Added items or subjects");
    //   } else if (parentId === "0") {
    //     this.getCategories(parentId);
    //     message.success("Added to Subjects");
    //   }
    // } else {
    //   message.error("Fail to add item or subjects");
    // }
  };

  updateCategory = () => {
    this.formRef.current.formRef.current
      .validateFields()
      .then(async (values, err) => {
        console.log(values, err);
        if (!err) {
          const categoryId = this.category._id;
          // const {
          //   categoryName,
          // } = this.formRef.current.formRef.current.getFieldsValue();
          const { categoryName } = values;
          this.setState({
            showStatus: 0,
          });

          // this.formRef.current.formRef.current.resetFields();

          const result = await reqUpdateCategory({ categoryId, categoryName });
          if (result.status === 0) {
            this.getCategories();
            message.success("Updated");
          } else {
            message.error("Fail to update");
          }
        }
      });
  };

  handleCancle = () => {
    this.setState({
      showStatus: 0,
    });
  };

  showAddModal = () => {
    this.setState({
      showStatus: 1,
    });
  };

  showUpdateModal = (category) => {
    this.category = category;
    this.setState({
      showStatus: 2,
    });
  };

  showSubCategories = (category) => {
    this.setState(
      {
        parentId: category._id,
        parentName: category.name,
      },
      () => {
        this.getCategories();
      }
    );
  };

  showCategories = () => {
    this.setState({
      parentId: "0",
      parentName: "",
      subCategories: [],
    });
  };

  UNSAFE_componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getCategories();
  }

  render() {
    const {
      categories,
      loading,
      parentId,
      subCategories,
      parentName,
      showStatus,
    } = this.state;

    const category = this.category || "";

    const title =
      parentId === "0" ? (
        "Home"
      ) : (
        <span>
          <LinkButton onClick={this.showCategories}>Home</LinkButton>
          <ArrowRightOutlined />
          <span style={{ marginLeft: 5 }}>{parentName}</span>
        </span>
      );
    const extra = (
      <Button type="primary" onClick={this.showAddModal}>
        <PlusOutlined />
        Add
      </Button>
    );

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          rowKey="_id"
          loading={loading}
          dataSource={parentId === "0" ? categories : subCategories}
          columns={this.columns}
          pagination={{ defaultPageSize: 5, showQuickJumper: true }}
        />
        <Modal
          title="Add item"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancle}
        >
          <AddForm
            categories={categories}
            parentId={parentId}
            ref={this.formRef}
          />
        </Modal>

        <Modal
          title="Update item"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancle}
        >
          <UpdateForm categoryName={category.name} ref={this.formRef} />
        </Modal>
      </Card>
    );
  }
}

export default Category;
