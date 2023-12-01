import { useRef, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import { Ide } from "./Ide";
import Console from "./Console";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import SplitButton from "./SelectLanguage";
import { useDetails } from "../../../shared/context/questionContext";
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
function RightSide() {
  const {details}=useDetails();
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
  const submitIde = () => {
    if (IdeRef.current) {
      IdeRef.current.submitCode();
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
        {details.success!="waiting" && <Button variant="text" onClick={toggleConsoleVisibility}>
          Console
        </Button>}
        {details.success=="waiting" &&<CircularProgress color="inherit" />    
          }
        <div className="Buttons">
          <Button variant="outlined" onClick={callIde} disabled={details.success=="waiting"} sx={{marginRight:"20px" ,fontWeight:"900"}} color="error">
            Run
          </Button>
          <Button variant="contained"onClick={callIde} color="success" disabled={details.success=="waiting"} sx={{marginRight:"10px",fontWeight:"900"}}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
export default RightSide;
