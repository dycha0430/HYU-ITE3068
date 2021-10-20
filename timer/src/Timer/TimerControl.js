import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'

let TimerControl = (prop) => {
    let {paused, activated, handleStartTimer,
        handleSubmit, handleStopTimer, handlePauseTimer, handleResumeTimer} = prop;
    
    let fns = [ handleStopTimer, handleSubmit, handlePauseTimer, handleResumeTimer];

    let arr_disabled = [ false, activated, paused || !activated, !paused || !activated];

    return <ButtonGroup 
        variant="contained" 
        aria-label="outlined primary button group">
        {["Stop", "Start", "Pause", "Resume"].map(
            (item, index) => <Button 
                key={index}
                onClick={fns[index]} 
                disabled={arr_disabled[index]}
                variant="contained">
                {item}</Button>
        )}
    </ButtonGroup>
    /*
    return <Stack spacing={2} direction="row">
        {["Stop", "Start", "Pause", "Resume"].map(
            (item, index) => <Button 
                key={index}
                onClick={fns[index]} 
                disabled={arr_disabled[index]}
                variant="contained">
                {item}</Button>
        )}
    </Stack>
    
    return <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={handleStopTimer}>Stop</Button>
        {!activated ? 
        <Button variant="contained" onClick={handleStartTimer}>Start</Button> :
        (!paused ? 
            <Button variant="contained" onClick={handlePauseTimer}>Pause</Button> :
            <Button variant="contained" onClick={handleResumeTimer}>Resume</Button>            
        )}
    </Stack>
    */
}

export default TimerControl