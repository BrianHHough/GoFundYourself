import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Moralis, { useMoralis, useWeb3ExecuteFunction, useMoralisWeb3Api } from "react-moralis";
import Logo from "../assets/Logos/LOGO_gofundyourself.png";

import { BodyCon } from "../components/HomePage/HomePageElements";

import {
  ColumnCon,
  ColumnLeft,
  ProgressStepper,
  ColumnRight,
  ProfileEditsCon,
  ProfileEditsTitle,
  SaveProfileInformationCon,
  SaveProfileInformation,
} from "../components/Profile/ProfileElements";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";

import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardActionArea from "@mui/material/CardActionArea";

const useStyles = makeStyles((theme) => ({
  root: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "grid",
    "& > *": {
      margin: theme.spacing(15),
    },
  },
  root2: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    display: "grid",
    height: "75%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    //   display: "none",
    position: "relative",
    top: 230,

    // marginTop: "50px"
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    color: "#00FCB9",
    //   marginTop: "20px"
    // left: "50%",
    // transform: "translateX(-30%)",
    position: "relative",
  },
}));

const steps = [
  {
    label: "Add a Project Title",
    description: `Add a title to your project.`,
  },
  {
    label: "Lets Get Your Photo setup",
    description: "Add your cover photo ",
  },
  {
    label: "Tell Us about your pitch!",
    description: `Give us a short pitch about your project.`,
  },
  {
    label: "Token Allocation",
    description: `How much token allocation do you want to give to the project?`,
  },
  {
    label: "Give up your services list",
    description: `These tokens can be redemed for any one of these services`,
  },
  {
    label: "Set your token Expiration Date",
    description: `When does the token expire?`,
  },
];

// Step 1: Create Json of all variable
// Step 2: Post Json to IPFS
// Step 3: execute the contract

////////////////////////////////////////


///////////////////////////

async function storeJsonToIPFS() {
  const token = process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY;
  if (!token) {
    throw new Error("No NFT Storage token");
  }
  debugger;
  if (!file) {
    throw new Error("No file");
  }

  const client = new NFTStorage({ token: token });

  const cid = await client.storeDirectory([file]);
  const gatewayUrl = `https://nftstorage.link/ipfs/${cid}/${file.name}`;
  console.log(cid, gatewayUrl);
  return {
    cid,
    gatewayUrl,
  };
}

async function httpRequestToSmartContract() {}

const onSubmitTokenizeMe = async (e) => {};

function ProjectCreation() {
  const { authenticate, isAuthenticated, user, enableWeb3 } = useMoralis();

  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const userAddress = user?.get("ethAddress");
  const userPFP = user?.get("profilePicture");

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [file, setFile] = useState("");
  const inputFileRef = React.useRef<HTMLInputElement | null>(null);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [value, setValue] = React.useState<
    number | string | Array<number | string>
  >(30);

  ///////////////// MORALIS Function Calll //////////////////

  const ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "approved",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "operator",
          type: "address",
        },
        {
          indexed: false,
          internalType: "bool",
          name: "approved",
          type: "bool",
        },
      ],
      name: "ApprovalForAll",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "jobIndex",
          type: "uint256",
        },
      ],
      name: "FinishProject",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      name: "MintNFT",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "string",
          name: "tokenURI",
          type: "string",
        },
      ],
      name: "ProjectCreatorCreateProject",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "USDC",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "WETH",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "WMATIC",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "approve",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "jobIndex", type: "uint256" }],
      name: "badJob",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes", name: "", type: "bytes" }],
      name: "checkUpkeep",
      outputs: [
        { internalType: "bool", name: "upkeepNeeded", type: "bool" },
        { internalType: "bytes", name: "performData", type: "bytes" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "jobIndex", type: "uint256" }],
      name: "completeJob",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getApproved",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "projectCreatorAddress",
          type: "address",
        },
      ],
      name: "getProjectCreator",
      outputs: [
        {
          components: [
            { internalType: "uint256", name: "totalJobCost", type: "uint256" },
            { internalType: "uint256", name: "jobTimeLimit", type: "uint256" },
            {
              internalType: "uint256[]",
              name: "jobsIssued",
              type: "uint256[]",
            },
            { internalType: "string", name: "tokenURI", type: "string" },
            { internalType: "uint16", name: "jobs", type: "uint16" },
            { internalType: "uint16", name: "jobsMinted", type: "uint16" },
            { internalType: "uint16", name: "jobsCompleted", type: "uint16" },
          ],
          internalType: "struct ProjectCreator",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getProjectStatus",
      outputs: [
        { internalType: "enum WorkToken.tokenStatus", name: "", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "getProjectURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "operator", type: "address" },
      ],
      name: "isApprovedForAll",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "jobLimit",
      outputs: [{ internalType: "uint16", name: "", type: "uint16" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "projectCreatorAddress",
          type: "address",
        },
        { internalType: "uint16", name: "t", type: "uint16" },
      ],
      name: "mintNFT",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint16", name: "jobs", type: "uint16" },
        { internalType: "uint256", name: "jobTimeLimit", type: "uint256" },
        { internalType: "string", name: "tokenURI", type: "string" },
      ],
      name: "newProjectCreator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "ownerOf",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes", name: "performData", type: "bytes" }],
      name: "performUpkeep",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint16", name: "jobs", type: "uint16" },
        { internalType: "uint256", name: "jobTimeLimit", type: "uint256" },
        { internalType: "string", name: "tokenURI", type: "string" },
      ],
      name: "projectCreatorChangeJob",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "projectCreators",
      outputs: [
        { internalType: "uint256", name: "totalJobCost", type: "uint256" },
        { internalType: "uint256", name: "jobTimeLimit", type: "uint256" },
        { internalType: "string", name: "tokenURI", type: "string" },
        { internalType: "uint16", name: "jobs", type: "uint16" },
        { internalType: "uint16", name: "jobsMinted", type: "uint16" },
        { internalType: "uint16", name: "jobsCompleted", type: "uint16" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
        { internalType: "bytes", name: "_data", type: "bytes" },
      ],
      name: "safeTransferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "operator", type: "address" },
        { internalType: "bool", name: "approved", type: "bool" },
      ],
      name: "setApprovalForAll",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "startTotalJobCost",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "bytes4", name: "interfaceId", type: "bytes4" }],
      name: "supportsInterface",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenCounter",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokenIdToExpiryTime",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokenIdToProjectCreator",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      name: "tokenIdToStatus",
      outputs: [
        { internalType: "enum WorkToken.tokenStatus", name: "", type: "uint8" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
      name: "tokenURI",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "tokenId", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "upgradeProjectCreator",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  //   const readOptions = {
  //     contractAddress: "0xe...56",
  //     functionName: "message",
  //     abi: ABI,
  //   };
  const Web3Api = useMoralisWeb3Api();

  const contractAddress = "0xE6D97d1aEaCb293Aa8Ae62EAe0Dfd7c8D8e0bdab";
 // https://github.com/MoralisWeb3/react-moralis#useweb3executefunction
  const { data, error, fetch, isFetching } = useWeb3ExecuteFunction({
    abi: ABI,
    contractAddress: contractAddress,
    functionName: "symbol",
    // params: {
    //   secondsAgos: [0, 10],
    // },
  });

  /////////////////////////////////////////////////////////

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

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
      alert("Please, select file you want to upload");
      return;
    }

    setIsLoading(true);

    /* Add files to FormData */
    const formData = new FormData();
    Object.values(inputFileRef.current.files).forEach((file) => {
      formData.append("file", file);
    });

    /* Send request to our api route */
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const body = (await response.json()) as {
      status: "ok" | "fail";
      message: string;
    };

    alert(body.message);

    if (body.status === "ok") {
      inputFileRef.current.value = "";
      // Do some stuff on successfully upload
    } else {
      // Do some stuff on error
    }

    setIsLoading(false);
  };

  const MoralisFetch = async () => {

    await enableWeb3();

    fetch()

  }

  if (isAuthenticated)
    return (
      <>
        <div>hello</div>
        <div>
            {error && <h1> {error} </h1>}
            <button onClick={ MoralisFetch }  disabled={isFetching}>Fetch data</button>
            {data && <pre>
            {JSON.stringify(data)}
            </pre>}
        </div>

      </>
    );
  if (!isAuthenticated)
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
          <h1>Hey you are logged in authenticated!</h1>
          <ColumnCon>
            <ColumnLeft>
              <ProgressStepper>
                <Box sx={{ maxWidth: 400 }}>
                  <Stepper activeStep={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                      <Step key={step.label}>
                        <StepLabel
                          optional={
                            index === 5 ? (
                              <Typography variant="caption">
                                Last step
                              </Typography>
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
                                {index === steps.length - 1
                                  ? "Finish"
                                  : "Continue"}
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
                      <Typography>
                        All steps completed - you&apos;re finished
                      </Typography>
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
                {/* Add Project Title */}
                {(activeStep === 0 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>
                        Add your Project Title
                      </ProfileEditsTitle>

                      <div className={classes.root}>
                        <FormGroup row>
                          <TextField
                            id="outlined-basic"
                            label="Projects"
                            variant="outlined"
                          />
                          <Button variant="contained">Contained</Button>
                        </FormGroup>
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}

                {/* Lets Get Your Photo Setup */}
                {(activeStep === 1 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>
                        Let's Get Your photo Setup
                      </ProfileEditsTitle>
                      <div className={classes.root2}>
                        <FormGroup>
                          {imageUrl && selectedImage && (
                            <Box
                              sx={{ border: "2px grey" }}
                              mb={1}
                              mr={1}
                              textAlign="center"
                            >
                              <img
                                src={imageUrl}
                                alt={selectedImage.name}
                                height="100px"
                              />
                            </Box>
                          )}
                          <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: "none" }}
                            onChange={(e) =>
                              setSelectedImage(e.target.files[0])
                            }
                          />
                          <label htmlFor="select-image">
                            <Box mr={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                component="span"
                              >
                                Upload Image
                              </Button>
                            </Box>
                          </label>
                        </FormGroup>
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}

                {/* Tell Us about your pitch! */}
                {(activeStep === 2 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>Give us your pitch!</ProfileEditsTitle>
                      <div className={classes.root2}>
                        <TextField
                          id="outlined-multiline-static"
                          label="Description"
                          multiline
                          rows={4}
                          defaultValue="Tell us about your project"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}

                {/* Token Allocation */}
                {(activeStep === 3 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>Token Allocation</ProfileEditsTitle>
                      <div className={classes.root}>
                        <Box sx={{ width: 250 }}>
                          <Typography id="input-slider" gutterBottom>
                            Token Allocation
                          </Typography>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Slider
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                              />
                            </Grid>
                            <Grid item sx={{ width: 75 }}>
                              <MuiInput
                                value={value}
                                size="small"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                  step: 1,
                                  min: 0,
                                  max: 100,
                                  type: "number",
                                  "aria-labelledby": "input-slider",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}

                {/* Give up your services list */}
                {/*FIX THIS SERVICE FEATURE */}
                {(activeStep === 4 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>
                        Choose your services list
                      </ProfileEditsTitle>
                      <div className={classes.root2}>
                        <Grid container spacing={2}>
                          <Grid item xs>
                            <Card sx={{ maxWidth: 200 }}>
                              <CardActionArea href="">
                                <CardMedia
                                  component="img"
                                  alt="Dog"
                                  height="100"
                                  image="https://www.newshub.co.nz/home/lifestyle/2019/11/dog-years-are-a-myth-2-year-old-dogs-already-middle-aged-scientists/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1574572358818/GETTY-labrador-puppy-1120.jpg"
                                />
                                <CardContent>
                                  <Typography align="center">
                                    Click me!
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                          <Grid item xs>
                            <Card sx={{ maxWidth: 200 }}>
                              <CardActionArea href="">
                                <CardMedia
                                  component="img"
                                  alt="green iguana"
                                  height="100"
                                  image="https://www.newshub.co.nz/home/lifestyle/2019/11/dog-years-are-a-myth-2-year-old-dogs-already-middle-aged-scientists/_jcr_content/par/video/image.dynimg.1280.q75.jpg/v1574572358818/GETTY-labrador-puppy-1120.jpg"
                                />
                                <CardContent>
                                  <Typography align="center">
                                    Click me!
                                  </Typography>
                                </CardContent>
                              </CardActionArea>
                            </Card>
                          </Grid>
                        </Grid>
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}

                {/* Set your token Expiration Date */}
                {(activeStep === 5 &&
                  (userPFP == null || undefined ? (
                    <>
                      <ProfileEditsTitle>
                        When will the token Expire?
                      </ProfileEditsTitle>
                      <div className={classes.root}>
                        <Box sx={{ width: 250 }}>
                          <Typography id="input-slider" gutterBottom>
                            Token Expiration Date (Days)
                          </Typography>
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                              <Slider
                                value={typeof value === "number" ? value : 0}
                                onChange={handleSliderChange}
                                aria-labelledby="input-slider"
                              />
                            </Grid>
                            <Grid item sx={{ width: 75 }}>
                              <MuiInput
                                value={value}
                                size="small"
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                inputProps={{
                                  step: 1,
                                  min: 0,
                                  max: 100,
                                  type: "number",
                                  "aria-labelledby": "input-slider",
                                }}
                              />
                            </Grid>
                          </Grid>
                        </Box>
                      </div>
                    </>
                  ) : (
                    ""
                  ))) ||
                  (userPFP > 0 ? (
                    <ProfileEditsTitle>
                      You already have a profile picture:
                    </ProfileEditsTitle>
                  ) : (
                    ""
                  ))}
              </ProfileEditsCon>
            </ColumnRight>
          </ColumnCon>
        </BodyCon>
      </>
    );
}

export default ProjectCreation;
