import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/userAPIcall";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (value) => {
    try {
      const res = await LoginUser(value);
      console.log(res);
      if (res.success) {
        message.success(res.message);

        localStorage.setItem("token", res.token);

        window.location.href = "/";
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    document.title = 'Login';
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <header className="App-header">
        <main className="main-area mw-500 text-center px-3">
          <section className="left-section">
            <h1 className="text-2xl mb-3.5 font-bold">
              Welcome back to BookMyShow
            </h1>
          </section>
          <section className="right-section">
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                label="Email"
                name="email"
                className="d-block"
                rules={[{ required: true, message: "Email is required!" }]}
              >
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  autoComplete="username"
                ></Input>
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                className="d-block"
                rules={[{ required: true, message: "Password is required!" }]}
              >
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter the password"
                  autoComplete="current-password"
                ></Input>
              </Form.Item>
              <Form.Item>
                <Button
                  block
                  type="primary"
                  htmlType="submit"
                  style={{ fontSize: "1rem", fontWeight: "600" }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div>
              <p>
                Not registered yet?{" "}
                <Link to="/register">
                  <u>Register now</u>
                </Link>
              </p>
            </div>
          </section>
        </main>
      </header>
    </>
  );
};

export default Login;
