import { useState } from "react";
import Link from "next/link";
import classes from "./PublicBio.module.css";
import Card from "../ui/Card";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EastIcon from "@mui/icons-material/East";

const PublicBio = () => {
  const [info, setInfo] = useState({
    userId: 1,
    image: "https://scpic.chinaz.net/files/pic/pic9/201712/bpic4731.jpg",
    userName: "Josh Stevens",
    userJob: "UX Student",
    userAddress: "Long Island, NY USA",
    userBio:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure expedita officiis repellendus iste veritatis. Fuga recusandae rerum quia. Hic, rem.",
  });

  return (
    <Card>
      <section className={classes.sectionLeft}>
        <div className={classes.frame}>
          <img className={classes.img} src={info.image} alt={info.id} />
        </div>
        <div className={classes.middleFrame}>
          <Link href="/">Browse Projects</Link>
        </div>
        <div className={classes.lastFrame}>
          <Link href="/">
            <AddCircleIcon
              sx={{ fontSize: 80 }}
              style={{ cursor: "pointer" }}
            />
          </Link>
          <p>start your first project</p>
        </div>
      </section>
      <section className={classes.sectionRight}>
        <div>
          <h3>{info.userName}</h3>
          <p>{`${info.userJob} | ${info.userAddress}`}</p>
          <h4>
            {`Contact ${info.userName}`}
            <Link href="/">
              <EastIcon style={{ cursor: "pointer" }} />
            </Link>
          </h4>
          <p>Your Bio</p>
          <p>{info.userBio}</p>
        </div>
      </section>
    </Card>
  );
};

export default PublicBio;
