import React, { Component } from "react";

import { Card, List } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { reqCategory } from "../../api";
import LinkButton from "../../components/link-button";
import { BASE_IMG_URL } from "../../utils/constants";

const Item = List.Item;

class ProductDetail extends Component {
  constructor() {
    super();
    this.state = {
      subjectName: "",
      itemName: "",
    };
  }

  getClassification = async () => {
    const { pCategoryId, categoryId } = this.props.location.state.product;

    if (pCategoryId === "0") {
      const result = await reqCategory(categoryId);
      const subjectName = result.data.name;
      this.setState({ subjectName });
    } else {
      const results = await Promise.all([
        reqCategory(pCategoryId),
        reqCategory(categoryId),
      ]);
      const subjectName = results[0].data.name;
      const itemName = results[1].data.name;
      this.setState({
        subjectName,
        itemName,
      });
    }
  };

  componentDidMount() {
    this.getClassification();
  }

  render() {
    const { name, desc, price, detail, imgs } =
      this.props.location.state.product;

    const { subjectName, itemName } = this.state;

    const title = (
      <div>
        <LinkButton>
          <ArrowLeftOutlined
            style={{ fontSize: 20 }}
            onClick={() => this.props.history.goBack()}
          />
        </LinkButton>

        <span>Product Detail</span>
      </div>
    );
    return (
      <Card title={title} className="product-detail">
        <List>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">Product Name:</span>
            <span>{name}</span>
          </Item>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">
              Product Description:
            </span>
            <span>{desc}</span>
          </Item>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">Product Price:</span>
            <span>{price}</span>
          </Item>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">
              Product Classification:
            </span>
            <span>
              {subjectName} {itemName ? "-->" + itemName : ""}
            </span>
          </Item>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">Product Images:</span>
            {imgs.map((img) => (
              <img
                key={img}
                className="product-detail-item-img"
                src={BASE_IMG_URL + img}
                alt={img}
              />
            ))}
          </Item>
          <Item className="product-detail-item">
            <span className="product-detail-item-left">Product Details:</span>
            <span
              dangerouslySetInnerHTML={{
                __html: detail,
              }}
            ></span>
          </Item>
        </List>
      </Card>
    );
  }
}

export default ProductDetail;
