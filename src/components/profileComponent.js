import React from "react";
import { Descriptions, Button } from "antd";

function ProfileComponent({ userData, onLogout, setIsLoggedIn, isNewUser }) {
  const {
    fullName,
    email,
    dateOfBirth,
    phoneNumber,
    address,
    city,
    state,
    zipCode,
    country,
    securityQuestion,
    securityAnswer,
  } = userData;

  const isLogin = () => {
    if(onLogout && !isNewUser) {
        setIsLoggedIn(false)
    }
  }

  return (
    <div className="ProfileComponent">
      <h2>Profile Details</h2>
      <Descriptions bordered>
        <Descriptions.Item label="Full Name">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {new Date(dateOfBirth).toLocaleDateString()}
        </Descriptions.Item>
        <Descriptions.Item label="Phone Number">
          {phoneNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Address" span={2}>
          {address}
        </Descriptions.Item>
        <Descriptions.Item label="City">{city}</Descriptions.Item>
        <Descriptions.Item label="State">{state}</Descriptions.Item>
        <Descriptions.Item label="Zip Code">{zipCode}</Descriptions.Item>
        <Descriptions.Item label="Country">{country}</Descriptions.Item>
        <Descriptions.Item label="Security Question" span={2}>
          {securityQuestion}
        </Descriptions.Item>
        <Descriptions.Item label="Security Answer" span={2}>
          {securityAnswer}
        </Descriptions.Item>
      </Descriptions>
      <Button onClick={() => isLogin()} type="primary">
        Logout
      </Button>
    </div>
  );
}

export default ProfileComponent;
