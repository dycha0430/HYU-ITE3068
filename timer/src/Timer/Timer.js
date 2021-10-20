import Typography from '@mui/material/Typography'

let Timer = (prop) => {
	let {remained} = prop;
	return <div>
		<Typography variant='h2' sx={{ fontWeight: 700 }}>
			{(remained / 60) < 10 ? '0' : ''}
			{Math.floor(remained / 60)}: 
			{remained % 60 < 10 ? '0' : ''}
			{remained % 60}
		</Typography>
	</div>
}

export default Timer;
