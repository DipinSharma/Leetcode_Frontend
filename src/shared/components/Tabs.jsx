import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Description } from "../../modules/ide/components/Description";
import { Button, Toolbar } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography variant="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function HeaderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider",backgroundColor:"rgba(101, 95, 95, 0.16)"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          textColor="inherit"
        >
          <Tab label="Description" {...a11yProps(0)} />
          <Tab label="Editorial" {...a11yProps(1)} />
          <Tab label="Solution" {...a11yProps(2)} />
          <Tab label="Submission" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Description />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Editorial
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Solution
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        Submission
      </CustomTabPanel>
    </Box>
  );
}
