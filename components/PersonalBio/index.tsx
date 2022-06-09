import React from 'react'
import Moralis, { useMoralis } from "react-moralis";

const PersonalBio = () => {

  const { user } = useMoralis();
  
  const profileName = user?.get("name");
  const profileLocation = user?.get("location");
  const profileDo = user?.get("profession"); 
  const profileEmail = user?.get("email")

  return (
    <>
      <div>
        Name: {profileName} <br/>
        Location: {profileLocation} <br/>
        Profession: {profileDo} <br/>
        Email: {profileEmail}
      </div>
    </>
  );
};



export default PersonalBio
