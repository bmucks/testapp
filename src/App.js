import './App.css';
import React, {useState, useEffect} from "react";
import logo from './logo.jpg';
import firebase from "./firebase.js";
import "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

function App() {
  const [songs, setSongs] = useState([]);
  const [name, setName] = useState([]);
  const [songTitle, setSongTitle] = useState([]);
  const [artist, setArtist] = useState([]);  const [notes, setNotes] = useState([]);
  const [style, setStyle] = useState(false);
  const [disBut, setDisBut] = useState(false);
  const [id, setId] = useState([]);

  const ref = firebase.firestore().collection("songs");


  function addSong(newSong) {
    if (newSong.name.length < 2 || newSong.songTitle.length < 2 || newSong.artist.length < 2)
    {
      alert('Entries must be greater than 1 charachter')
    }
    else if (disBut === true) { 
      alert('Please wait 30 seconds before requesting another song. Please no more than 2-3 request per person on queue at a time')
    }
    else {
     setDisBut(
        true
    );

    // **** here's the timeout ****
    setTimeout(() => setDisBut(false), 30000);
    ref.doc(newSong.id)
    .set(newSong)
    .catch((err) => {
      console.error(err)
    })
    alert('Request has been submitted and received by Miah and/or Mucks');
    setSongTitle([''])

  }

  }

  function deleteSong(song) {
    ref.doc(song.id)
    .delete()
    .catch((err) => {
      console.error(err)
    })
  }

  
  function adminP() {
   let promptpass = prompt('Illuminati Only');
   if (promptpass === "Chymestime1110") {
     setStyle(true)
     ref.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data())
      })
      setSongs(items)
      console.log(songs)
    })
   }
   else {
     
     alert("Nuh uh uh , you didn't say the magic word! Nuh uh uh , you didn't say the magic word! Nuh uh uh , you didn't say the magic word!")
   }

  }

  return (
    <div className="App">
        <h1> Welcome To Mr.Goodbar Karaoke</h1>
        <img className="logo" src={logo} alt="Logo" />
        <h4>Presented by Miah and Mucks</h4> 
        <h1>Please Enter Your Song Request</h1> 
        <h4>(Please keep requests to 2-3 songs per person. You may submit a new song after you perform. First song request received goes to first available spot in line and 
          remainders are queued in and mixed with new requests. Spammers requests will be ignored.)</h4> 
       
      <div className="info">
        <form>
          <label>
          Your Name:
          <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>  
          </label> <br></br>
          <label><br></br>
          Artist/Band:
            <input type="text" name="name" onChange={(e) => setArtist(e.target.value)} />
          </label><br></br>
          <label><br></br>
          Song Title:
            <input type="text"  name="name" onChange={(e) => setSongTitle(e.target.value)} />
          </label><br></br>
     
          <label><br></br>
          Notes: 
            <textarea type="text" name="name" onChange={(e) => setNotes(e.target.value)}/>
          </label><br></br>
          <br></br>
          <button className="sub" type="reset" defaultValue="Reset" 
           onClick={() => addSong( {name, songTitle, artist, notes,
             id: uuidv4(), createdAt:new Date() })}  >
          Submit Request
         </button>
        </form>
        <h4>Book Your Own Private Goodbar Karaoke Party! </h4> 
        <h5>Talk to a manager today! </h5> 
        <br/>
        <div className="divide"></div>
        <h2>Please help us get through Covid Days by following these guidelines</h2>
        <ol>
            <li>
              All singers must abide by all NYS guidelines concerning Covid-19 including
              wearing a mask while not seated, proper social distancing, and the purchase of food.
            </li>
            <li>
              Do not drop the microphones
            </li>
            <li>
             Please be respectful and do not spam the request app. 
            </li>
            <li>
              Performers must remain 12 feet away from the audience 
            </li>
            <li>
              Only two singers allowed at one time and they must respect the 6 foot distance
              seperation if they are from seperate groups
            </li>
            <li>
              Song request can be submitted via the phone app or a server while grab a card directly from you to deliver to the DJ
            </li>
            <li>
             Microphones will be alternated and sanitized in between singers
            </li>
            <li>
             Belt it!
            </li>
          
        </ol>
        <a style={{color:'antiquewhite'}} href="https://www.facebook.com/Buffalo-Webcrafters-100604568686960"> This App Was Built By Buffalo Webcrafter aka Mucks</a>
        
        <div className="divide"></div>
        <br></br>
        <button className="adminBut"type="reset" defaultValue="Reset"  onClick={() => adminP()} >
          Admin Only 
         </button>
        {songs.map((song) => (
        <div  style={{ display: style ? "block" : "none" }} className="songcard" key={song.name}>
          <span className= 'spanX 'onClick={(e) => deleteSong(song)} style={{color:'red'} }>x</span>
          <h2>Singer Name with last name inital: {song.name}</h2>
          <h2>Artist: {song.artist}</h2>
          <h2>Song:{song.songTitle}</h2>
          <h2>Notes:{song.notes}</h2>
          <h2>{moment(song.createdAt.toDate()).calendar()}</h2>
          
 

          </div>
      ))}
      </div>   
    </div>
  );
}

export default App;
