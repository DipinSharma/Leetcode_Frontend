import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import {
//   BottomNavigation,
//   BottomNavigationAction,
//   Button,
//   Paper,
// } from "@mui/material";
import Result from "./Result";
import TestCase from "./Testcase";
import { useDetails } from "../../../shared/context/questionContext";
import { colors } from "@mui/material";

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
        <Box sx={{ p: 0 }}>
          <Typography variant="p">{children}</Typography>
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

export default function Console(props) {
  const [value, setValue] = React.useState(0);

  const { details, setGlobalDetails } = useDetails();

  const handleChange = (event, newValue) => {
    if (newValue == 0) {
      setGlobalDetails({ ...details, success: undefined })
    }
    setValue(newValue);
  };
  // const { details, setGlobalDetails } = useDetails();
  // React.useEffect(() => {
  //   setData({ input: details.testCases, output: details.outputs, expected: details.expected })
  // }, [details])
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", backgroundColor: "rgba(101, 95, 95, 0.16)" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="inherit"
          >
            <Tab label="TestCase" {...a11yProps(0)} />
            {details&&<Tab label="Result" {...a11yProps(1)} />}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {<TestCase />}
        </CustomTabPanel>
        {details.success==true && <CustomTabPanel value={value} index={1}>
          <Result />
        </CustomTabPanel>}
        {details.success === false && <CustomTabPanel value={value} index={1}>
          <Box sx={{ padding: "20px" }}>

            <Typography variant="h4" sx={{color:"#e3382c"}}>Compilation Error</Typography>
            <textarea style={{
              backgroundColor: '#563634',
              width: '100%',
              minWidth: "100%",
              borderRadius: '10px',
              fontSize: "1.2rem",
              padding: "0.2rem",
              color: '#e3382c',
              height: "100px"
            }}
              value={details.error}
              placeholder='Enter TestCase'
              readOnly={true}
            />

          </Box>
        </CustomTabPanel>}
        {details.success === undefined && <CustomTabPanel value={value} index={1}>
          <Box sx={{ padding: "20px" }}>
            <Typography variant="h4">
              You must run your code first
            </Typography>
          </Box>
        </CustomTabPanel>}
      </Box>
    </>
  );
}
