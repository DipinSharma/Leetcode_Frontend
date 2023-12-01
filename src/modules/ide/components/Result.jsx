import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Icon, IconButton, Typography } from '@mui/material';

import PropTypes from "prop-types";
import { useDetails } from '../../../shared/context/questionContext';
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

export default function TestCase() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [data, setData] = React.useState({ input: [""], outputs: [""], expected: [""] });
  const { details, setGlobalDetails } = useDetails();

  React.useEffect(() => {
    if (details) {
      setData({
        input: details.testCases,
        outputs: details.outputs === undefined ? new Array(details.testCases.length).fill('') : details.outputs,
        expected: details.expected === undefined ? new Array(details.testCases.length).fill('') : details.expected
      })
    }
  }, [details])

  return (
    <div className='ResultBox'>
      <Box sx={{ bgcolor: '#2a2a2a' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          indicatorColor={"#ffffff"}
          textColor={"#ffffff"}

          aria-label="scrollable auto tabs example"
          TabIndicatorProps={{ style: { display: 'none' } }}
          sx={{ color: 'white', margin: "1rem" }}
        >
          {
            data.input.map((item, index) => (
              <Tab label={`Case ${index + 1}`} sx={{ color: "white", backgroundColor: value === index ? '#3e3e3e' : '#2a2a2a', marginRight: "20px", borderRadius: "40px", transition: 'background-color 0.8s ease' }} />
            ))
          }
        </Tabs>
      </Box>
      {
        data.input.map((item, index) => (
          <IconButton
            size="small"
            style={{
              position: 'absolute',
              top: '-3px',
              left: `${index * 110 + 70}px`,
              margin: '-4px',
              transition: 'opacity 0.3s ease, visibility 0.3s ease',
              zIndex: 2
            }}
          >
            <Icon
              style={{
                position: 'absolute',
                top: '100px',
                left: '28px',
                transform: 'translateY(-50%)',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: data.outputs[index] === data.expected[index] ? 'green' : 'red',
                display: 'inline-block',
              }} />
          </IconButton>

        ))
      }
      {data.input.map((item, index) => (
        <CustomTabPanel value={value} index={index}>
          <Box sx={{ padding: "20px" }}>
            <Typography variant='h6'>input</Typography>
            <textarea style={{
              backgroundColor: '#3e3e3e',
              width: '100%',
              minWidth: "100%",
              borderRadius: '10px',
              fontSize: "1.2rem",
              padding: "0.2rem",
              color: 'white',
              height: "100px"
            }}
              readOnly={true}
              value={data.input[index]}
              placeholder='Enter TestCase'
            // onChange={(e) => handleInputChange(index, e.target.value)}

            />

            <Typography variant='h6'>Output</Typography>
            <textarea style={{
              backgroundColor: '#3e3e3e',
              width: '100%',
              borderRadius: '10px',
              fontSize: "1.2rem",
              padding: "0.2rem",
              color: 'white'
            }}
              placeholder='Your Output'
              readOnly={true}
              value={data.outputs[index]}
            />

            <Typography variant='h6'>Expected</Typography>
            <textarea style={{
              backgroundColor: '#3e3e3e',
              width: '100%',
              borderRadius: '10px',
              fontSize: "1.2rem",
              padding: "0.2rem",
              color: 'white'
            }}
              placeholder='Expected output'
              readOnly={true}
              value={data.expected[index]}
            />

          </Box>
        </CustomTabPanel>
      ))
      }
    </div>
  );
}

{/* <textarea value={props.result} className='resultArea' readOnly></textarea> */ }