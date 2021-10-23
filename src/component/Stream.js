import React from 'react';
import Paper from '@mui/material/Paper';

function Stream(canvasRef) {
    return (
        <div>
             <Paper elevation={0}>
                <canvas ref={canvasRef} />
             </Paper>
        </div>
    )
}

export default Stream
