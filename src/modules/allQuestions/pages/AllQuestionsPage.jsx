import React from 'react'
import { Box, Grid } from '@mui/material'
import AllQuestions from '../components/AllQuestions'
import { CommonHeader } from '../../../shared/components/CommonHeader.jsx'

const AllQuestionsPage = () => {
    return (
        <div>
        <CommonHeader/>
            <Box sx={{ width: "100%" }}>
                <Grid container>
                    <Grid xs></Grid>
                    <Grid xs={12} md={8}>
                        <AllQuestions/>
                    </Grid>
                    <Grid xs></Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default AllQuestionsPage