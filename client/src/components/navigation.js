import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

const Navigation = (props) => {
  const { hackatonsArray, hallOfFamePosition, isLogged } = props;
  const navigate = useNavigate();
  const handleClick = (i) => {
    navigate(`/hackaton/${i}`);
  };
  const handleShowHome = () => {
    navigate("/");
  };
  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container className="navbar-text">
          <button onClick={handleShowHome}>
            <Navbar.Brand className="golden-text">
              <FaTrophy className="img-logo" />
              Hackatons
            </Navbar.Brand>
          </button>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="golden-text"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto golden-text">
              {hackatonsArray.length < 1 || !isLogged ? (
                ""
              ) : (
                <NavDropdown
                  title={<span className="golden-text">Hackatons List</span>}
                  id="basic-nav-dropdown"
                >
                  {hackatonsArray.map((hackaton, i) => (
                    <button
                      key={hackaton.id}
                      onClick={() => {
                        handleClick(i);
                      }}
                    >
                      <NavDropdown.Item
                        className={hallOfFamePosition === i ? "golden" : ""}
                      >
                        {hackaton.place} {hackaton.date}
                      </NavDropdown.Item>
                    </button>
                  ))}
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
          <NavLink
            className="navbar-item golden-text"
            activeclassname="is-active"
            to={isLogged ? "/logout" : "/login"}
          >
            <AiOutlineUser size={35} />
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
};

export default Navigation;
