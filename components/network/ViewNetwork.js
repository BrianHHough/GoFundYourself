import { useState } from "react";
import Collapsible from "react-collapsible";
import classes from "./ViewNetwork.module.css";
import SingleNetwork from "./singleNetwork/SingleNetwork";
import NextworkTitle from "../../components/network/title/NetworkTitle";
import NetworkTitle from "../../components/network/title/NetworkTitle";

const ViewNetwork = () => {
  return (
    <>
      <h4>Your network</h4>
      <Collapsible className={classes.container} trigger={<NetworkTitle />}>
        <SingleNetwork />
      </Collapsible>
    </>
  );
};

export default ViewNetwork;
