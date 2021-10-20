import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'

let marks = [
    {value: 1, label: '1 min.'}, 
    {value: 30, label: '30 min.'}
];

let TimerForm = ({timerTitle, activated, handleChangeSlider, 
    handleChangeTextField, helperText, timerValue,
    errorTextField, helperTextField, handleSubmit}) =>  !activated &&
    <Container>
        <div style = {{width: '280px'}}>
            <form onSubmit={handleSubmit}>
            <TextField
            id="timer-title"
            label={ errorTextField ? "Error" : "Required"}
            value={timerTitle}
            error={errorTextField}
            helperText={helperTextField}
            sx={{width: '100%', my: '10px'}}
            onChange={handleChangeTextField}
            />
            <Typography color="error">{helperText}</Typography>
            <Slider 
                id="slider"
                disabled={activated}
                value={timerValue}
                step={1}
                min={0}
                max={30}
                marks={marks}
                onChange={handleChangeSlider}
                />
            </form>
        </div>
    </Container>

export default TimerForm;