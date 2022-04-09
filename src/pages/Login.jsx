import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../components/login/Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Form className="form" onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg">
          <DropdownButton
            menuVariant="dark"
            variant="dark"
            id="dropdown-basic-button"
            title="-Post-"
          >
            <Dropdown.Item>President</Dropdown.Item>
            <Dropdown.Item>Director</Dropdown.Item>
            <Dropdown.Item>Member</Dropdown.Item>
          </DropdownButton>
        </Form.Group>
      </Form>
      <div class="login-button">
        <Button
          block
          size="lg"
          margin-top
          type="submit"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
