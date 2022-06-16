import React from 'react'
import Moralis, { useMoralis } from "react-moralis";
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'


const PersonalBio = () => {

  const { user } = useMoralis();
  
  const profileName = user?.get("name");
  const profileLocation = user?.get("location");
  const profileDo = user?.get("profession"); 
  const profileEmail = user?.get("email");
  const profileBio = user?.get("profileBio");
  const profilePicture = user?.get("profilePicture");  

  const style = {margin: 10}
  
  const useStyles = makeStyles((theme) => ({
    root: {
        alignSelf: 'center',
        justifyContent: "center",
        alignItems: "center",
        display: 'grid',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        //   display: "none",
        position: 'relative',
        left: "50%",
        transform: "translateX(-50%)",
        // top: 230,
        
        // marginTop: "50px"
        
    },
    large: {
        width: 160,
        height: 160,
        color: "#00FCB9",
        
    }
  }));

  const classes = useStyles();

  return (
    <>
      <div style={style}>
        Name: {profileName} <br/>
        Location: {profileLocation} <br/>
        Profession: {profileDo} <br/>
        Email: {profileEmail} <br/><br/>
        {profileBio} <br/><br/>


            <div style={{width: "100%", transform: "translateX(35%)", marginTop: "20px"}}>
                <Image src={profilePicture} alt="logo" width="160" height="160"/>
            </div>     *
      </div>
    </>
  );
};




export default PersonalBio
