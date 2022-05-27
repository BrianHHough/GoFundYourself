import styled from "styled-components"
import Image from "next/image"

// #00FCB9

export const BodyCon = styled.div`
  width: 100vw;
  height: calc(100vh - 90px - 70px);
  overflow-y: auto;
`;

export const BodyHeaderCon = styled.div`
  padding-top: 10px;
  padding-bottom: 30px;
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='40' viewBox='0 0 50 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23dcdcdc' fill-opacity='0.4'%3E%3Cpath d='M40 10L36.67 0h-2.11l3.33 10H20l-2.28 6.84L12.11 0H10l6.67 20H10l-2.28 6.84L2.11 10 5.44 0h-2.1L0 10l6.67 20-3.34 10h2.11l2.28-6.84L10 40h20l2.28-6.84L34.56 40h2.1l-3.33-10H40l2.28-6.84L47.89 40H50l-6.67-20L50 0h-2.1l-5.62 16.84L40 10zm1.23 10l-2.28-6.84L34 28h4.56l2.67-8zm-10.67 8l-2-6h-9.12l2 6h9.12zm-12.84-4.84L12.77 38h15.79l2.67-8H20l-2.28-6.84zM18.77 20H30l2.28 6.84L37.23 12H21.44l-2.67 8zm-7.33 2H16l-4.95 14.84L8.77 30l2.67-8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  /* box-shadow: inset 0 0 18px 110px #ffffff85; */
`;

export const RandomizingHeader = styled.div`
  /* margin-top: 30px; */
  text-align: center;
  font-size: 30pt;
  margin-top: 40px;
`;

export const SubHeader = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 15pt;
`;

export const PeopleBlobs = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

export const HomePageButtonConnectWallet = styled.button`
    /* right: 0; */
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

export const HomePageButtonConnectWalletInvert = styled.button`
    /* right: 0; */
    /* margin-left: 20px; */
    padding: 20px;
    position: relative;
    font-size: 12pt;
    font-weight: 650;
    color: black;
    border: 5px solid black;
    height: 45px;
    display: flex;
    align-items: center;
    background: white;
    border-radius: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: all 0.4s ease-in-out;
    &:hover {
        background: black;
        color: white;
        transition: all 0.4s ease-in-out;
        border: 5px solid grey;
    }
`;

export const BodySectionCon = styled.div`
    height: 100%;
    margin-bottom: 250px;

    /* width: 100vw; */
`;

export const BodySectionHeader = styled.div`
  /* margin-top: 30px; */
  text-align: center;
  font-size: 30pt;
  margin-top: 140px;
  font-weight: 650;
  text-decoration: underline;
`;

export const BodySectionDescription = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 15pt;
  padding: 0px 20% 40px 20%;
`;



export const TimelineCon = styled.div`
  /* height: 652px; */
  position: relative;
  float: left;
`;

export const BodySectionImageCon = styled.div`
  transform: scale(0.7);
  position: relative;
  float: right;
`;

export const ProjectCardCon = styled.div`
    display: flex;
    left: 50%;
    position: relative;
    transform: translateX(-50%);
    top: 10%;
    width: 60%;
`;

export const ProjectCardButton = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    border: 4px solid black;
    padding: 10px 10px 10px 10px;
    width: 175px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    &:hover {
      background: #e6e6e6;
      transition: all 0.2s ease-in-out;
      transform: scale(1.1);
    }
`;

export const DiveInButton = styled.div`
    margin-left: 10px;
    margin-right: 10px;
    border: 4px solid black;
    padding: 10px 10px 10px 10px;
    width: 350px;
    height: 60px;
    font-size: 20pt;
    font-weight: 650;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    position: relative;
    background: black;
    color: white;
    &:hover {
      background: #4d4d4d;
      transition: all 0.2s ease-in-out;
      transform: scale(1.1);
    }
`;

export const TestimonialPersonCon = styled.div`
    /* display: initial; */
    text-align: center;
    width: 300px;
    margin-left: 20px;
    margin-right: 20px;
`;

export const TestimonialPersonImage = styled(Image)`
    border-radius: 360px;
    text-align: center;
    background: #00FCB9;
    /* left: 50%;
    transform: translateX(-50%);
    position: relative; */
`;

export const TestimonialText = styled.div`
    font-size: 14pt;
    text-align: center; 
    width: 300px;
    font-weight: 300;
`;
