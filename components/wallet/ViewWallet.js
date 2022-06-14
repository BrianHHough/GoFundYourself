import { useState } from "react";
import Collapsible from "react-collapsible";
import classes from "./ViewWallet.module.css";
import SingleWallet from "../wallet/singleWallet/SingleWallet";

const ViewWallet = () => {
  return (
    <>
      <h4>Your wallet</h4>
      <Collapsible className={classes.container} trigger="See your tokens">
        <SingleWallet />
      </Collapsible>
    </>
  );
};

export default ViewWallet;
