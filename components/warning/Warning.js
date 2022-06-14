import { useState } from "react";
import Link from "next/link";
import { Box, Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Warning = () => {
  const [open, setOpen] = useState(true);

  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="info"
          color="error"
          sx={{ mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          This project is deployed to Mumbai Testnet as an MVP for the 2022
          Metaverse Hackathon, it is currently NOT SECURED FOR MAINNET LAUNCH.
          If you want to participate as contributor or an early access tester,
          contact{" "}
          <strong>
            <Link href="/"> brofundme0@gmail.com</Link>
          </strong>
          {/* how to do with this email*/}
        </Alert>
      </Collapse>
    </Box>
  );
};

export default Warning;
