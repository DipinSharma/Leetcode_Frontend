import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Button, IconButton, Input, Skeleton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';

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
    const [data, setData] = React.useState({ input: [""], output: [""], expected: [""] });

    const { details, setGlobalDetails } = useDetails();


    React.useEffect(() => {
        if (details)
            setData({
                input: details.testCases,
                outputs: details.outputs == [''] ? new Array(details.testCases.length).fill('') : details.outputs,
                expected: details.expected == [''] ? new Array(details.testCases.length).fill('') : details.expected
            })
    }, [details])

    const handleRemove = (event, index) => {
        // Implement the logic to remove the tab based on the index
        const newInput = data.input.filter((item, index2) => index2 !== index);
        const newOutput = data.input.filter((item, index2) => index2 !== index);
        const newExpected = data.input.filter((item, index2) => index2 !== index);
        setGlobalDetails({...details,testCases:newInput,outputs:newOutput,expected:newExpected});
        setValue(0);
    };

    const handleInputChange = (index, inputValue) => {
        // console.log(data.input)
        const newValue = [...data.input];
        newValue[index] = inputValue;
        // setData(newData);
        const newData = {
            ...details,
            testCases: newValue
        }
        setGlobalDetails(newData);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleAddTab = () => {
        const newData = {
            ...details,
            testCases: [...details.testCases, ''],
            outputs: [...details.outputs, ''],
            expected: [...details.expected, ''],
        };
        setGlobalDetails(newData)
        setValue(details.testCases.length)
    };

    return (
        <div className='TestCaseBox'>
            <Box>
                {details ? <Tabs
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
                    {
                        data.input.map((item, index) => (
                            <IconButton
                                size="small"
                                onClick={(event) => handleRemove(event, index)}
                                style={{
                                    position: 'absolute',
                                    top: '-3px',
                                    left: `${index * 110 + 70}px`,
                                    margin: '-4px',
                                    visibility: value === index ? 'visible' : 'hidden',
                                    opacity: value === index ? 1 : 0,
                                    transition: 'opacity 0.3s ease, visibility 0.3s ease',
                                    zIndex: 2
                                }}
                            >
                                <CancelIcon />
                            </IconButton>

                        ))
                    }
                    {data.input.length < 8 && <IconButton onClick={handleAddTab} variant="contained" color="primary">+</IconButton>}
                </Tabs> :
                    <div style={{display:'flex'}}>
                        <Skeleton sx={{ bgcolor: 'grey', height: "70px", width: "90px", borderRadius: "25px", marginLeft:"20px" }} />
                        <Skeleton sx={{ bgcolor: 'grey', height: "70px", width: "90px", borderRadius: "25px", marginLeft:"20px" }} />
                        <Skeleton sx={{ bgcolor: 'grey', height: "70px", width: "90px", borderRadius: "25px", marginLeft:"20px" }} />
                    </div>}
            </Box>
            {
                data.input.map((item, index) => (
                    <CustomTabPanel value={value} index={index}>
                        <Box sx={{ padding: "20px" }}>
                            <Typography variant='h6'>{details?"input":<Skeleton sx={{bgcolor:'grey'}}/>}</Typography>
                            {details?<textarea style={{
                                backgroundColor: '#3e3e3e',
                                width: '100%',
                                minWidth: "100%",
                                borderRadius: '10px',
                                fontSize: "1.2rem",
                                padding: "0.2rem",
                                color: 'white',
                                height: "100px"
                            }}
                                value={item}
                                placeholder='Enter TestCase'
                                onChange={(e) => handleInputChange(index, e.target.value)}

                            />
                        :<Skeleton sx={{bgcolor:'grey'}} height={"150px"}/>}

                        </Box>
                    </CustomTabPanel>
                ))
            }
        </div>
    );
}
