import React from "react";
import { NavLink } from "react-router-dom";

import styled from "styled-components";

import Hambergur from "../components/Hamburger"

const Header = () => {

  const HEADER = styled.header`

  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, #161b22 0%, #161b22 50%);
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
height: 60px;




  a {
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
    margin: 0 0 0 2rem;



  }

  `


  return (
    <>
      <HEADER>

        <div><NavLink to="/">Home</NavLink></div>
        <Hambergur />

      </HEADER>
    </>
  );
};

export default Header;
