import React from "react";
import "../App.css";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

/*******for navigation bar********/
class nav extends React.Component {
  Logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  /****** Display the their features according to the user type *********/
  render() {
    //admin's system features
    if (localStorage.getItem("userEmail")) {
      if (localStorage.getItem("userType") === "admin") {
        return (
        
          <Navbar className="navbar-dark bg-dark">
            <Navbar.Brand href="/">Online Event Planning</Navbar.Brand>

            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/usersList">Users</Nav.Link>
                <Nav.Link href="/">View Events</Nav.Link>
                <Nav.Link href="/category">Category</Nav.Link>
                <Nav.Link href="/newevent">Events</Nav.Link>
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
         
        );
   
      } else {
        //normal user's features
        return (
          <Navbar className="navbar-dark bg-dark">
            <Navbar.Brand href="/">Online Event Planning</Navbar.Brand>

            <Navbar.Collapse className="collapse navbar-collapse">
              <Nav className="navbar-nav ml-auto">
                <Nav.Link href="/">View Events</Nav.Link>
                <Nav.Link onClick={this.Logout}>Logout</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
    } else {
      return (
        <Navbar className="navbar-dark bg-dark">
          <Navbar.Brand>Online Event Planning</Navbar.Brand>

          <Navbar.Collapse className="collapse navbar-collapse">
            <Nav className="navbar-nav ml-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
  }
}

export default nav;
