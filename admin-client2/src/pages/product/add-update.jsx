import React, { Component } from "react";

import { Card, Form, Input, Cascader, Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqCategories, reqAddOrUpdateProduct } from "../../api";
import PicturesWall from "./pictures-wall";
import RichTextEditor from "./rich-text-editor";

const TextArea = Input.TextArea;
const Item = Form.Item;

class ProductAddUpdate extends Component {
  constructor(props) {
    super(props);

    this.picWallRef = React.createRef();
    this.formRef = React.createRef();
    this.editorRef = React.createRef();
    this.state = {
      options: [],
    };
  }

  initOptions = async (categories) => {
    const options = categories.map((category) => ({
      value: category._id,
      label: category.name,
      isLeaf: false,
    }));

    const { isUpdate, product } = this;
    const { pCategoryId } = product;

    if (pCategoryId !== "0" && isUpdate) {
      const subCategories = await this.getCategories(pCategoryId);

      const childOption = subCategories.map((subCategory) => ({
        value: subCategory._id,
        label: subCategory.name,
        isLeaf: true,
      }));

      const targeOption = options.find(
        (option) => option.value === pCategoryId
      );
      targeOption.children = childOption;
    }

    this.setState({ options });
  };

  getCategories = async (parentId) => {
    const result = await reqCategories(parentId);
    if (result.status === 0) {
      const categories = result.data;

      if (parentId === "0") {
        this.initOptions(categories);
      } else {
        return categories;
      }
    }
  };

  loadData = async (selectedOptions) => {
    const targetOption = selectedOptions[0];
    targetOption.loading = true;

    const subCategories = await this.getCategories(targetOption.value);

    if (subCategories && subCategories.length > 0) {
      const childOptions = subCategories.map((subCategory) => ({
        value: subCategory._id,
        label: subCategory.name,
        isLeaf: true,
      }));

      targetOption.children = childOptions;
    } else {
      targetOption.isLeaf = true;
    }

    targetOption.loading = false;

    this.setState({ options: [...this.state.options] });
  };

  validatePrice = (rule, value) => {
    if (value * 1 > 0) {
      return Promise.resolve();
    } else {
      return Promise.reject("Price must be greeter than 0");
    }
  };

  submit = () => {
    this.formRef.current.validateFields().then(async (values, err) => {
      if (!err) {
        // console.log(values);
        const { name, desc, price, categoryIds } = values;
        let pCategoryId, categoryId;
        if (categoryIds.length === 1) {
          pCategoryId = "0";
          categoryId = categoryIds[0];
        } else {
          pCategoryId = categoryIds[0];
          categoryId = categoryIds[1];
        }
        const imgs = this.picWallRef.current.getImgs();
        const detail = this.editorRef.current.getDetail();

        let product = {
          name,
          desc,
          price,
          imgs,
          detail,
          categoryId,
          pCategoryId,
        };

        if (this.isUpdate) {
          product._id = this.product._id;
        }

        const result = await reqAddOrUpdateProduct(product);

        if (result.status === 0) {
          message.success(`${this.isUpdate}` ? "Updated" : "Added");
          this.props.history.goBack();
        } else {
          message.error(`${this.isUpdate}` ? "Fail to updated" : "Fail to add");
        }

        console.log(product);
        alert("sent ajax request");
      }
    });
  };

  componentDidMount() {
    this.getCategories("0");
  }

  UNSAFE_componentWillMount() {
    const product = this.props.location.state;
    this.isUpdate = !!product;
    this.product = product || {};
  }

  render() {
    const { isUpdate, product } = this;
    const { pCategoryId, categoryId, imgs, detail } = product;

    const categoryIds = [];
    if (isUpdate) {
      if (pCategoryId === "0") {
        categoryIds.push(categoryId);
      } else {
        categoryIds.push(pCategoryId);
        categoryIds.push(categoryId);
      }
    }

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 9 },
    };

    const title = (
      <span>
        <LinkButton onClick={() => this.props.history.goBack()}>
          <ArrowLeftOutlined style={{ fontSize: 20 }} />
        </LinkButton>
        <span>{isUpdate ? "Update Product" : "Add Product"}</span>
      </span>
    );

    return (
      <Card title={title}>
        <Form {...formItemLayout} ref={this.formRef}>
          <Item
            label="Product Name: "
            name="name"
            initialValue={product.name}
            rules={[{ required: true, message: "Product Name is Empty" }]}
          >
            <Input placeholder="Please Enter the Product Name" />
          </Item>
          <Item
            label="Product Description: "
            name="desc"
            initialValue={product.desc}
            rules={[{ required: true, message: "Product Desciption is Empty" }]}
          >
            <TextArea
              placeholder="Please Enter the Product Description"
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Item>
          <Item
            label="Product Price: "
            name="price"
            initialValue={product.price}
            rules={[
              { required: true, message: "Product Price is Empty" },
              { validator: this.validatePrice },
            ]}
          >
            <Input
              type="number"
              placeholder="Please Enter the Product Price"
              addonAfter="$"
            />
          </Item>
          <Item
            label="Product Category"
            name="categoryIds"
            initialValue={categoryIds}
            rules={[{ required: true, message: "Product Category is Empty" }]}
          >
            <Cascader
              changeOnSelect
              options={this.state.options}
              loadData={this.loadData}
            />
          </Item>
          <Item label="Product Pictures">
            <PicturesWall ref={this.picWallRef} imgs={imgs} />
          </Item>
          <Item
            label="Product Detail"
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 18 }}
          >
            <RichTextEditor ref={this.editorRef} detail={detail} />
          </Item>
          <Item>
            <Button type="primary" onClick={this.submit}>
              Submit
            </Button>
          </Item>
        </Form>
      </Card>
    );
  }
}

export default ProductAddUpdate;
