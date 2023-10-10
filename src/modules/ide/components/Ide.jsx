import Editor from "@monaco-editor/react";
import React, { forwardRef, useRef, useState } from "react";
import { apiClient } from "../../../shared/services/api-client";
import axios from "axios";
import { Button } from "@mui/material";

export const Ide = forwardRef((props, ref) => {
  React.useImperativeHandle(ref, () => ({
    getCode,
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
  const getCode = async () => {
    const code = editorRef.current.getValue();
    const jsonObject = { language: "cpp", code: code };
    try {
      props.setResult("");
      setStatus("");
      setJobId("");
      setDuration("");
      const { data } = await apiClient.post(
        process.env.REACT_APP_CODE_COMPILE,
        jsonObject
      );
      // console.log(data);
      // props.setResult(data.jobId);
      setJobId(data.jobId);
      let intervalID;
      intervalID = setInterval(async () => {
        const { data: dataRes } = await axios.get(
          process.env.REACT_APP_CODE_STATUS,
          { params: { id: data.jobId } }
        );
        const { success, job, error } = dataRes;
        if (success) {
          const { status: jobStatus, output: jobOutput } = job;
          setStatus(jobStatus);
          console.log(job);
          if (jobStatus === "success") {
            const start = new Date(job.startedAt);
            const end = new Date(job.completedAt);
            setDuration((end - start) / 1000);
          }
          if (jobStatus === "pending") return;
          props.setResult(jobOutput);
          clearInterval(intervalID);
        } else {
          setStatus("error");
          clearInterval(intervalID);
          props.setResult(error);
        }
      }, 1000);
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
    </>
  );
});
