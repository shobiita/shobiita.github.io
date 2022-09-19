/* retrieve the elements we'll be using and assigning them variables */

/* you can see that I'm using a mix of getElementById and getElementsByClassName to retrieve them - as
   discussed last week getElementsByClassName returns a list, however knowing that there is only one 
   element with the associated class allows me to use the array index of [0] - the first item - to
   return a singular element - if there were multiple elements with that class it would return the first
   element  */

let media = document.getElementById("media");
let controls = document.getElementsByClassName("controls")[0];

let play = document.getElementsByClassName("play")[0];
let stop = document.getElementsByClassName("stop")[0];
let rwd = document.getElementsByClassName("rwd")[0];
let fwd = document.getElementsByClassName("fwd")[0];
let volSlider = document.getElementsByClassName("vol") [0];
let mute = document.getElementsByClassName("mute")[0];
let fullscreen = document.getElementsByClassName("fullscreen") [0];

/* Above are the two new features I added, the Mute and Fullscreen button. I used the same construction method, changing the class name and 'let' function to my desired feature button. I needed to ensure that the information displayed in these tags were accurate so they linked to the HTML. */

let timerWrapper = document.getElementsByClassName("timer")[0];
let timer = document.getElementsByClassName("timer-span")[0];
let timerBar = document.getElementsByClassName("timer-bar")[0];


/* I'm also declaring some blank variables here that will later be assigned to intervals - declaring them
   outside of the functions like this means that they will have what's called "global scope" meaning they 
   will be accessible within different functions */

/* for more information check out the link on modules to JS Scope */

let intervalFwd;
let intervalRwd;

/* removing the default controls and showing the custom controls */

/* this is done in the js so that if for whatever reason the js doesn't load the player will 
   use the default controls */

media.removeAttribute("controls");
controls.style.visibility = "visible";

/* add an event listener for clicking the play/pause button and then define it's functionality */

play.addEventListener('click', playPauseMedia);

function playPauseMedia(){
  
  /* the four lines below are cancelling the fast forward or rewind functions if they are running - 
     the first two lines remove the class used and the second two make sure the intervals stop */

  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);

  /* like we've previously seen this code uses an if statement to do something based on a bool - 
     media.paused will return true if paused and false if playing so we can make the button click
     either pause or play and then change it's icon depending on the current context */

  if(media.paused){
    play.setAttribute('data-icon', 'u');
    media.play();
  } else {
    play.setAttribute('data-icon', 'P');
    media.pause();
  }
}

/* add an event listener for clicking the stop button and the media finishing, and then define 
   their functionality */

stop.addEventListener("click", stopMedia);
media.addEventListener("ended", stopMedia);

function stopMedia() {
  media.pause();
  /* reset the current time to 0 - the beginning */
  media.currentTime = 0;
  play.setAttribute('data-icon', 'P');
  rwd.classList.remove('active');
  fwd.classList.remove('active');
  clearInterval(intervalRwd);
  clearInterval(intervalFwd);
}

/* add an event listener for clicking the fwd & rwd buttons and then define their functionality */

rwd.addEventListener("click", mediaBackward);
fwd.addEventListener("click", mediaForward);

function mediaBackward() {
  /* make sure the fast forward interval isn't also running */
  clearInterval(intervalFwd);
  fwd.classList.remove("active");
  /* check to see if we should stop or start the rewind function based on the presence of the "active" class */
  if(rwd.classList.contains("active")) {
    rwd.classList.remove("active");
    clearInterval(intervalRwd);
    /* if stopping the rewind make sure to start playback again */
    media.play();
  } else {
    rwd.classList.add("active");
    media.pause();
    /* if starting the rewind start the windBackwards function on an interval */
    intervalRwd = setInterval(windBackward, 200);
  }
}

/* see mediaBackward above for more details on how this works */

function mediaForward() {
  clearInterval(intervalRwd);
  rwd.classList.remove("active");

  if(fwd.classList.contains("active")) {
    fwd.classList.remove("active");
    clearInterval(intervalFwd);
    media.play();
  } else {
    fwd.classList.add("active");
    media.pause();
    intervalFwd = setInterval(windForward, 200);
  }
}

function windBackward(){
  /* if currentTime is back at the start stop the windback so it doesn't overshoot 0 */
  if(media.currentTime <=3) {
    stopMedia();
  } else {
    media.currentTime -= 3;
  }
}

function windForward(){
  /* if currentTime is at the end of curation stop the fast forward so it doesn't overshoot */
  if(media.currentTime >= media.duration - 3) {
    stopMedia();
  } else {
    media.currentTime += 3;
  }
}

/* add an event listener for the elapsed time and then define it's functionality */

media.addEventListener("timeupdate", setTime);

function setTime(){
  console.log("update")
  let minutes = Math.floor(media.currentTime / 60);
  let seconds = Math.floor(media.currentTime - minutes * 60);

  let minuteValue = minutes.toString().padStart(2, "0");
  let secondValue = seconds.toString().padStart(2, "0");

  /* both this line and the one four lines below uses what's called template literals to
     dynamically create strings - note the use of ` not ' or " to define the string and ${}
     to define the input variable */

  /* this is like adding strings together - the other way to write this out would be:
     minuteValue + ":" + secondValue - by adding the variables to the string you convert them 
     all into a single string, however it can get messy so instead template literals are often
     used to write them all in one easier to read statement */

  /* for more information check out the link on modules to String Interpolation */

  let mediaTime = `${minuteValue}:${secondValue}`;
  
  timer.textContent = mediaTime;

  let barLength = timerWrapper.clientWidth * (media.currentTime/media.duration);
  timerBar.style.width = `${barLength}px`;
}

  /*  Below is the JS for the Volume Change Slider. We added an event listener which essentially waits for an event to occur, in this case it was the input tag which enables us to change the volume via an input type range slider.This sliders enables 0 to be the lowest volume (mute) with 1 being the loudest. Users can essentially slide the slider to the right or left to adjust the volume. */
volSlider.addEventListener("input" , (e) =>{
changeVolume(e.target.value);
})

function changeVolume(newVolume){
  media.volume = newVolume;
}

/* The 'function' element assists with defining and executing the code. So when the slider is moved, the media (which is the video), gets a change in volume depending on its location within the range. If its located to the right the volume would be at its highest point, reaching the max 1. */


/* This is the JS code for the Mute button */
/* I added an EventListener so when the mute button is clicked, the media would either mute or unmute. */
mute.addEventListener("click", muteUnmute)

function muteUnmute(){
  if(media.muted){
    media.muted = false;
    mute.setAttribute('data-icon', 'Q');
  } else {
    media.muted = true;
    mute.setAttribute('data-icon', 'g');
  }
}
/* The function tells us that if the mute button is clicked and equals false then the media would set its attribute data-icon to Q which is the the volume mute icon. As the EventListener is applied, when the user clicks on the mute icon it is able to change between mute and unmute settings with a click.  */
/* Following, if media.mute is true then the icon will switch to 'g', unmuting the media */

/* Below is the JS for the Fullcreen button */
var elem = document.getElementsByClassName("media");
/* Additionally, I added an Event Listener to which when the fullscreen icon is clicked the function of the media displays in a full-screen.   */
fullscreen.addEventListener("click", function (media) {
  if (media.target.hasAttribute('fullscreen')) return;

  /* Similarly to the mute button, if the full screen button is clicked, the setAttribute('data-icon', 'M') allows the icons to be switched to the M icon which displays the wholescreen as a fullscreen. */
  if (document.fullscreenElement) {
    document.exitFullscreen();
    fullscreen.setAttribute('data-icon', 'M');
  } else {
    /* Once in full screen and you want to exit, the button is displayed in the controls as a setAttribute('data-icon', 'm'), allows the users to recognise the button to escape from fullscreen. Alternativly as the JS of the requestFullscreen is applied, users can use the 'esc' button located on the top-left hand side of the keyboard to escape. */
    document.documentElement.requestFullscreen();
    fullscreen.setAttribute('data-icon', 'm');
  }

}, false);
  
/* I did have many issues with applying a full-screen icon, but after many tutorials and research on websites regarding the requestFullscreen procedure I was able to make a functioning fullscreen button. When I used the procedure provided by MDN web doc, the media was the only element that went into full-screen, which is what I was attempting to do. However, I did realise when the media was in fullscreen, the video became default to its pre-existing functions showing a scroll bar, playback quality etc (all of which I did not implement). This made me think it was not functioning correctly and/or that there was an error. After trial and error, this was the result of the experimental testing and though the media isn't displayed fully, I am happy that the code is still intact. */