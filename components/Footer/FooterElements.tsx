import styled from "styled-components"
import Blockies from "react-blockies";

export const FooterCon = styled.div`
    height: 145px;
    // min-height: 15vh;// 140px;
    width: 100vw;
    /* bottom: 0; */
    position: absolute;
    background: rgb(255,255,255);
    background: black;
    display: flex;
`;

export const FooterLogoCon = styled.div`
    margin-top: 20px;
`;

export const FooterLogo = styled.div`
    left: 0;
    margin-left: 20px;
    position: relative;
    font-size: 20pt;
    font-weight: 650;
    color: white;
    display: flex;
    align-items: center;
`;

export const FooterLogoDescription = styled.div`
    left: 0;
    margin-left: 20px;
    position: relative;
    font-size: 10pt;
    color: white;
    display: flex;
    align-items: center;
    margin-top: 5px;
`;

export const FooterLogosCon = styled.div`
    display: flex;
    margin-left: 20px;
    margin-top: 10px;
`;

export const FooterLinksCon = styled.div`
    right: 0;
    position: absolute;
    top: 0;
    line-height: 2;
    color: white;
    margin-top: 20px;
    display: grid;
    text-align: right;
    margin-right: 20px;
`;
