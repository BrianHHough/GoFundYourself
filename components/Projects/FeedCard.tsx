import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { useMoralis } from "react-moralis"
import {  
    ProjectCardCon, ProjectCardImage, PercentComplete, ProjectCardViewButton
} from "./ProjectElements"
import { styled } from '@mui/material/styles';

import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { stepClasses } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

namespace JSX {
    export interface Element {
        div: {[k: string]: any}
    }
  }

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 32,
    borderRadius: 20,
    transform: "translateX(55%)",
    border: "4px solid black",
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#ffffff',
      
    },
    [`& .${linearProgressClasses.bar}`]: {
    //   borderRadius: 5,
      background: 'linear-gradient(90deg, #03FCBA, #ffffff)',
    },
  }));

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
return (
    <>
        <Box sx={{ display: 'flex', alignItems: 'center', width: "50%" }}>
        <Box sx={{ width: '100%', mr: 1 }}>
            <BorderLinearProgress 
                variant="determinate" 
                {...props} 
            />
        </Box>
        
        </Box>
        <PercentComplete>
            {`${Math.round(props.value)}% Funded`}
        </PercentComplete>
    </>
);
}

function ProjectCard (
    {pfp, name, need, status, link}: 
    {pfp: any, name: string, need: string, status: number, link: string}
    ): JSX.Element[] | any {
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        logout
    } = useMoralis();

    const [progress, setProgress] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 10 : prevProgress + 10));
        }, 800);
        return () => {
          clearInterval(timer);
        };
      }, []);

    return (
        <>
        <ProjectCardCon style={{float: "left"}}>
            <div style={{left: "50%", transform: "translateX(-50%)", position: "relative", background: "#00FCB9", width: "130px", height: "130px", borderRadius: "360px", marginTop: "20px"}}>
                <ProjectCardImage
                    src={pfp}
                    height={130}
                    width={130}
                >
                </ProjectCardImage>
            </div>

            <div style={{width: "100%", textAlign: "center", marginTop: "10px", marginBottom: "10px", fontSize: "16pt"}}>
                Get {name} {need}
            </div>

            <Box >
                <LinearProgressWithLabel 
                    value={status} 
                />
            </Box>

    <Link href={`${link}`} passHref>
        <a target="_blank" rel="noreferrer">
            <ProjectCardViewButton style={{marginBottom: "20px"}}>
                <div style={{
                    display: "flex",
                    textAlign: "center",
                    left: "50%",
                    transform: "translateX(5%)"
                    }}>
                <div style={{
                    top: "50%",
                    transform: "translateY(15%)"
                }}>
                    View Project 
                </div>
                <ArrowForwardIcon style={{
                    fontWeight: "100"
                }} />
                </div>
            </ProjectCardViewButton>
        </a>
    </Link>

    </ProjectCardCon> 
    </>
    )
}

export default ProjectCard