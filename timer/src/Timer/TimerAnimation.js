import TrackChangesIcon from '@mui/icons-material/TrackChanges';

let TimerAnimation = (prop) => {
    let {initialized, activated, paused} = prop;
    return <TrackChangesIcon
    className = {initialized? "App-logo" : ""}
    htmlColor="white"
    sx={{ fontSize: 100,
        animationPlayState: !paused && activated ? "running": "paused"
    }}/>
}

export default TimerAnimation;