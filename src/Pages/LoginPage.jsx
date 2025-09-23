import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../components/Auth/Login";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  return (
    <div className="Register login-page-container d-flex min-vh-100">
      <Container className="my-auto">
        <Row className="justify-content-center align-items-center">
          <Col xs={11} md={5} sm={11} className="my-auto">
            <Login />
          </Col>
          <Col xs={1} md={7}sm={1} className="d-none d-md-block">
            {/* Right column content (image, etc) goes here */}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;