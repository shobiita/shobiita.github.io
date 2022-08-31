let isDark = false;

function switchModes(){
  
  if(isDark === true){
      console.log("im true");
      document.documentElement.style.setProperty("--col-01", "#000000");
      document.documentElement.style.setProperty("--col-02", "#ffffff");
      document.getElementById ("modeButton") .innerHTML = "Dark Mode";
      isDark = false;
    } 
    else {
      console.log("im false");
      document.documentElement.style.setProperty("--col-01","#ffffff");
      document.documentElement.style.setProperty("--col-02","#000000");
      document.getElementById ("modeButton") .innerHTML = "Light Mode";
      isDark = true;
  }
}