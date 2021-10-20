import {Component} from 'react';
import Timer from './Timer';
import TimerUp from './TimerUp'
import TimerControl from './TimerControl';
import TimerForm from './TimerForm';
import TimerTitle from './TimerTitle'
import TimerHistory from './TimerHistory'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import axios from 'axios';

let timerValue = 1500;
class TimerPannel extends Component {
	constructor() {
		super();

		this.state = {
			remained: timerValue,
			activated: false,
			paused: false,
			helperText: '',
			timerTitle: '',
			currentTitle: '',
			errorTextField: false,
			helperTextField: '',
			current_task: {},
			timerValue,
			initialized: timerValue,
			history: [],
		};
	}

	componentDidMount() {
		axios.post('http://localhost:4000/graphql',
		{"query": "{ tasks { id title duration }}", "variables": null},
		{'Content-Type': "application/json"})
		.then(res => this.setState({ history: res.data.data.tasks }))
		.catch(e => console.log(e));
	}

	handlePauseTimer = () => {
		this.setState(() => {
			clearInterval(this.interval);
			
			return {
				paused: true
			};
		})
	}

	handleResumeTimer = () => {
		this.interval = setInterval(() => {
			this.setState((prev) => {

				if (prev.remained <= 0) {
					clearInterval(this.interval);
					return {
						activated: false,
						paused: true
					};
				} else {
					return {
						paused: false,
						remained: prev.remained - 1
					};
				}
			});
		}, 1000);
	}

	handleStopTimer = () => {
		clearInterval(this.interval);
		this.setState((prev) => {
			return {
				remained: prev.timerValue,
				activated: false,
				paused: false, 
				initialized: false
			};
			}
		);
	}

	handleStartTimer = () => {
		this.setState((prev) => {
			return {
				remained: prev.timerValue,
				initialized: true
			};
		});

		this.interval = setInterval(() => {
			this.setState((prev) => {
				if (prev.remained <= 0) {
					clearInterval(this.interval);
					return {
						activated: false,
						paused: true
					};
				} else {
					return {
						activated: true,
						remained: prev.remained - 1,
						initialized: true,
						paused: false
					};
				}
			});
		}, 1000);
	}

	handleChangeTextField = e => {
		if (e.target.value && e.target.value.length > 25) {
			this.setState({ 
				errorTextField: true, 
				helperTextField: 'Title cannot exceeds 25 char.',
				timerTitle: e.target.value });
		} else {
			this.setState({ 
				errorTextField: false, 
				helperTextField: '',
				timerTitle: e.target.value });
		}	
	}

	handleChangeSlider = e => {
		if (e.target.value < 1) {
			this.setState({helperText: 'Timer value cannot be 0', timerValue: 60, remained: 60})
		} else {
			this.setState({helperText: '', timerValue: Number(e.target.value) * 60, remained:Number(e.target.value) * 60})
		}
	}

	handleSubmit = e => {
		e.preventDefault();

		let { history, timerTitle, timerValue, currentTitle } = this.state;
		
		if (timerTitle == '') {
			this.setState({ 
				errorTextField: true, 
				helperTextField: 'Empty Title'});
		} else if (timerTitle.length > 25) {
			this.setState({ 
				errorTextField: true, 
				helperTextField: 'Title cannot exceeds 25 char.',
				timerTitle: e.target.value });
		} else {
			axios.post("http://localhost:4000/graphql", 
			{"query": `mutation {addTask(title: "${timerTitle}", duration: ${timerValue}) {id title duration}}`},
			{"variables": null})
			.then( res => this.setState((prev) => {return {history: [...prev.history, res.data.data.addTask]}} ))
			.catch(e => console.log(e));

			this.setState({ 
				currentTitle: timerTitle,
				current_task: {id: history.length, title: timerTitle, duration: timerValue},
				timerTitle: ''
			});
			this.handleStartTimer();
		}
		
	}

	render() {
		let {timerTitle, helperText, initialized, remained, activated, 
			timerValue, paused, errorTextField, helperTextField,
			currentTitle, history, current_task} = this.state;

		return <Card sx={{maxWidth: 360}}>
			<CardActionArea>
				<CardMedia
					component="img"
					height="200"
					image="./darong.jpg"
					//image="https://mui.com/static/images/cards/paella.jpg"
					alt="Paella dish"
				>
				</CardMedia>
				<CardContent>
					<TimerHistory 
						current_task={current_task}
						activated={activated}
						history={history}
						initialized={initialized}
						paused={paused}/>

					<TimerTitle activated={activated}
								taskTitle={currentTitle}/>

					<Timer remained={remained}/>

					<TimerForm 
						timerTitle={timerTitle}
						helperText={helperText}
						timerValue={timerValue/60}
						activated={activated}
						handleChangeTextField={this.handleChangeTextField}
						handleChangeSlider={this.handleChangeSlider}
						handleSubmit={this.handleSubmit}
						errorTextField={errorTextField}
						helperTextField={helperTextField}>
					</TimerForm>

					<TimerControl 
					activated={activated}
					paused={paused}
					handleSubmit={this.handleSubmit}
					handleResumeTimer={this.handleResumeTimer}
					handlePauseTimer={this.handlePauseTimer}
					handleStartTimer={this.handleStartTimer}
					handleStopTimer={this.handleStopTimer}/>
					<TimerUp
						handleClose={this.handleStopTimer}
						open={remained <= 0}
						>
					</TimerUp>
				</CardContent>
			</CardActionArea>
		</Card>
	}
	
}

export default TimerPannel;
