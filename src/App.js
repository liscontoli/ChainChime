import React, { useState, useEffect } from 'react'
import { MySessionProvider } from './Pages/Helper/Context'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UserName } from './Pages/Helper/Context'
import { GuestSession } from './Pages/Helper/Context'
import { LoggedIn } from './Pages/Helper/Context'
import Home from './Pages/Home.jsx'
import SignUp from './Pages/SignUp.jsx'
import LogIn from './Pages/LogIn.jsx'
import About from './Pages/About.jsx'
import Dashboard from './Pages/Dashboard.jsx'
import NewSessionTasks from './Pages/NewSessionTasks.jsx'
import app from './firebase'
import { getAuth } from 'firebase/auth'
import SetTimer from './Pages/setTimer'
import TaskTimer from './Pages/taskTimer'
import { update } from 'firebase/database'
import Stats from './Pages/Stats'

// import { Auth } from "firebase/auth";

const auth = getAuth(app)

const Border = props => {
  return (
    <div className="LogoBorderBackground">
      <div> </div>
    </div>
  )
}

const App = () => {
  document.title = 'ChainChime'
  const [user, setUser] = useState(null)
  const [workCountdownTime, setWorkCountdownTime] = useState(3) // 25 minutes in seconds
  const [restCountdownTime, setRestCountdownTime] = useState(300) // 5 minutes in seconds
  const [longRestCountdownTime, setLongRestCountdownTime] = useState(1200) // 20 minutes in seconds
  const [guestSession, setGuestSession] = useState({
    tasks: [],
    status: 'Incomplete',
    workTime: 60,
    restTime: 60,
    longRestTime: 60,
    workSessionPerCycle: 1
  }) // 20 minutes in seconds
  const [sessions, setSessions] = useState(0)

  // this funciton is defined here and passed down to setTimer.jsx
  const updateTimers = (work, rest, longRest, numSessions) => {
    setWorkCountdownTime(work)
    setRestCountdownTime(rest)
    setLongRestCountdownTime(longRest)
    setSessions(numSessions)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      console.log(user)
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('Signed out successfully')
      })
      .catch(error => {
        // An error happened.
      })
  }

  // Added
  const [userName, setUserName] = useState(null) //create state to pass through context
  const [isLoggedIn, setIsLoggedIn] = useState(false) //create state to pass through context
  return (
    // the Way of using context (added by Lis)
    <UserName.Provider value={{ userName, setUserName }}>
      <LoggedIn.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <GuestSession.Provider value={{ guestSession, setGuestSession }}>
          <MySessionProvider>
            <Router basename="/">
              <Border />
              <Routes>
                <Route
                  path="/"
                  element={<Home handleLogout={handleLogout} />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<LogIn setUser={setUser} />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/stats" element={<Stats />} />
                <Route
                  path="/newsessiontasks"
                  element={<NewSessionTasks user={user} />}
                />
                <Route
                  path="/play-session"
                  element={<SetTimer user={user} updateTimers={updateTimers} />}
                />
                <Route
                  path="/taskTimer"
                  element={
                    <TaskTimer
                      workCountdownTime={workCountdownTime}
                      restCountdownTime={restCountdownTime}
                      setWorkCountdownTime={setWorkCountdownTime}
                      longRestCountdownTime={longRestCountdownTime}
                      sessions={sessions}
                      user={user}
                    />
                  }
                />
              </Routes>
            </Router>
          </MySessionProvider>
        </GuestSession.Provider>
      </LoggedIn.Provider>
    </UserName.Provider>
  )
}

export default App
