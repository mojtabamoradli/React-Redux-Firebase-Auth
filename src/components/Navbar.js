import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../redux/account/userAction";

const Navbar = ({ open }) => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const Ul = styled.ul`
    list-style: none;
    display: flex;
    justify-content: right;
    margin: 10px 40px;
    z-index: 15;

    li {
      display: inline;
      list-style-type: none;
      text-decoration: none;
      color: #fff;
      font-size: 1.2rem;
      font-weight: 600;
    }

    button {
      margin-left: 35px;
    }

    @media (max-width: 768px) {
      margin: 0;
      background: #161b22;
      position: fixed;
      top: 0;
      right: 0;
      height: 100vh;
      width: 300px;

      transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};

      ul {
        margin: 10px 40px auto auto;
        display: flex;
        flex-direction: column;
        margin-top: 70px;
      }

      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        align-content: center;
        margin-top: 20px;
      }

      button {
        margin-left: 40px;
      }
    }
  `;

  return (
    <div>
      <Ul open={open}>
        <ul>
          {isLoggedIn ? (
            <div>
              <li>
                <NavLink style={({ isActive }) => ({ opacity: isActive ? "50%" : "", cursor: isActive ? "default" : "pointer" })} to="/ForOnlyVerifiedMemebers">
                  ForOnlyVerifiedMemebers
                </NavLink>
              </li>
              <li>
                <NavLink style={({ isActive }) => ({ opacity: isActive ? "50%" : "", cursor: isActive ? "default" : "pointer" })} to="/Dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </li>
            </div>
          ) : (
            <li>
              <NavLink style={({ isActive }) => ({ opacity: isActive ? "50%" : "", cursor: isActive ? "default" : "pointer" })} to="/Login">
                Account
              </NavLink>
            </li>
          )}
        </ul>
      </Ul>
    </div>
  );
};

export default Navbar;
