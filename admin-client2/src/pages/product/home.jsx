import React, { Component } from "react";

import { Select, Input, Button, Card, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import LinkButton from "../../components/link-button";
import { reqProducts, reqSearchProducts, reqUpdateStatus } from "../../api";
import { PAGE_SIZE } from "../../utils/constants";

const Option = Select.Option;

class ProductHome extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      total: 0,
      loading: false,
      searchName: "",
      searchType: "productName",
    };
  }

  initColumns = () => {
    this.columns = [
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Description",
        dataIndex: "desc",
      },
      {
        width: 100,
        title: "Price",
        dataIndex: "price",
        render: (price) => {
          // console.log(price)
          return "￥" + price;
        },
      },
      {
        width: 100,
        title: "Status",
        render: (product) => {
          const { status, _id } = product;
          return (
            <span>
              <div>
                <Button
                  type="primary"
                  onClick={() => this.updateStatus(_id, status === 1 ? 2 : 1)}
                >
                  {status === 1 ? "Sold out" : "Selling"}
                </Button>
              </div>
              <div>{status === 1 ? "On Sale" : "Sold out"}</div>
            </span>
          );
        },
      },
      {
        width: 100,
        title: "Operations",
        render: (product) => {
          return (
            <span>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/detail", { product })
                }
              >
                Details
              </LinkButton>
              <LinkButton
                onClick={() =>
                  this.props.history.push("/product/addupdate", product)
                }
              >
                Update
              </LinkButton>
            </span>
          );
        },
      },
    ];
  };

  getProducts = async (pageNum, pageSize = PAGE_SIZE) => {
    this.pageNum = pageNum;

    this.setState({ loading: true });

    const { searchType, searchName } = this.state;
    let result;
    if (searchName) {
      result = await reqSearchProducts({
        pageNum,
        pageSize,
        searchType,
        searchName,
      });
    } else {
      result = await reqProducts(pageNum, pageSize);
    }

    this.setState({ loading: false });

    // console.log(result);
    if (result.status === 0) {
      const { total, list } = result.data;

      this.setState({
        total: total,
        products: list,
      });
    }
  };

  updateStatus = async (productId, status) => {
    // console.log(productId, status);
    const result = await reqUpdateStatus({ productId, status });

    if (result.status === 0) {
      message.success("Updated status");
      this.getProducts(this.pageNum);
    } else {
      message.error("Fail to update");
    }
  };

  UNSAFE_componentWillMount() {
    this.initColumns();
  }

  componentDidMount() {
    this.getProducts(1);
  }

  render() {
    const { products, total, loading, searchType, searchName } = this.state;

    const title = (
      <div>
        <Select
          value={searchType}
          style={{ width: 200 }}
          onChange={(value) => this.setState({ searchType: value })}
        >
          <Option value="productName">Search for Name</Option>
          <Option value="productDesc">Search for Description</Option>
        </Select>
        <Input
          placeholder="Key Word"
          style={{ width: 120, margin: "0 15px" }}
          value={searchName}
          onChange={(event) =>
            this.setState({ searchName: event.target.value })
          }
        />
        <Button type="primary" onClick={() => this.getProducts(1)}>
          Search
        </Button>
      </div>
    );

    const extra = (
      <Button
        type="primary"
        onClick={() => this.props.history.push("/product/addupdate")}
      >
        <PlusOutlined />
        Add Product
      </Button>
    );

    // console.log(products, total);

    return (
      <Card title={title} extra={extra}>
        <Table
          bordered
          loading={loading}
          rowKey="_id"
          dataSource={products}
          columns={this.columns}
          pagination={{
            current: this.pageNum,
            defaultPageSize: PAGE_SIZE,
            total: total,
            showQuickJumper: true,
            onChange: this.getProducts,
          }}
        />
      </Card>
    );
  }
}

export default ProductHome;
