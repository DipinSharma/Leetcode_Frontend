import { Skeleton, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Example } from "./Example";
import { apiClient } from "../../../shared/services/api-client";
import { useParams } from "react-router-dom";
import { useDetails } from "../../../shared/context/questionContext";

export const Description = () => {
  const { details } = useDetails();


  return (
    <>
      <Box className="description" sx={{ padding: "20px" }}>
        {/* {details&&<Skeleton variant="rectangular" width={"100%"} height={118} />} */}
        <Typography variant="h4">{details ? `${details && details.number + "."} ${details.name}` :
          <>
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} />
          </>
        }</Typography>

        <Typography variant="p">{details ? `${details.description}` :
          <>
            <br />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"85%"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"70%"} />
            <br />
          </>
        }</Typography>
        {details ?
          details.examples.map((example, index) => (
            <Example
              key={index}
              no={index + 1}
              src={example.img}
              Input={example.input}
              Output={example.output}
              Explanation={example.explanation}
            />
          )) :
          <>
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"85%"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"70%"} />
            <br />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"85%"} />
            <Skeleton sx={{ bgcolor: "grey" }} type={"wave"} width={"70%"} />
          </>
        }
      </Box>
      {/* {console.log(details)}; */}
      {/* <toolbar className="toolbar">
        <Button onClick={() => alert("liked")}>Like</Button>
        <Button onClick={() => alert("Disliked")}>Dislike</Button>
        <Button onClick={() => alert("added to favorite")}>favorite</Button>
        <Button onClick={() => alert("share")}>share</Button>
        <Button onClick={() => alert("Feedback")}>feedback</Button>
      </toolbar> */}
    </>
  );
};
