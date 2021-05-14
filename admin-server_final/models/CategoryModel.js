/*
能操作categorys集合数据的Model
 */
// 1.引入mongoose
const mongoose = require("mongoose");

// 2.字义Schema(描述文档结构)
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: String, required: true, default: "0" },
});

// 3. 定义Model(与集合对应, 可以操作集合)
const CategoryModel = mongoose.model("categorys", categorySchema);

// CategoryModel.findOne({ name: "Pen" }).then((item) => {
//   if (!item) {
//     CategoryModel.create({
//       name: "Pen",
//       parentId: "608b000c1a32f0575ce5e71c",
//     }).then((user) => {
//       console.log("初始分类列表: Pen");
//     });
//     CategoryModel.create({
//       name: "Eraser",
//       parentId: "608b000c1a32f0575ce5e71c",
//     }).then((user) => {
//       console.log("初始分类列表: Eraser");
//     });
//     CategoryModel.create({
//       name: "Marker",
//       parentId: "608b000c1a32f0575ce5e71c",
//     }).then((user) => {
//       console.log("初始分类列表: Marker");
//     });
//   }
// });

// 4. 向外暴露Model
module.exports = CategoryModel;
