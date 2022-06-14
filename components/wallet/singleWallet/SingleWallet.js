import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import classes from "./SingleWallet.module.css";
import wallet1 from "../../../assets/walletPics/wallet1.png";
import wallet4 from "../../../assets/walletPics/wallet4.png";
import wallet3 from "../../../assets/walletPics/wallet3.png";
import wallet6 from "../../../assets/walletPics/wallet6.png";

const SingleWallet = () => {
  const [userWallet, setUserWallet] = useState();

  return (
    <section className={classes.sectionContainer}>
      <Image
        className={classes.container}
        src={wallet1}
        alt="walltet1"
        width="100"
        height="100"
      />
      <Image
        className={classes.container}
        src={wallet4}
        alt="walltet4"
        width="100"
        height="100"
      />
      <Image
        className={classes.container}
        src={wallet3}
        alt="walltet3"
        width="100"
        height="100"
      />
      <Image
        className={classes.container}
        src={wallet6}
        alt="walltet6"
        width="100"
        height="100"
      />
    </section>
  );
};

export default SingleWallet;
