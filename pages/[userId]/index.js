import PublicBio from "../../components/publicBio/PublicBio";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ViewProjects from "../../components/viewProjects/ViewProjects";
import EditProfile from "../../components/editProfile/EditProfile.js";
import ViewWallet from "../../components/wallet/ViewWallet";
import ViewNetwork from "../../components/network/ViewNetwork";
import classes from "./index.module.css";

const ProfileUserPage = () => {
  return (
    <div className={classes.container}>
      <section className={classes.sectionLeft}>
        <h3>Public Bio</h3>
        <PublicBio />
      </section>
      <section className={classes.sectionRight}>
        <div className={classes.edit}>
          <EditProfile />
        </div>
        <div>
          <ProfileInfo />
          <ViewProjects />
          <ViewWallet />
          <ViewNetwork />
        </div>
      </section>
    </div>
  );
};

export default ProfileUserPage;
