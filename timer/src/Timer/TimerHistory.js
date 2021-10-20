import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import AlarmIcon from '@mui/icons-material/Alarm';
import Typography from '@mui/material/Typography';
import TimerAnimation from './TimerAnimation'

let TimerHistory = ({history, activated, current_task, initialized, paused}) => <Timeline>
  {history && history.map(item => activated && current_task.id == item.id ?
  <TimelineItem key={'task_' + item.id}>
    <TimelineOppositeContent
        sx={{ py: '24px' }}>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot color="error">
            <TimerAnimation initialized={initialized}
              activated={activated}
              paused={paused}/>
          </TimelineDot>
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
        </TimelineContent>
    </TimelineItem>
    : <TimelineItem key={'task_' + item.id}>
    <TimelineOppositeContent
        sx={{ py: '24px' }}>
        <Typography color="text.secondary" variant='h6'>
          {(item.duration / 60) < 10 ? '0' : ''}
          {Math.floor(item.duration / 60)}:
          {item.duration % 60 < 10 ? '0' : ''}
          {item.duration % 60}
        </Typography>
        </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineConnector />
          <TimelineDot>
            <AlarmIcon />
          </TimelineDot>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '20px', px: 2 }}>
          <Typography variant="h6" component="span">
          <Typography color="text.secondary" variant='h6'>
            {item.title}
            </Typography>
          </Typography>
        </TimelineContent>
    </TimelineItem>)}
    
    </Timeline>

export default TimerHistory