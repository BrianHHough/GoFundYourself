import { useState } from "react";
import Collapse from "@kunukn/react-collapse";
import classes from "./ProfileInfo.module.css";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

const ProfileInfo = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [userBasic, setUserBasic] = useState({
    userId: 1,
    name: "JOsh",
    projectNum: 29,
    userMoney: 5555,
  });

  return (
    <Collapse className={classes.collapseTransition} isOpen={isOpen}>
      <div className={classes.container}>
        <h4 className={classes.title}>{`Welcome back ${userBasic.name}`}</h4>
        <p className={classes.text}>
          {`You've backed ${userBasic.projectNum} projects`}
        </p>
        <p
          className={classes.text}
        >{`Total of ${userBasic.userMoney} given to dreamers`}</p>
        <p className={classes.text}>{`You're truly awesome!`}</p>
        <HighlightOffIcon
          onClick={() => {
            setIsOpen(false);
          }}
        />
      </div>
    </Collapse>
  );
};

export default ProfileInfo;
