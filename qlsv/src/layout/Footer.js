import React from "react";
import { Alert, Container } from "react-bootstrap";

const Footer = () => {
    return(
        <div className="footer-copyright text-center py-3">
          <Container fluid>
            &copy; {new Date().getFullYear()} Copyright:{" "}
            <a href="#"> Truong.com</a>
          </Container>
        </div>
    )
}

export default Footer