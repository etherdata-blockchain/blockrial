import sha256 from "crypto-js/sha256";
import React from "react";
import Calculator from "./calculator";
import ReactFlow from "react-flow-renderer";

const elements = [
  {
    id: "1",
    data: { label: "Input Node" },
    position: { x: 0, y: 0 },
  },
  // default node
  {
    id: "2",
    data: { label: "Input Node" },
    position: { x: 0, y: 80 },
  },
  {
    id: "3",
    data: { label: "Output Node" },
    position: { x: 0, y: 160 },
  },
  // animated edge
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
];

export default function Chain() {
  // States for storing blocks
  const [blocks, setBlocks] = React.useState([]);
  const [numOfBlocks, setNumBlocks] = React.useState(0);

  const addNewBlock = React.useCallback(
    (hash) => {
      const x = 0;
      const y = numOfBlocks * 100;

      blocks.push({
        id: `${numOfBlocks + 1}`,
        data: {
          label: `${numOfBlocks + 1}: ${hash.substring(
            0,
            3
          )}...${hash.substring(hash.length - 3, hash.length)}`,
        },
        position: { x: x, y: y },
      });

      if (numOfBlocks > 0) {
        // add edge
        blocks.push({
          id: `e${numOfBlocks}-${numOfBlocks + 1}`,
          source: `${numOfBlocks}`,
          target: `${numOfBlocks + 1}`,
          animated: true,
        });
      }
      setBlocks(JSON.parse(JSON.stringify(blocks)));
      setNumBlocks(numOfBlocks + 1);
    },
    [blocks, numOfBlocks]
  );

  return (
    <div>
      <Calculator
        defaultHash={sha256("init").toString()}
        onFound={(foundHash) => {
          addNewBlock(foundHash);
        }}
        onReset={() => {
          setBlocks([]);
          setNumBlocks(0);
        }}
      />
      <div
        style={{
          height: numOfBlocks * 100,
          width: 200,
          marginTop: 10,
          marginRight: 100,
        }}
      >
        <ReactFlow
          elements={blocks}
          zoomOnDoubleClick={false}
          preventScrolling={false}
          zoomOnPinch={false}
          zoomOnScroll={false}
          panOnScroll={false}
        />
      </div>
    </div>
  );
}
