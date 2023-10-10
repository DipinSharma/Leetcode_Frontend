import { Typography } from '@mui/material'
import React from 'react'

export const Result = (props) => {
  return (
    <textarea value={props.result} className='resultArea' readOnly></textarea>
    // <Typography>{props.result}</Typography>
  )
}
