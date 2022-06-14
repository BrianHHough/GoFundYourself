import Header from "../../components/header/Header";
import PublicBio from "../../components/publicBio/PublicBio";
import ProfileInfo from "../../components/profileInfo/ProfileInfo";
import ViewProjects from "../../components/viewProjects/ViewProjects";
import EditProfile from "../../components/editProfile/EditProfile.js";
import ViewWallet from "../../components/wallet/ViewWallet";
import ViewNetwork from "../../components/network/ViewNetwork";

const ProfileUserPage = () => {
  return (
    <div>
      <Header />
      <PublicBio />
      <ProfileInfo />
      <ViewProjects />
      <EditProfile />
      <ViewWallet />
      <ViewNetwork />
    </div>
  );
};

export default ProfileUserPage;
