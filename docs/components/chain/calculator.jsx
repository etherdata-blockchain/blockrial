import {
  Card,
  CardContent,
  Slider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import sha256 from "crypto-js/sha256";
import React from "react";

export default function Calculator(props) {
  // The difficulty is the number of zeros in the hash
  const [difficulty, setDifficulty] = React.useState(2);
  // The hash is the result of the sha256 hash of the block
  const [hash, setHash] = React.useState(props.defaultHash);
  const [basedOnHash, setBasedOnHash] = React.useState(props.defaultHash);
  // The nonce is the number of iterations to find the hash
  const [nonce, setNonce] = React.useState(0);
  // If running is true, the hash is being calculated
  const [running, setRunning] = React.useState(false);

  // Keep calculating the hash until the hash has the correct number of zeros using react use effects
  React.useEffect(() => {
    const interval = setInterval(async () => {
      if (running) {
        // Calculate the hash
        const newHash = sha256(basedOnHash + nonce).toString();
        setHash(newHash);
        // If the hash has the correct number of zeros, stop running
        if (newHash.endsWith("0".repeat(difficulty))) {
          props.onFound(newHash);
          setBasedOnHash(newHash);
        }
        // Otherwise, increment the nonce
        else {
          setNonce(nonce + 1);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [running, hash, nonce, difficulty, basedOnHash]);

  return (
    <Card>
      <CardContent>
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
        <Typography>
          Based On: <b>{basedOnHash}</b>
        </Typography>
        <Stack direction={"row"}>
          <Button
            onClick={() => {
              setNonce(0);
              setBasedOnHash(props.defaultHash);
              props.onReset();
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
