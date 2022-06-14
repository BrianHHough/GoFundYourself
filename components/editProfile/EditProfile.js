import { useState } from "react";
import Link from "next/link";
import classes from "./EditProfile.module.css";

const PublicBio = () => {
  const [info, setInfo] = useState({
    userId: 1,
    image: "https://scpic.chinaz.net/files/pic/pic9/201712/bpic4731.jpg",
    userName: "Josh Stevens",
  });

  return (
    <>
      <section className={classes.container}>
        <div className={classes.img}>
          {" "}
          <img className={classes.img} src={info.image} alt={info.id} />{" "}
        </div>
        <div className={classes.content}>
          <h4>Hi, {info.userName}</h4>
          <Link href="/">Edit Profile</Link>
        </div>
      </section>
    </>
  );
};

export default PublicBio;

{
  /* <div className={classes.}>
          
        </div>
        <div className={classes.middleFrame}>
          <Link href="/">Browse Projects</Link>
        </div> */
}
