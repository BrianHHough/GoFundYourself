import styled from "styled-components"
import Image from "next/image"

export const ProjectTimelineCardCon = styled.div`
    min-width: 300px;
    min-height: 300px;
    max-height: 500px;
    border-radius: 20px;
    float: left;
    margin-left: -40px;
    margin-right: 60px;
    /* margin-left: 40px; */
    @media (max-width: 1050px) {
        margin-left: -90px;
    }
    @media (max-width: 9500px) {
        margin-left: -180px;
    }

`;

export const Element = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
`;

export const ElementNumber = styled.div`
    font-size: 40pt;
    font-weight: 600;
    margin-left: 30px;
    margin-top: 20px;
`;

export const ElementDescription = styled.div`
    font-size: 18pt;
    margin-left: 30px;
    margin-top: 35px;
`;

export const ProjectCardCon = styled.div`
    min-width: 400px;
    min-height: 300px;
    max-height: 500px;
    border-radius: 20px;
    border: 3px solid black;
    float: right;
    margin-right: 40px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        transform: scale(1.04);
        transition: all 0.3s ease-in-out;
    }
`;

export const ProjectCardImage = styled(Image)`
    border-radius: 360px;
    text-align: center;
    /* height: 150px;
    width: 150px; */
`;

export const PercentComplete = styled.div`
    text-align: center;
    font-size: 12pt;
    margin-top: 10px;
    margin-bottom: 10px;
`;

export const ProjectCardViewButton = styled.button`
    text-align: center;
    left: 50%;
    width: 120px;
    position: relative;
    transform: translateX(-50%);
    height: 40px;
    border-radius: 10px;
    background: white;
    border: 3px solid #c9c9c9;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    &:hover {
        background: #e6e6e6;
        transition: all 0.2s ease-in-out;
    }
`;