import {
  HomeOutlined,
  ShopOutlined,
  ToolOutlined,
  UserAddOutlined,
  CheckCircleOutlined,
  // PieChartFilled,
  MenuUnfoldOutlined,
  // PieChartOutlined,
  // BarChartOutlined,
  // LineChartOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Home", // 菜单标题名称
    key: "/home", // 对应的 path
    icon: <HomeOutlined />, // 图标名称
    isPublic: true,
  },
  {
    title: "Merchandise",
    key: "/products",
    icon: <ShopOutlined />,
    children: [
      // 子菜单列表
      {
        title: "Category",
        key: "/category",
        icon: <MenuUnfoldOutlined />,
      },
      {
        title: "Product",
        key: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: "User Management",
    key: "/user",
    icon: <UserAddOutlined />,
  },
  {
    title: "Role Management",
    key: "/role",
    icon: <CheckCircleOutlined />,
  },
  // {
  //   title: "Charts",
  //   key: "/charts",
  //   icon: <PieChartFilled />,
  //   children: [
  //     {
  //       title: "Bar Chart",
  //       key: "/charts/bar",
  //       icon: <BarChartOutlined />,
  //     },
  //     {
  //       title: "Line Chart",
  //       key: "/charts/line",
  //       icon: <LineChartOutlined />,
  //     },
  //     {
  //       title: "Pie Chart",
  //       key: "/charts/pie",
  //       icon: <PieChartOutlined />,
  //     },
  //   ],
  // },
];
export default menuList;
