import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../apicalls/userAPIcall";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/Slices/loaderSlice";
import { setUser } from "../redux/Slices/userSlice";
import { Layout, Menu, message } from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
  GithubOutlined,
} from "@ant-design/icons";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const navItems = [
    {
      key:'Home',
      label: (
        <Link to='/'>
            Home
        </Link>
      ),
      icon: <HomeOutlined />,
    },
    {
      key:'SubMenu',
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <span
              onClick={() => {
                user.isAdmin ? navigate("/admin") : navigate("/profile");
              }}
            >
              Profile
            </span>
          ),
          key:'myprofile',
          icon: <ProfileOutlined />,
        },
        {
          key:'/logout',
          label: (
            <Link to="/login" onClick={() => localStorage.removeItem("token")}>
              Log Out
            </Link>
          ),
          icon: <LogoutOutlined />,
        },
      ],
    },
  ];

  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await getCurrentUser();
      // console.log(response);
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setUser(null));
        message.error(response.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
      dispatch(hideLoading());
    } catch (error) {
      dispatch(hideLoading());
      dispatch(setUser(null));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  

  

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h2 className="demo-logo text-white m-0 text-2xl font-semibold">BookMyShow</h2>
            <Menu theme="dark" mode="horizontal" items={navItems}></Menu>
          </Header>
          <Content style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </Content>
          <Footer className="text-xs text-center">BookMyShow ©2024 Created by<a href="https://github.com/Aaryan-Codes"> Aaryan Singh <GithubOutlined /></a></Footer>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
