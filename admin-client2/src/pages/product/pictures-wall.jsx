import React, { Component } from "react";
import PropTypes from "prop-types";

import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { reqDeleteImg } from "../../api";
import { BASE_IMG_URL } from "../../utils/constants";

class PicturesWall extends Component {
  constructor(props) {
    super(props);

    let fileList = [];
    const { imgs } = this.props;

    if (imgs && imgs.length > 0) {
      fileList = imgs.map((img, index) => ({
        uid: -index,
        name: img,
        status: "done",
        url: BASE_IMG_URL + img,
      }));
    }

    this.state = {
      previewVisible: false,
      previewImage: "",
      fileList: fileList,
    };
  }

  getImgs = () => this.state.fileList.map((file) => file.name);

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = async ({ file, fileList }) => {
    if (file.status === "done") {
      const result = file.response;
      if (result.status === 0) {
        message.success("Uploaded");
        const { name, url } = result.data;
        file = fileList[fileList.length - 1];
        file.name = name;
        file.url = url;
      } else {
        message.error("Fail to upload");
      }
    } else if (file.status === "removed") {
      const result = await reqDeleteImg(file.name);
      if (result.status === 0) {
        message.success("Deleted");
      } else {
        message.error("Fail to delete");
      }
    }

    this.setState({ fileList });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="image"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </>
    );
  }
}

PicturesWall.prototypes = {
  imgs: PropTypes.array.isRequired,
};

export default PicturesWall;
