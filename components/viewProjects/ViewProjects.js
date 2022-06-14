import { useState } from "react";
import Collapsible from "react-collapsible";
import classes from "./ViewProjects.module.css";
import SingleProjects from "../viewProjects/singleProjects/SingleProjects.js";

const ViewProjects = () => {
  return (
    <>
      <h4>Your projects</h4>
      <Collapsible className={classes.container} trigger="See your projects">
        <SingleProjects />
      </Collapsible>
    </>
  );
};

export default ViewProjects;
