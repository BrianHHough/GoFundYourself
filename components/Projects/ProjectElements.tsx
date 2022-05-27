import styled from "styled-components"
import Image from "next/image"

export const ProjectCardCon = styled.div`
    width: 400px;
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
    margin-top: 15px;
`;

