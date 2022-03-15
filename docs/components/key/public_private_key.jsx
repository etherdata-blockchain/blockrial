import React from "react";
import keypair from "keypair";
import {
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import rs from "jsrsasign";

export default function PublicPrivateKey() {
  const [publicKey, setPublicKey] = React.useState("");
  const [privateKey, setPrivateKey] = React.useState("");
  const [enteredPublicKey, setEnteredPublicKey] = React.useState("");
  const [enteredPrivateKey, setEnteredPrivateKey] = React.useState("");
  const [enteredPublicKeyMessage, setEnteredPublicKeyMessage] =
    React.useState("");
  const [generatedPrivateKeyMessage, setGeneratedPrivateKeyMessage] =
    React.useState("");

  return (
    <Stack gap={2}>
      <Card>
        <CardContent>
          <Stack p={1} gap={2}>
            <Typography>Public Private Key Demo</Typography>
            <TextField
              label="Your private key"
              value={privateKey}
              multiline={4}
              lines={4}
            />
            <TextField label="Your public key" value={publicKey} />
            <Button
              onClick={() => {
                const key = keypair();
                setPublicKey(key.public);
                setPrivateKey(key.private);
              }}
            >
              Generate Key Pair
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Stack p={1} gap={2}>
            <Typography>Encrypt</Typography>
            <TextField value={enteredPublicKeyMessage} label={"Message"} />
            <TextField value={enteredPublicKey} label={"public key"} />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Stack p={1} gap={2}>
            <Typography>Decrypt</Typography>
            <TextField value={generatedPrivateKeyMessage} label={"Message"} />
            <TextField value={enteredPrivateKey} label={"private key"} />
            <Button>Decrypt</Button>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
