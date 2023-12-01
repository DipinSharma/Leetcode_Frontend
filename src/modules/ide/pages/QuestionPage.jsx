import { useEffect, useState } from "react";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import LeftSide from "../components/LeftSide";
import RightSide from "../components/RightSide";
import { Header } from "../../../shared/components/Header";
import { DetailsProvider, useDetails } from "../../../shared/context/questionContext";
import { useParams } from "react-router-dom";
import { apiClient } from "../../../shared/services/api-client";
function QuestionPage() {
  const [sizes, setSizes] = useState([100, "10%", "auto"]);
  const {details, setGlobalDetails} = useDetails();
  const {id}=useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          `http://localhost:1234/problems/${id}`
        );
        // console.log(response.data);
        const updateData={
          ...response.data,
          outputs:new Array(response.data.testCases.length).fill(""),
          expected:new Array(response.data.testCases.length).fill("")
        }
        console.log("loaded")
        setGlobalDetails(updateData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
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
