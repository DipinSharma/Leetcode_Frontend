import { useRef, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Ide } from "./Ide";
import Console from "./Console";
import { Box, Button } from "@mui/material";
import SplitButton from "./SelectLanguage";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
function RightSide() {
  const [sizes, setSizes] = useState(["100%", "100%", "auto"]);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [prev, setPrev] = useState([]);
  const [result, setResult] = useState("");
  const toggleConsoleVisibility = () => {
    setPrev(sizes);
    setIsConsoleVisible(!isConsoleVisible);
    if (!isConsoleVisible) {
      setSizes(prev);
    } else {
      setSizes(["100%", "8%", "auto"]);
    }
  };
  const handleSetSize = (newSize) => {
    if (isConsoleVisible) {
      setSizes(newSize);
    }
  };
  const IdeRef = useRef(null);
  const callIde = () => {
    if (IdeRef.current) {
      IdeRef.current.getCode();
    }
  };
  return (
    <div className="parentDivRight">
      <SplitPane
        split="horizontal"
        sizes={sizes}
        onChange={handleSetSize}
        resizerSize={6}
      >
        <Pane minSize="25%" maxSize="75%">
          <div className="top" style={{ height: sizes }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                backgroundColor: "rgba(101, 95, 95, 0.16)",
              }}
            >
              <SplitButton />
            </Box>
            <Ide size={sizes} ref={IdeRef} setResult={setResult} />
          </div>
        </Pane>
        <Pane minSize="25%" maxSize="75%">
          <div className="bottom">
            <Console result={result} />
          </div>
        </Pane>
      </SplitPane>
      <div className="controls">
        <Button variant="text" onClick={toggleConsoleVisibility}>
          Console
        </Button>
        <div className="Buttons">
          <Button variant="outlined" onClick={callIde}>
            Run
          </Button>
          <Button variant="contained" color="success">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RightSide;
