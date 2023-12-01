import Editor from "@monaco-editor/react";
import React, { forwardRef, useRef, useState } from "react";
import { apiClient } from "../../../shared/services/api-client";
import axios from "axios";
import { Button } from "@mui/material";
import { useDetails } from "../../../shared/context/questionContext";
import { useAuthContext } from "../../../shared/hooks/useAuthContext";
import LoginPopUp from "../../user/components/LoginPopUp";

export const Ide = forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getCode,submitCode
  }));
  const editorRef = useRef(null);
  const skeletonCode = `#include<bits/stdc++.h>
  using namespace std;
  
  int main(){
      
      return 0;
  }`;
  const [status, setStatus] = useState("");
  const [jobId, setJobId] = useState("");
  const [duration, setDuration] = useState("");
  const {user}=useAuthContext();
  const { details, setGlobalDetails } = useDetails();
  const [authSub,setAuthSub]=useState(false);
  const getCode = async () => {
    const code = editorRef.current.getValue();
    const jsonObject = { language: "cpp", code: code,testCases:details.testCases,questionNumber:details.number };
    if(user==null){
      setAuthSub(true)
      return;
    }
    try {
      props.setResult("");
      setStatus("");
      setJobId("");
      setDuration("");
      setGlobalDetails({...details,success:"waiting"});
      const { data } = await apiClient.postSecure(
        process.env.REACT_APP_CODE_COMPILE,
        jsonObject,
        user.token
        );
        // console.log(data);
        // props.setResult(data.jobId);
        // setJobId(data.jobId);
        // console.log(data.success);
        if(data.success){
          const outputObject = {
            outputs: data.outputs.map(item => item.output)
          };
          
          const expectedObject = {
            expected: data.expected.map(item => item.output)
          };
          // console.log(data);
          setGlobalDetails({...details,outputs:outputObject.outputs,expected:expectedObject.expected,success:data.success})
        }
        else{
          setGlobalDetails({...details,success:data.success,error:data.details});
          console.log(data.details);
        }
        // setResult(data.output)
        // let intervalID;
        // intervalID = setInterval(async () => {
      //   const { data: dataRes } = await axios.get(
        //     process.env.REACT_APP_CODE_STATUS,
        //     { params: { id: data.jobId } }
      //   );
      //   const { success, job, error } = dataRes;
      //   if (success) {
        //     const { status: jobStatus, output: jobOutput } = job;
        //     setStatus(jobStatus);
        //     console.log(job);
        //     if (jobStatus === "success") {
      //       const start = new Date(job.startedAt);
      //       const end = new Date(job.completedAt);
      //       setDuration((end - start) / 1000);
      //     }
      //     if (jobStatus === "pending") return;
      //     props.setResult(jobOutput);
      //     clearInterval(intervalID);
      //   } else {
        //     setStatus("error");
        //     clearInterval(intervalID);
        //     props.setResult(error);
        //   }
        // }, 1000);
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        props.setResult(errMsg);
      } else {
        props.setResult("error connecting to server!");
      }
    }
  };
  const submitCode = async () => {
    const code = editorRef.current.getValue();
    const jsonObject = { language: "cpp", code: code,testCases:details.testCases,questionNumber:details.number };
    if(user==null){
      setAuthSub(true)
      return;
    }
    try {
      props.setResult("");
      setGlobalDetails({...details,success:"waiting"});
      const { data } = await apiClient.postSecure(
        process.env.REACT_APP_CODE_SUBMIT,
        jsonObject,
        user.token
        );
        console.log(data.success);
        if(data.success){
          const outputObject = {
            outputs: data.outputs.map(item => item.output)
          };
          
          const expectedObject = {
            expected: data.expected.map(item => item.output)
          };
          setGlobalDetails({...details,testCases:input,outputs:outputObject.outputs,expected:expectedObject.expected,success:data.success})
        }
        else{
          setGlobalDetails({...details,success:data.success});
        }
    } catch ({ response }) {
      if (response) {
        const errMsg = response.data.err.stderr;
        props.setResult(errMsg);
      } else {
        props.setResult("error connecting to server!");
      }
    }
  };
  const mount = (editor) => {
    editorRef.current = editor;
  };
  return (
    <>
      {/* <p>{status}</p>
    <p>{jobId&&`jobID: ${jobId}`}</p>
  <p>{duration&&`Elapsed Time: ${duration}s`}</p> */}
      <Editor
        height={"100%"}
        defaultLanguage="cpp"
        defaultValue={skeletonCode}
        onMount={mount}
        theme="vs-dark"
        className="editorInstance"
        />
{authSub&&<LoginPopUp prompt={authSub} setPrompt={setAuthSub}/>}
    </>
  );
});
