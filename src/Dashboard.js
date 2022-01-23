import React from 'react'
import useAuth from "./useAuth"
import {useState, useEffect} from 'react'
import axios from 'axios'








export default function Dashboard({code}) {
    var dataBundle = useAuth(code)
    //will be used if they decide to create a playlist
    const accessToken = dataBundle[0]
    const email = dataBundle[1]
    const username = dataBundle[2]
    var pfp = dataBundle[3]
    const [seshCode, setSeshCode] = useState();
    const [interval, setIntervalVar] = useState();


    

    if(!pfp) {
        pfp = "pictures/defaultpfp.png"
    } else {
        pfp = pfp.url
    }


  

    /*
     two options: enter a code and join a playlist session or enter a code and make a playlist session
    
    after code enter, they can choose when to create the playlist and the sidebar will display how many people have joined their playlist session

    
    
     */
    //generate current user email
    //create some text input field to put ur security code into
    //whenever button is clicked, send security code and email to server somehow
    //and either a.
    //create a new group session with the security code id and put that user with that
    //email in it
    //or b. 
    //put the current user in the already existing group session with that security code id
    function createPlaylist() {
        console.log(seshCode)
        axios.post('http://localhost:3001/createPlaylist', {seshCode, email,})
        alert("Your playlist has been created successfully!");

        //add code in to server to delete session
    }


    function updateSeshCode() {
        //console.log(interval)
        if(interval) {
            //console.log("interval ended")
            clearInterval(interval);

            //post call to remove current user from previous session
            axios.post('http://localhost:3001/removeUser', {seshCode, email,})

        }


        setSeshCode(document.getElementById("sessionCodeInput").value)
        var tempSeshCode = document.getElementById("sessionCodeInput").value
        document.getElementById("sessionCodeInput").value = "";
        document.getElementById("createPlaylist").style.visibility = "visible";
        document.getElementById("code").innerHTML = ": Session " + tempSeshCode;

        
        //if interval already has a value, clear it 
        //then set interval for 10 seconds and a method that updates the
        //list in the ui with new members if any    
        setIntervalVar(setInterval(() => {axios.post('http://localhost:3001/sessionUpdate', {tempSeshCode, email,}).then(res => {
            //console.log(res.data.sessionMembers)
            //console.log(tempSeshCode)
            //console.log(res.data.sessionMembersDisplay[0])

            var element = document.getElementById("sessionUserList");
            element.innerHTML = "";

            for(let i = 0; i < res.data.sessionMembersDisplay.length; i++) {
                var tempusername = res.data.sessionMembersDisplay[i][0]
                var image = res.data.sessionMembersDisplay[i][1]
                if(image.length === 0) {
                    image = "pictures/defaultpfp.png"
                } else {
                    image = image[i].url
                }                   
                var profile = document.createElement("div");
                profile.className = "profile";
                var img = document.createElement("img");
                img.className = "profile__image";
                img.src = image;
                img.alt = 'it aint workin';
                var profileName = document.createElement("div");
                profileName.className = "profile__name";
                var icon = document.createElement("i");
                icon.className = "material-icons person_icon";
                var person = document.createTextNode("person");
                icon.appendChild(person);
                var text = document.createTextNode(tempusername);
                
                element.appendChild(profile);
                profile.appendChild(img);
                profile.appendChild(profileName);
                profileName.appendChild(icon);
                profileName.appendChild(text);
            }
        })}, 2000))

        //console.log(interval)

    }

    
    useEffect(() => {
        if(seshCode && email) {
            
            //console.log(seshCode)
            //console.log(email)
            
            axios.post('http://localhost:3001/sessionUpdate', {seshCode, email,}).then(res => {
                
                //console.log(res.data.sessionMembersDisplay[0])

                var element = document.getElementById("sessionUserList");
                element.innerHTML = "";

                for(let i = 0; i < res.data.sessionMembersDisplay.length; i++) {
                    var username = res.data.sessionMembersDisplay[i][0]
                    var image = res.data.sessionMembersDisplay[i][1]
                    if(image.length === 0) {
                        image = "pictures/defaultpfp.png"
                    } else {
                        image = image[i].url
                    }                   
                    var profile = document.createElement("div");
                    profile.className = "profile";
                    var img = document.createElement("img");
                    img.className = "profile__image";
                    img.src = image;
                    img.alt = 'it aint workin';
                    var profileName = document.createElement("div");
                    profileName.className = "profile__name";
                    var icon = document.createElement("i");
                    icon.className = "material-icons person_icon";
                    var person = document.createTextNode("person");
                    icon.appendChild(person);
                    var text = document.createTextNode(username);
                    
                    element.appendChild(profile);
                    profile.appendChild(img);
                    profile.appendChild(profileName);
                    profileName.appendChild(icon);
                    profileName.appendChild(text);
                }
            })
        }
      }, [seshCode, email])



    

    return <div className="centered-container dashboard-div">
        
        <div className="yourSession"> 
            Session Members<span id="code"></span>
        </div>
        

        <div className="scrollmenu" id="sessionUserList"> 
            <div className="profile">
                <img src={pfp} alt="it aint workin" className="profile__image"></img>
                <div className="profile__name">
                    <i className="material-icons person_icon">person</i>{username}
                </div>
            </div>

        </div>
   

        <div className="field">
        <input
          type="text"
          className = "icon field-input "
          placeholder="Enter session code"
          id="sessionCodeInput"         
        />
        <button className="btn joinsesh-btn" onClick={updateSeshCode}>Join Session</button>
        <br></br>
        <button className="btn joinsesh-btn appearing" onClick={createPlaylist} id="createPlaylist">Create Playlist</button>
        </div>
    </div> 
        
        /*create the onclick method to update the seshCode whenever the button is clicked

        create a useEffect that activates and sends a post request to server to server whenever seshCode is changed (remember to add an early return statement if seshCode does not exist)

        this post request will contain the seshCode and the userEmail and
        the server will use that to create listening sessions and sort users into those sessions as required
        */



    
    
}
