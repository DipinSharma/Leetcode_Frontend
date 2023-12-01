import { Button } from "@mui/material";
import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";

const StreakChart = () => {
  return (
    <div className="streakChart">
      <Button variant="outlined">Year</Button>
      <CalendarHeatmap
        startDate={new Date("2016-01-01")}
        endDate={new Date("2017-01-01")}
        gutterSize={2}
        values={[
          { date: "2016-01-01", count: 12 },
          { date: "2016-01-22", count: 122 },
          { date: "2016-01-30", count: 38 },
          // ...and so on
        ]}
        
      />
    </div>
  );
};

export default StreakChart;
