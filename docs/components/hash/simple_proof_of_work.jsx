import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Slider,
  Button,
  ButtonGroup,
  Stack,
} from "@mui/material";
import React from "react";

import sha256 from "crypto-js/sha256";

// Async sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function SimpleProofOfWork() {
  // The difficulty is the number of zeros in the hash
  const [difficulty, setDifficulty] = React.useState(1);
  // The hash is the result of the sha256 hash of the block
  const [hash, setHash] = React.useState(
    sha256(new Date().getTime().toString()).toString()
  );
  // The nonce is the number of iterations to find the hash
  const [nonce, setNonce] = React.useState(0);
  // If running is true, the hash is being calculated
  const [running, setRunning] = React.useState(false);

  // Keep calculating the hash until the hash has the correct number of zeros using react use effects
  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (running) {
        // Calculate the hash
        const newHash = sha256(hash + nonce).toString();
        setHash(newHash);
        // If the hash has the correct number of zeros, stop running
        if (newHash.endsWith("0".repeat(difficulty))) {
          setRunning(false);
        }
        // Otherwise, increment the nonce
        else {
          setNonce(nonce + 1);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [running, hash, nonce, difficulty]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Simple Proof Of Work</Typography>
        <Typography variant="subtitle1"> Difficulty </Typography>
        <Slider
          size="medium"
          value={difficulty}
          onChange={(e, v) => setDifficulty(v)}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        <Typography variant="subtitle1">
          Current Difficulty: {difficulty}
        </Typography>
        <Typography variant="subtitle1">
          {" "}
          Current iterations: {nonce}{" "}
        </Typography>
        <Typography variant="subtitle1">
          Current Hash: <b>{hash}</b>
        </Typography>
        <Typography variant="subtitle1">
          The difficulty is the number of zeros in the hash.
        </Typography>
        <Stack direction={"row"}>
          <Button
            onClick={() => {
              setNonce(0);
            }}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              setRunning(!running);
            }}
          >
            {running ? "Stop" : "Start"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
