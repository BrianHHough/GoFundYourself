import { useState } from "react";
import Link from "next/link";
import classes from "./SingleProjects.module.css";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockIcon from "@mui/icons-material/Lock";

const Projects = () => {
  const [projectsMoney, setProjectsMoney] = useState({
    userId: 1,
    money: 55,
  });

  return (
    <section className={classes.sectionContainer}>
      <div className={classes.container}>
        <div key={projectsMoney.userId}>{`$ ${projectsMoney.money}`}</div>
        <div className={classes.svg}>
          <LockOpenIcon />
          <Link href="/">
            <ArrowCircleRightIcon />
          </Link>
        </div>
      </div>
      <div className={classes.smallContainer}>
        <div key={projectsMoney.userId}>{`$ ${projectsMoney.money}`}</div>
        <div>
          <LockIcon />
        </div>
      </div>
      <div className={classes.smallContainer}>
        <div key={projectsMoney.userId}>{`$ ${projectsMoney.money}`}</div>
        <div>
          <LockIcon />
        </div>
      </div>
      <div className={classes.smallContainer}>
        <div key={projectsMoney.userId}>{`$ ${projectsMoney.money}`}</div>
        <div>
          <LockIcon />
        </div>
      </div>
      <div className={classes.smallContainer}>
        <div key={projectsMoney.userId}>{`$ ${projectsMoney.money}`}</div>
        <div>
          <LockIcon />
        </div>
      </div>
    </section>
  );
};

export default Projects;
