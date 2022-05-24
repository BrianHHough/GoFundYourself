import styled from "styled-components"
import Blockies from "react-blockies";

export const NavBarCon = styled.div`
    height: 90px;
    width: 100vw;
    top: 0;
    position: relative;
    background: rgb(255,255,255);
    display: flex;
`;

export const NavBarLogo = styled.div`
    left: 0;
    margin-left: 20px;
    position: relative;
    font-size: 30pt;
    font-weight: 650;
    color: black;
    height: 100%;
    display: flex;
    align-items: center;
`;

export const NavBarConnectWallet = styled.button`
    /* right: 0; */
    margin: 0 auto;
    margin-right: 20px;
    padding: 20px;
    position: relative;
    font-size: 12pt;
    font-weight: 650;
    color: white;
    height: 45px;
    display: flex;
    align-items: center;
    background: black;
    border-radius: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
        background: white;
        color: black;
        transition: all 0.4s ease-in-out;
        border: 5px solid black;
    }
`;


export const UserBlockie = styled(Blockies)`
  border-radius: 50px;
  position: relative;
  width: 50px;
  height: 50px;
`;