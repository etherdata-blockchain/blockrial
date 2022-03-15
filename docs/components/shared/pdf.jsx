import React from "react";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack5";
import { Stack } from "@mui/material";

export default function PDFComponent({ url }) {
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Stack
      style={{ width: "100%" }}
      alignContent={"center"}
      justifyContent="center"
    >
      {/* <Pagination
        count={numPages}
        style={{ width: "100%" }}
        onChange={(e, page) => {
          setPageNumber(page);
        }}
      />
      <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document> */}
      <Button
        variant="outlined"
        onClick={() => {
          window.open(url, "_blank").focus();
        }}
      >
        Download ETD WhitePaper
      </Button>
    </Stack>
  );
}
