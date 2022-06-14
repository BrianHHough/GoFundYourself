import { useState } from "react";
import classes from "./SingleNetwork.module.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const SingleNetwork = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Sergey Nazarov",
    job: "Bossman @ Chainlink",
    money: "$23,576 Given",
  });

  return (
    <section className={classes.sectionContainer}>
      <div className={classes.container}>
        <p className={classes.firstTitle}></p>
        <p className={classes.secondTitle}></p>
        <p className={classes.thirdTitle}></p>
        <p className={classes.title}></p>
        <p className={classes.title}></p>
      </div>
      <div className={classes.text}>
        <h4>{userInfo.name}</h4>
        <p>{userInfo.job}</p>
        <p>{userInfo.money}</p>
      </div>
      <div>
        View Full Profile <ArrowForwardIcon />
      </div>
    </section>
  );
};

export default SingleNetwork;
