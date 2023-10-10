import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { Example } from "./Example";
import { apiClient } from "../../../shared/services/api-client";

export const Description = () => {
  const [details, setDetails] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(
          "http://localhost:1234/problems/Largest%20Rectangle%20in%20Histogram"
        );
        setDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Box className="description">
        <Typography variant="h4">{`${details && details.number + "."} ${
          details && details.name
        }`}</Typography>
        <Typography variant="p">{`${
          details && details.description
        }`}</Typography>
        {details &&
          details.examples.map((example, index) => (
            <Example
              key={index}
              no={index}
              src={example.img}
              Input={example.input}
              Output={example.output}
              Explanation={example.explanation}
            />
          ))}
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
