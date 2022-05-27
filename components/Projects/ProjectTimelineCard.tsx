import React, { useState, useEffect } from 'react'
import Link from "next/link"
import { useMoralis } from "react-moralis"
import { 
    ProjectTimelineCardCon, Element, ElementNumber,ElementDescription,

    ProjectCardCon, ProjectCardImage, PercentComplete, ProjectCardViewButton
} from "../Projects/ProjectElements"
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


function ProjectTimelineCard (
    {step1, step2, step3}: 
    {step1: string, step2: string, step3: string}
    ): JSX.Element[] | any {
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        user,
        logout
    } = useMoralis();

    return (
        <>
        <ProjectTimelineCardCon>
            <Element>
                <ElementNumber>1</ElementNumber>
                <ElementDescription>{step1}</ElementDescription>
            </Element>

            <Element>
                <ElementNumber>2</ElementNumber>
                <ElementDescription>{step2}</ElementDescription>
            </Element>

            <Element>
                <ElementNumber>3</ElementNumber>
                <ElementDescription>{step3}</ElementDescription>
            </Element>

        </ProjectTimelineCardCon> 
        </>
    )
}

export default ProjectTimelineCard