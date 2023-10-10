import { useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Header } from "../../../shared/components/Header";
function QuestionPage() {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);

  return (
    <>
      <Header />
      <div className="parentDiv">
        <SplitPane split="vertical" sizes={sizes} onChange={setSizes} resizerSize={6}>
          <Pane minSize={50} maxSize="90%">
            <div className="leftSide">
              <LeftSide />
            </div>
          </Pane>
          <div className="rightSide">
            <RightSide />
          </div>
        </SplitPane>
      </div>
    </>
  );
}
export default QuestionPage;
