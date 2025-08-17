import React, { useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './setTimer.css'
import { useNavigate } from 'react-router-dom'
import { GuestSession } from './Helper/Context'
import { encryptTasks } from '../utils/taskEncryption'

const db = getDatabase() //Initialize database

// Fetch the tasks associated with logged in user from database
// Define a function that fetches tasks from the database and updates the state
const fetchTasks = (userId, setFields) => {
  const tasksRef = ref(db, `sessions/${userId}`)
  onValue(tasksRef, snapshot => {
    const data = snapshot.val()
    if (data) {
      let fields = []
      fields = data.tasks
      setFields(fields)
    }
  })
}

function SetTimer(props) {
  // Set A different state for different counters eg. wor, rest, log rest, sessions
  const { guestSession, setGuestSession } = useContext(GuestSession)
  const [workCountdownTime, setWorkCountdownTime] = useState(60) // 25 minutes in seconds
  const [restCountdownTime, setrestCountdownTime] = useState(60) // 5 minutes in seconds
  const [longRestCountdownTime, setlongRestkCountdownTime] = useState(60) // 20 minutes in seconds
  const [sessions, setSessions] = useState(1)
  const [fields, setFields] = useState([])
  const navigate = useNavigate() // to be able to navigate to other screen
  const user = props.user
  // const { sessionsLength } = useContext(Sessions);

  useEffect(() => {
    if (user) {
      fetchTasks(user.uid, setFields)
    } else {
      setFields(guestSession && guestSession.tasks ? guestSession.tasks : [])
    }
  }, [user])
  // the coming functions take 2 parameteres, counters and their setters, and change the timesers' value on clicking
  // this is better that making separate functions for each timer
  const increaseMinutes = (counter, setCounter) => {
    setCounter(counter + 60)
  }

  // For decreasing minutes and seconds we need to check first if the counter value will go to negative number after deduction or not, we should deduct only if it doesn't go to negative value
  const decreaseMinutes = (counter, setCounter) => {
    if (counter >= 60) {
      setCounter(counter - 60)
    }
  }

  const increaseSeconds = (counter, setCounter) => {
    setCounter(counter + 1)
  }

  const decreaseSeconds = (counter, setCounter) => {
    if (counter >= 1) {
      setCounter(counter - 1)
    }
  }

  const increaseSessions = () => {
    if (sessions + 1 <= fields.length) {
      setSessions(sessions + 1)
    } else alert("number of sessions can't exceed the number of tasks!")
  }

  const decreaseSessions = () => {
    if (sessions >= 1) {
      setSessions(sessions - 1)
    }
  }

  // on Clicking on next button, this function will call an other function from App.js, It will update the timer's starting value then navigate the next page whhere the timer start to work on page load, a start on button will be implemented later
  // const handleNextButtonClick = () => {
  //   props.updateTimers(
  //     workCountdownTime,
  //     restCountdownTime,
  //     longRestCountdownTime,
  //     sessions
  //   )
  //   saveTasksData()
  //   sessions !== 0
  //     ? console.log('updated')
  //     : alert("number of Long Breaks can't be 0!")
  // }

  // console.log(
  //   workCountdownTime,
  //   restCountdownTime,
  //   longRestCountdownTime,
  //   sessions,
  //   fields
  // )

  const saveTasksData = () => {
    const encryptedFields = encryptTasks(fields)
    const newTasks = {
      tasks: encryptedFields,
      status: 'Incomplete',
      workTime: workCountdownTime,
      restTime: restCountdownTime,
      longRestTime: longRestCountdownTime,
      workSessionPerCycle: sessions
    }
    // Check if the user is logged in and has a UID
    if (user && user.uid) {
      // Get a reference to the `tasks` table in the database for the current user
      const tasksRef = ref(db, `sessions/${user.uid}`)

      // Create a new object to store the updated task data

      // Update the `tasks` table in the database with the new task data using the `set` function from the Firebase SDK
      set(tasksRef, newTasks)
        .then(() => {
          // Navigate to a new page
          console.log('setTimer 111, tasksRef:', tasksRef)
          navigate('/taskTimer')
          // alert("Data Added Successfuly")
        })
        .catch(error => {
          // Display an error message if the update fails
          alert('An Error Occured, Please Try Again!')
        })
    } else {
      setGuestSession(newTasks)
      navigate('/taskTimer')
    }
  }

  return (
    <>
      {/* 
      <div className="headd">
        <p style={{ color: "rgb(186, 186, 247);" }}><span style={{ color: "#ffffff" }}>DE</span>THREADER</p>
      </div>
      */}
      <div className="Background2">
        <div className="MainCenterContainer"style={{width:'15.7em', fontSize:'1.5em',marginBottom:'0',color:'#2e4686', fontWeight:'600'}} >
          <div style={{display:'flex', alignItems:'center', gap:'.3em', fontSize:'.9em',}}>
            <img style={{height:'20px'}} src={require('../assets/ICONS/Vector-2.png')}/> Time settings :
          </div>
          <br/>
          <div className="timer-container">
            <div className="work-outer" style={{backgroundImage:`url(${require('../assets/win/Group 721.png')})`}}>
              <div style={{margin:'auto', height:'80%'}} >
                <div className="times">
                  <div className="minutes">
                    <button
                    className='arrowIcon'
                      onClick={() =>
                        increaseMinutes(workCountdownTime, setWorkCountdownTime)
                      }
                      style={{width:'100%', height:'20px'}}
                    >
                      {/* Arrow up */}
                    </button>
                    <h2 style={{marginBottom:'20px', fontWeight:'900'}}>{Math.floor(workCountdownTime / 60)} : </h2>
                    <br/>
                    <button
                    className='arrowIcon'
                      onClick={() =>
                        decreaseMinutes(workCountdownTime, setWorkCountdownTime)
                      }
                    >
                      {/* Arrow Down */}
                    </button>
                  </div>
                  <div className="seconds">
                    <button
                     className='arrowIcon'
                      onClick={() =>
                        increaseSeconds(workCountdownTime, setWorkCountdownTime)
                      }
                    >
                        {/* Arrow up */}
                    </button>
                    <h2 style={{marginBottom:'20px', fontWeight:'900'}}>
                      {(workCountdownTime % 60).toString().padStart(2, '0')}
                    </h2> <br/>
                    <button
                     className='arrowIcon'
                      onClick={() =>
                        decreaseSeconds(workCountdownTime, setWorkCountdownTime)
                      }
                    >
                        {/* Arrow Down */}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rest" style={{backgroundImage:`url(${require('../assets/win/Group 722.png')})`}}>
            <div style={{margin:'auto ', height:'80%'}} >
              <div className="times">
                <div className="minutes">
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      increaseMinutes(restCountdownTime, setrestCountdownTime)
                    }
                  >
                      {/* Arrow up */}
                  </button>
                  <h2 style={{marginBottom:'20px', fontWeight:'900'}}>{Math.floor(restCountdownTime / 60)} : </h2> <br/>
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      decreaseMinutes(restCountdownTime, setrestCountdownTime)
                    }
                  >
                      {/* Arrow Down */}
                  </button>
                </div>
                {/* .rest .minutes */}
                <div className="seconds">
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      increaseSeconds(restCountdownTime, setrestCountdownTime)
                    }
                  >
                      {/* Arrow up */}
                  </button>
                  <h2 style={{marginBottom:'20px', fontWeight:'900'}}>
                    {' '}
                    {(restCountdownTime % 60).toString().padStart(2, '0')}
                  </h2> <br/>
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      decreaseSeconds(restCountdownTime, setrestCountdownTime)
                    }
                  >
                      {/* Arrow Down */}
                  </button>
                </div>
                {/* .rest .seconds */}
              </div>
              </div>
            </div>
            <div className="long-rest" style={{backgroundImage:`url(${require('../assets/win/Group 723.png')})`}}>
            <div style={{margin:'auto ', height:'80%'}} > 
              <div className="times">
                <div className="minutes">
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      increaseMinutes(
                        longRestCountdownTime,
                        setlongRestkCountdownTime
                      )
                    }
                  >
                      {/* Arrow up */}
                  </button>
                  <h2 style={{marginBottom:'20px', fontWeight:'900'}}>{Math.floor(longRestCountdownTime / 60)} : </h2> <br/>
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      decreaseMinutes(
                        longRestCountdownTime,
                        setlongRestkCountdownTime
                      )
                    }
                  >
                      {/* Arrow Down */}
                  </button>
                </div>
                {/* .long-rest .minutes */}
                <div className="seconds">
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      increaseSeconds(
                        longRestCountdownTime,
                        setlongRestkCountdownTime
                      )
                    }
                  >
                      {/* Arrow up */}
                  </button>
                  <h2 style={{marginBottom:'20px', fontWeight:'900'}}>
                    {' '}
                    {(longRestCountdownTime % 60).toString().padStart(2, '0')}
                  </h2> <br/>
                  <button
                   className='arrowIcon'
                    onClick={() =>
                      decreaseSeconds(
                        longRestCountdownTime,
                        setlongRestkCountdownTime
                      )
                    }
                  >
                      {/* Arrow Down */}
                  </button>
                </div>
                {/* .long-rest .seconds */}
              </div>
              </div>
            </div>
          </div>
            <div className="long-break">
              <p style={{margin:'0', color:'#2e4686'}}>Long Break After:</p>
              <div className="long-break-div" style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 768.png')})`,backgroundSize:'100%',backgroundRepeat:'no-repeat' , backgroundPosition:'center'}}>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                  <button
                  className='long-break-btn'
                  onClick={increaseSessions}>
                  </button>
                  <h3 style={{margin:'0 15px'}}>{sessions}</h3>
                  <button
                  className='long-break-btn'
                  onClick={decreaseSessions}>
                  </button>
                </div>
              </div>
            </div>
          <div className="buttonContainer">
            <div className="buttonContainer-child">
              <div className="buttonsCC" onClick={saveTasksData} style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 759.png')})`, margin:'5px 0 50px 0',backgroundSize:'70%',  cursor:'pointer'}} >
                {/* Next button */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* .timer-container */}
    </>
  )
}

export default SetTimer
