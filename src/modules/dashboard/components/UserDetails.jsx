import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import "../../../dashboard.css";
// import "../../../index.css";

const UserDetails = () => {
  return (
    <section className="userDetailsContainer">
      <div className="userDetails">
        <img src="https://assets.leetcode.com/users/avatars/avatar_1662261711.png"></img>
        <div>
          <Typography variant="h4">Dipin Sharma</Typography>
          <Typography variant="h6">dipinsharma</Typography>
        </div>
      </div>
      <Toolbar>
        <Button
          sx={{
            width: "100%",
            backgroundColor: "rgba(61, 209, 61, 0.386)",
            color: "rgb(18, 216, 18)",
            border: "1px solid transparent",
            borderRadius: "10px",
            transition: "all 0.25s ease",
            "&:hover": {
              border: "1px solid rgb(18, 216, 18)",
              backgroundColor: " rgba(61, 209, 61, 0.203)",
            },
          }}
          variant="text"
        >
          Edit Profile
        </Button>
      </Toolbar>
      <Toolbar aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              Linkedin
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              Github
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              Linkedin
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton component="a" href="#simple-list">
              Github
            </ListItemButton>
          </ListItem>
        </List>
      </Toolbar>
      <Divider variant="middle" sx={{ backgroundColor: "#ffffff" }} />
      <Toolbar sx={{flexDirection:"column" ,alignItems:"flex-start"}}>
        <Typography variant="h4"> Languages</Typography>
        <List sx={{ width: '100%' }}>
      {["c++", "JavaScript"].map((value,index) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <ListItemText primary={`${index*20+22} problems solved`}/>
          }
        >
          <ListItemText primary={`${value}`} />
        </ListItem>
      ))}
    </List>
      </Toolbar>
    </section>
  );
};

export default UserDetails;
