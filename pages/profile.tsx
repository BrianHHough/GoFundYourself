import React, {useState, useEffect, useRef} from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/core/styles';
import Moralis, { useMoralis, useMoralisFile } from "react-moralis";
import Logo from "../assets/Logos/LOGO_gofundyourself.png"
import { NFTStorage } from 'nft.storage'
import TextAreaBioUpdate from '../components/TextAreaBioUpdate'
import PersonalBio from '../components/PersonalBio'

import {
  BodyCon
} from "../components/HomePage/HomePageElements"

import {
    ColumnCon, 

    ColumnLeft, ProgressStepper,
    
    ColumnRight, ProfileEditsCon, ProfileEditsTitle, SaveProfileInformationCon, SaveProfileInformation
} from "../components/Profile/ProfileElements"

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import { debug } from 'console'

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
        
        //   marginTop: "20px"
        // left: "50%",
        // transform: "translateX(-30%)",
        // left: "50%",
        // transform: "translateX(-50%)",
        // position: "relative",
        // left: "50%",
        // transform: "translateX(-50%)",
        
    }
  }));

const steps = [
    {
        label: 'Add a Profile Picture',
        description: `Mint your profile picture to the blockchain with IPFS using NFT.Storage`,
    },
    {
        label: 'Lets Get Your Profile Set Up',
        description: 'Sync your profile data elements to your ETH wallet using Moralis',
    },
    {
        label: 'Tell Us About Yourself',
        description: `We know you LOVE web3 and blockchain, but like, who are you, really? Tell us everything (but not in a weird way)`,
    },
    {
        label: 'Confirm Your Profile',
        description: `Everything look good?`,
    },
  ];

function Profile () {
    const { 
        authenticate, 
        isAuthenticated, 
        user,
    } = useMoralis();

    const { saveFile, moralisFile } = useMoralisFile();
    const [photoFile, setPhotoFile] = useState(null); //selectedImage, setSelectedImage
    const [photoFileName, setPhotoFileName] = useState();
    const [profilePicture, setProfilePicture] = useState(); //imageUrl, setImageUrl
    const [profileName, setProfileName] = useState("");
    const [profileDo, setProfileDo] = useState("");
    const [profileLocation, setProfileLocation] = useState("");
    const [profileEmail, setProfileEmail] = useState("");
    const [profileBio, setProfileBio] = useState("");
    

    const classes = useStyles();

    const [activeStep, setActiveStep] = useState(0);
    const userAddress = user?.get("ethAddress");
    const userPFP = user?.get("profilePicture");
    console.log(userPFP)

    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [file, setFile] = useState("")
    const [fileSrc, setFileSrc] = useState("")
    const inputFileRef = React.useRef<HTMLInputElement | null>(null);
    console.log(file)

    console.log(inputFileRef)
    console.log(fileSrc);
    console.log(file);
  
    //   PROGRESS STEPPER
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };


    const handleOnClick = async (e: React.MouseEvent<HTMLInputElement>) => {

        /* Prevent form from submitting by default */
        e.preventDefault();

        /* If file is not selected, then show alert message */
        if (!inputFileRef.current?.files?.length) {
            alert('Please, select file you want to upload');
            return;
        }

        setIsLoading(true);

        /* Add files to FormData */
        const formData = new FormData();
        Object.values(inputFileRef.current.files).forEach(file => {
            formData.append('file', file);
        })

        /* Send request to our api route */
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });

        const body = await response.json() as { status: 'ok' | 'fail', message: string };

        alert(body.message);

        if (body.status === 'ok') {
            inputFileRef.current.value = '';
            // Do some stuff on successfully upload
        } else {
            // Do some stuff on error
        }

        setIsLoading(false);
    };

    // useEffect(() => {
    //   const src = URL.createObjectURL(new Blob([file], { type: 'image/*'}))
    //   setFileSrc(src)
    // }, [file])
    

    async function storeFileWithNftStorage(file: File) {
        const token = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY
        if (!token) {
            throw new Error('No NFT Storage token')
        }
    
        const client = new NFTStorage({ token: token })
        const cid = await client.storeDirectory([file])
        const gatewayUrl = `https://nftstorage.link/ipfs/${cid}/${file.name}`
        return {
            cid,
            gatewayUrl
        }
    }
    const onChangePhoto = (e) => {
        setPhotoFile(e.target.files[0]);
        setPhotoFileName(e.target.files[0].name);
      };

    useEffect(() => {
        if (photoFile) {
            setProfilePicture(URL.createObjectURL(photoFile));
        }
    }, [photoFile]);

   // const [photoFile, setPhotoFile] = useState(null); //selectedImage, setSelectedImage
   // const [photoFileName, setPhotoFileName] = useState();
   // const [profilePicture, setProfilePicture] = useState(); //imageUrl, setImageUrl

    const onSubmitPhoto = async () => {
        const file: any = photoFile;
        const name: any = photoFileName;
        let fileIpfs = await saveFile(name, file, { saveIPFS: true });
        // @ts-ignore
        user?.set("profilePicture", fileIpfs?._ipfs);
        await user?.save();
        // setProfilePicture(user?.attributes.profilePicture._url);
      };

    const onSubmitProfile = async (e) => {
    
    /*
    ** Mapping to Moralis server
    * varaible here -> variable in moralis _User
    * profileName -> name
    * profileDo -> profession
    * profileLocation -> location
    * profileEmail -> email
    */  
        e.preventDefault();
        const name: string = profileName;
        const profession: string = profileDo;
        const location: string = profileLocation;
        const email: string = profileEmail; 
        // @ts-ignore
        user?.set("name", name);
        user?.set("profession", profession);
        user?.set("location", location);
        user?.set("email", email);

        await user?.save();
        
        //Change text on submit button after user submits their info
        document.getElementById("submitProfileButton").childNodes[0].nodeValue="Submitted... Go to next step!"

    };



    // const onSubmitBio = async (e) => {

    // // Mapping to Moralis server
    // // varaible here -> variable in moralis _User
    // // profileBio -> profileBio
    //     e.preventDefault();
    //     const bio: string = profileBio;
    //     // @ts-ignore
    //     user?.set("profileBio", bio);

    //     await user?.save();
    // };


    

  if(!isAuthenticated)
  return (
    <>
    <div>
        hello
    </div>
    </>
  )
  if(isAuthenticated)
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>GoFundYourself</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
      <BodyCon>
      <h1>Hey there, welcome to GoFundYourself!</h1>
    <ColumnCon>

      <ColumnLeft>
        <ProgressStepper>
            <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                <Step key={step.label}>
                    <StepLabel
                    optional={
                        index === 3 ? (
                        <Typography variant="caption">Last step</Typography>
                        ) : null
                    }
                    >
                    {step.label}
                    </StepLabel>
                    <StepContent>
                    <Typography>{step.description}</Typography>
                    <Box sx={{ mb: 2 }}>
                        <div>
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Back
                        </Button>
                        </div>
                    </Box>
                    </StepContent>
                </Step>
                ))}
            </Stepper>
        {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
            </Button>
            </Paper>
        )}
        </Box>
        </ProgressStepper>
    </ColumnLeft>

    <ColumnRight>
        <ProfileEditsCon>

        {/* Add Profile Step */}
        {activeStep === 0  ?
            <>
            <ProfileEditsTitle>
                First step, pick a profile picture!
            </ProfileEditsTitle>
            {profilePicture === undefined ? 
            <div className={classes.root}>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <Avatar className={classes.large}/>
                    </IconButton>
                </label>
            </div>
            :
            <div style={{width: "100%", transform: "translateX(35%)", marginTop: "20px"}}>
                <Image src={profilePicture} alt="logo" width="160" height="160" className={classes.imagePreview}/>
            </div>
            }
            <div style={{width: "100%"}}>
            </div>
            <input 
                    accept="image/*" 
                    className={classes.input} 
                    id="icon-button-file" 
                    type="file"
                    name="myfile"
                    ref={inputFileRef}
                    onChange={onChangePhoto}
            />
            <SaveProfileInformationCon>
                <SaveProfileInformation 
                    style={{justifyContent: "center"}}
                    type="submit"
                    value={isLoading? "Minting..." : "Upload to IPFS" }
                    disabled={isLoading} 
                    // @ts-ignore
                    // onClick={storeFileWithNftStorage(file)}
                    onClick={onSubmitPhoto}
                />
            </SaveProfileInformationCon>
            </>
            : 
            ""
            // <>
            // <ProfileEditsTitle>
            //     You already have a profile picture:
            // </ProfileEditsTitle>
            // <div style={{width: "100%", transform: "translateX(35%)", marginTop: "20px"}}>
            //     <Image src={userPFP} alt="logo" width="160" height="160" className={classes.imagePreview}/>
            // </div>
            // Ta-da!
            // </>
        }
 

        
        {activeStep === 1 ?
            <>
            <ProfileEditsTitle>
                Second step, some basic information.
            </ProfileEditsTitle>
            <div className="flex w-screen h-screen items-center justify-center">
            <form onSubmit={onSubmitProfile}>
                <div>
                <input
                    type="text"
                    className="border-[1px] p-2 text-lg border-black w-full"
                    value={profileName}
                    placeholder="What is your name?"
                    onChange={(e) => setProfileName(e.target.value)}
                />
                </div>
                <div className="mt-3">
                <input
                    type="text"
                    className="border-[1px] p-2 text-lg border-black w-full"
                    value={profileDo}
                    placeholder="What do you do?"
                    onChange={(e) => setProfileDo(e.target.value)}
                />
                </div>
                <div className="mt-3">
                <input
                    type="text"
                    className="border-[1px] p-2 text-lg border-black w-full"
                    value={profileLocation}
                    placeholder="Where are you from?"
                    onChange={(e) => setProfileLocation(e.target.value)}
                />
                </div>
                <div className="mt-3">
                <input
                    type="text"
                    className="border-[1px] p-2 text-lg border-black w-full"
                    value={profileEmail}
                    placeholder="What's your email?"
                    onChange={(e) => setProfileEmail(e.target.value)}
                />
                </div>


                <button
                type="submit"
                id="submitProfileButton"
                className="mt-5 w-full p-5 bg-green-700 text-white text-lg rounded-xl animate-pulse"
                >
                Submit
                </button>

            </form>
            </div>
            </>
        :
        ""
        }

        {activeStep === 2 ?
            <>
            <ProfileEditsTitle>
                    Third step, your story.
            </ProfileEditsTitle>
                <TextAreaBioUpdate
                    rows={12}
                    cols={50}
                    limit={560}
                    value="What is your story?"
                />
            </>
            :
            ""
        }

        {activeStep === 3 ?
            <>
            <ProfileEditsTitle>
                    Confirm Your Profile
            </ProfileEditsTitle>
                <PersonalBio />
            </>
            :
            ""
        }


        </ProfileEditsCon>

    </ColumnRight>

    </ColumnCon>

      </BodyCon>
    </>
  )
}

export default Profile
