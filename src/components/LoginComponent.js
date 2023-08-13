import { Form, Button, Input } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProfileComponent from "./profileComponent";
import Register from "./RegisterComponent";

function Login() {
  const [form] = Form.useForm();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isNewUser, setNewUser] = useState(false);
  const [formError, setFormError] = useState(null);
  useEffect(() => {
    // This effect will run whenever isNewUser changes
    console.log('isRegistered changed:', isNewUser);    
  }, [isNewUser, isLoggedIn, formError]);

  const onFinish = async () => {
    
    try {
      const values = await form.validateFields();
    //   console.log("Form values:", values);
       axios.post('http://localhost:5000/login', values)
      .then(response => {
        console.log('Login successful:');
        setIsLoggedIn(response.data.isLoggedIn)
        setUserData(response.data.userDetails)
        setFormError();
      })
      .catch(error => {
        console.error('Login failed:', error);
        setFormError("User not found");
      });

      // Perform your login logic here, e.g., axios.post('/login', values)...
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const onClickRegister = () => {
    setNewUser(true)
  }

  console.log(isLoggedIn, isNewUser)
  return (

    <div className="Login">
        {formError ? <div style={{ color: "red" }}>{formError}</div> : ""}
        {isNewUser && !isLoggedIn ? <Register setIsLoggedIn={setIsLoggedIn} setNewUser={setNewUser}/> : 
        isLoggedIn && !isNewUser ? <ProfileComponent userData={userData} isNewUser={isNewUser} onLogout={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> : 
        
        <header className="Login-header">
        <Form
          form={form}
          autoComplete="off"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
              { type: "email", message: "Please enter a valid username" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your username" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please enter a password",
              },
              {
                min: 8,
                message: "Password must be at least 8 characters long",
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  "Password must contain at least one uppercase letter and one digit",
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button block type="primary" htmlType="submit">
              Login
            </Button>
            <Button block type="primary" onClick={onClickRegister}>
                Register
            </Button>
          </Form.Item>
        </Form>
      </header>}
    </div>
  );
}

export default Login;
