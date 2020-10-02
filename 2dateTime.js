let fullDate = new Date();
let dd = String(fullDate.getDate()).padStart(2, '0');
let mm = String(fullDate.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = fullDate.getFullYear();
let today = dd + '.' + mm + '.' + yyyy;
let hour = fullDate.getHours()
let minutes = fullDate.getMinutes()


minutesFormatting(minutes);
hourFormatting(hour);

function minutesFormatting(data){
  if (data < 10){
    minutes = ("0" + data);
    console.log("minutesFormatting");
  } 
}

function hourFormatting(data){
  if (data < 10){
    hour = ("0" + data);
    console.log("hourFormatting");
  } 
}

let time = hour +  "." + minutes;

let dateTime = today + "-" + time;


module.exports = {dateTime};
