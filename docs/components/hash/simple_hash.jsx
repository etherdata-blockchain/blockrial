import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import React from "react";

import sha256 from "crypto-js/sha256";
import sha512 from "crypto-js/sha512";
import sha384 from "crypto-js/sha384";
import hmacSHA512 from "crypto-js/hmac-sha512";

const hashFunctions = [
  {
    title: "sha256",
    function: sha256,
  },
  {
    title: "sha512",
    function: sha512,
  },
  {
    title: "sha384",
    function: sha384,
  },
];
 
export default function SimpleHash() {
  const [hashFunction, setHashFunction] = React.useState(hashFunctions[0]);
  const [input, setInput] = React.useState("");
  const [hash, setHash] = React.useState("");

   React.useEffect(() => {
    // Get hash result
    const hash = hashFunction.function(input).toString();
    // Update hash result
    setHash(hash);
  }, [input, hashFunction])

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Hash Function Playground</Typography>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Hash Functions
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue={hashFunctions[0].title}
            onChange={(event) => {
              // Get hash function
              const hashFunction = hashFunctions.find(
                (h) => h.title === event.target.value
              );
              // Set hash function
              setHashFunction(hashFunction);
            }}
          >
            {hashFunctions.map((hashFunction) => (
              <FormControlLabel
                key={hashFunction.title}
                value={hashFunction.title}
                control={<Radio />}
                label={hashFunction.title}
              />
            ))}
          </RadioGroup>
        </FormControl>

        <Typography>Input Value</Typography>
        <FormControl style={{ width: "100%" }}>
          <TextField
            value={input}
            fullWidth
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
        </FormControl>
        <Typography>Result</Typography>
        <Typography>{hash}</Typography>
      </CardContent>
    </Card>
  );
}
