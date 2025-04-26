// src/components/MainLayout.tsx
import { Layout, Menu, Grid } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;

const MainLayout = () => {
  const location = useLocation();
  const screens = useBreakpoint();

  const menuItems = [
    {
      key: "/",
      icon: <FileTextOutlined />,
      label: <Link to="/">Recibos</Link>,
    },
    {
      key: "/nuevo",
      icon: <PlusCircleOutlined />,
      label: <Link to="/nuevo">Nuevo</Link>,
    },
    {
      key: "/usuarios",
      icon: <UserOutlined />,
      label: <Link to="/usuarios">Usuarios</Link>,
    },
  ];

  const isMobile = !screens.md;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ background: "#001529", padding: "0 16px" }}>
        <div
          style={{
            display: "flex",
            height: "64px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              color: "white",
              fontSize: 20,
              lineHeight: "64px",
              margin: 0,
            }}
          >
            Recibos App
          </h1>
          <img
            src="http://localhost:3000/static/logoApp.png"
            alt="Logo"
            style={{ width: 100 }}
          />
        </div>
      </Header>

      <Content
        style={{
          padding: "16px",
          paddingBottom: isMobile ? 80 : 24, // deja espacio si hay footer
          maxWidth: 960,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Outlet />
      </Content>

      {isMobile && (
        <Footer
          style={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            background: "#fff",
            borderTop: "1px solid #e8e8e8",
            padding: 0,
            zIndex: 10,
          }}
        >
          <Menu
            mode="horizontal"
            selectedKeys={[location.pathname]}
            items={menuItems}
            style={{ display: "flex", justifyContent: "space-around" }}
          />
        </Footer>
      )}

      {!isMobile && (
        <Footer style={{ textAlign: "center", background: "#f0f2f5" }}>
          Recibos App ©2025
        </Footer>
      )}
    </Layout>
  );
};

export default MainLayout;
