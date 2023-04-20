import React from 'react'
import { Button } from '@mui/material'

const Loser = () => {
  return (
    <div>
      <h2>👎 YOU LOSE 👎</h2>
      <Button variant="contained" 
            sx={{ m: 1.5, 
              background: '#6a8f8b',
              ":hover": {
                bgcolor: "#4b6260",
              },
              fontSize: 35 }}
            className='guessButtons'
            onClick={() => location.replace('/game')}>Play again</Button>
    </div>
  )
}

export default Loser