function Count() {  
  
  var i = document.getElementById("tweet-text").value.length;  
  document.getElementById("counter").innerHTML = 140 - i;  

}  