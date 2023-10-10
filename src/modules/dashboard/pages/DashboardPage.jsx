import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import { Header } from "../../../shared/components/Header";
import UserDetails from "../components/UserDetails";
import QuestionPieChart from "../components/QuestionPieChart";
import StreakChart from "../components/StreakChart";
export default function DashboardPage() {
  return (
    <>
      <Header />
      <Box sx={{ width: "100%" }}>
        <Grid container>
          <Grid xs></Grid>
          <Grid xs={12} md={3}>
            <UserDetails />
          </Grid>
          <Grid xs={12} md={6}>
            <QuestionPieChart />
            <StreakChart />
          </Grid>
          <Grid xs></Grid>
        </Grid>
      </Box>
    </>
  );
}
