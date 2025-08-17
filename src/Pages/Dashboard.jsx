import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Style.css'
import './Dashboard.css'
import { getDatabase, ref, set, onValue } from 'firebase/database'
import {
  getStorage,
  ref as sRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'
const db = getDatabase() //Initialize database
const storage = getStorage()

const fetchTasks = (userId, setIncompleteSession, setSessionLoaded) => {
  const tasksRef = ref(db, `sessions/${userId}`)
  onValue(tasksRef, snapshot => {
    const data = snapshot.val()

    if (data) {
      let status = data.status
      setIncompleteSession(status === 'Incomplete' ? data : null)
    }
    setSessionLoaded(true)
  })
}

const Dashboard = () => {
  let navigate = useNavigate()
  const storedUser = localStorage.getItem('user') // get the stored logged in user from localstorage
  const initialUser = storedUser ? JSON.parse(storedUser) : 'Guest' // if the user is logged in set inigialUser to it
  const [user, setUser] = useState(initialUser) // set the state to be the initalUser or null if not available
  const [incompleteSessions, setIncompleteSession] = useState(null) // set the state to be the initalUser or null if not available
  const [sessionLoaded, setSessionLoaded] = useState(false) // set the state to be the initalUser or null if not available
  const [file, setFile] = useState('')

  useEffect(() => {
    // console.log('user, user.uid', user)
    if (user) {
      fetchTasks(user.uid, setIncompleteSession, setSessionLoaded)
    }
  }, [user])

  const handleUpload = () => {
    if (!file) {
      alert('Please choose a file first!')
    }

    const storageRef = sRef(storage, `/profile-images/${user.uid}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        )
        // update progress
        console.log(percent)
      },
      err => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          console.log(url)
          const tasksRef = ref(db, `profile/${user.uid}`)
          set(tasksRef, { url })
            .then(() => {
              alert('Photo uploaded successfully!')
            })
            .catch(error => {
              alert('An Error Occured, Please Try Again!')
            })
        })
      }
    )
  }

  function handleChange(event) {
    setFile(event.target.files[0])
  }
  return (
    <>
      <div className="Background2">
        <div className="MainCenterContainer" style={{width:'370px', fontSize:'1.5em',marginBottom:'0',color:'#2e4686', fontWeight:'600'}}>
          {/* <div
            onClick={() => {
              navigate('/')
            }}
            style={{ cursor: 'pointer' }}
          >
            <span className="titleDE">[DE]</span>
            <span className="titleTHREADER">THREADER</span>
          </div> */}
          <div style={{display:'flex', position:'relative', top:'-2vw'}}>
     
            <button
              onClick={() => {
                if (user && user.uid) {
                  window.location.href = '#popup1'
                }
              }}
              style={{border:'none', background:'transparent'}}
              >
              <FontAwesomeIcon icon={faGear} size={'2xl'} className="fa-Icon" />
            </button>
              <span>{initialUser.displayName || 'Guest' }</span>

          </div>
          {user == 'Guest' && (
            <>
              <br />
              <br />
              <br />
            </>
          )}
            <div id="popup1" className="overlay">
              <div className="custom-popup">
                <h2>Update profile image</h2>
                <a className="close" href="#">
                  &times;
                </a>
                <div className="content">
                  <input type="file" accept="image/*" onChange={handleChange} />
                  <div>
                    <button onClick={() => handleUpload()}>Upload</button>
                  </div>
                </div>
              </div>
            </div>
            {(sessionLoaded || user === 'Guest') && (
              <>
                {!incompleteSessions ? (
                  <div
                    onClick={() => {
                      navigate('/newsessiontasks')
                    }}
                    className="buttonsCC"
                    style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 752.png')})`, cursor:'pointer'}}
                  >
                    {/* Start New Session */}
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      navigate('/taskTimer')
                    }}
                    className="iconButton"
                  >
                    <FontAwesomeIcon
                      icon={faPlay}
                      size={'2xl'}
                      className="fa-Icon"
                    />
                  </button>
                )}
              </>
            )}
            {user !== 'Guest' ? (
              <div
                onClick={() => {
                  navigate('/stats')
                }}
                className='buttonsCC'
                style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 753.png')})`, cursor:'pointer'}}
              >
                {/* States */}
              </div>
            ) : (
              ''
            )}

            <div
              onClick={() => {
                navigate('#') /* previously /about is the page to navigate */ 
              }}
              className="buttonsCC"
              style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 754.png')})`, cursor:'pointer'}}
            >
              {/* About */}
            </div>
            {user !== 'Guest' ? (
              <div onClick={()=>{
                navigate("/")
                localStorage.clear()
              }}
                className="buttonsCC"
                style={{backgroundImage:`url(${require('../assets/buttonsAndInput/Group 758.png')})`, margin:'50px 0'}}
              >
              </div>
            ) : (
              <div className='buttonsCC' style={{margin:'50px 0'}}>
                
              </div>
            )
          }
        </div>
      </div>
    </>
  )
}

export default Dashboard
