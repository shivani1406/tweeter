function Count() {  
  
  let i = document.getElementById("tweet-text").value.length; 
  let output =  document.getElementById("counter");
  document.getElementById("counter").innerHTML = 140 - i;  
  if ((document.getElementById("counter").innerHTML) < 0) {
    output.classList.add("red");
  } else {
    output.classList.remove("red");
  }
}  