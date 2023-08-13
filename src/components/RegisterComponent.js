import "../App.css";
import { useState, useEffect} from "react";
import { Form, Button, Checkbox, DatePicker, Input, Select, Space } from "antd";
import axios from 'axios';
import Login from "./LoginComponent";

function Register({setIsLoggedIn, setNewUser}) {
    const [form] = Form.useForm();
    const [isRegistered, setRegistered] = useState(false)
    useEffect(() => {
        // This effect will run whenever isRegistered changes
        console.log('isRegistered changed:', isRegistered);
    
        // Perform actions based on the updated isRegistered value
        if (isRegistered) {
          setIsLoggedIn(false)
          setNewUser(true)
        }
      }, [isRegistered]);

  const onFinish = async () => {
    
    try {
        const values = await form.validateFields();
        console.log("Form values:", values);
         axios.post('http://localhost:5000/register', values)
        .then(response => {
          console.log('Register successful:');
          setRegistered(true)
        })
        .catch(error => {
          console.error('Registration failed:', error);
        });
  
        // Perform your login logic here, e.g., axios.post('/login', values)...
      } catch (error) {
        console.error("Validation failed:", error);
      }
  };

  return !isRegistered ? (
    <div className="Register">
      <h2>Registration Form</h2>
      <header className="Register-header">
        <Form
          form={form}
          autoComplete="on"
          labelCol={{ span: 25 }}
          wrapperCol={{ span: 25 }}
          onFinish={onFinish}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Only alphabetic characters allowed',
              },
              {
                max: 50,
                message: 'Maximum 50 characters allowed',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your name" />
          </Form.Item>

          <Form.Item
            name="userName"
            label="User Name"
            rules={[
              {
                required: true,
                message: "Please enter user name",
              },
              { whitespace: true },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Only alphabetic characters allowed',
              },
              {
                max: 50,
                message: 'Maximum 50 characters allowed',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your user name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please enter a password',
              },
              {
                min: 8,
                message: 'Password must be at least 8 characters long',
              },
              {
                pattern: /^(?=.*[A-Z])(?=.*\d).+$/,
                message:
                  'Password must contain at least one uppercase letter and one digit',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rules={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Chose date of birth"
            />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: 'Please enter your phone number' },
              { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' }
            ]}
            hasFeedback
          >
          <Input placeholder="Type your phone number" />
          </Form.Item>

          <Form.Item
            name="address"
            label="Address"
            rules={[
              {
                required: true,
                message: 'Please enter your address',
              },
              { max: 100, message: 'Address must not exceed 100 characters' },
            ]}
            hasFeedback
          >
          <Input.TextArea rows={4} placeholder="Enter your address" />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Only alphabetic characters allowed',
              },
              {
                max: 50,
                message: 'Maximum 50 characters allowed',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your city" />
          </Form.Item>

          <Form.Item
            name="state"
            label="State"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Only alphabetic characters allowed',
              },
              {
                max: 50,
                message: 'Maximum 50 characters allowed',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your state" />
          </Form.Item>

          <Form.Item
            label="Zip Code"
            name="zipCode"
            rules={[
              { required: true, message: 'Please enter your zip code' },
              { pattern: /^[0-9]{6}$/, message: 'Please enter a valid 6-digit zip code' }
            ]}
            hasFeedback
          >
          < Input placeholder="Type your zip code" />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              {
                pattern: /^[A-Za-z\s]+$/,
                message: 'Only alphabetic characters allowed',
              },
              {
                max: 50,
                message: 'Maximum 50 characters allowed',
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your country" />
          </Form.Item>

          <Form.Item
            name="securityQuestion"
            label="Security Question"
            rules={[
              {
                required: true,
                message: "Please enter your security question",
              },
              { whitespace: true },
              { min: 15}
            ]}
            hasFeedback
          >
            <Input placeholder="Type your security question" />
          </Form.Item>

          <Form.Item
            name="securityAnswer"
            label="Security Answer"
            rules={[
              {
                required: true,
                message: "Please enter your security answer",
              },
              { whitespace: true },
              { max: 100 },
            ]}
            hasFeedback
          >
            <Input placeholder="Type your security answer" />
          </Form.Item>
          <Form.Item wrapperRow={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
            <></>
          </Form.Item>
          
        </Form>
      </header>
    </div>
  ) : (<Login></Login>)
}

export default Register;