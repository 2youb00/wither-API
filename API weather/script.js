const APIkey="2c01d4ca15d2c85d599ca50e5d24c654";
const APIurl="https://api.openweathermap.org/data/2.5/weather?&units=metric";
let searchbtn = document.querySelector(".seach-icon");
let locationbtn = document.querySelector(".location-icon");
let weather_icon = document.querySelector(".weather-icon");

function pastAPI(data){
   document.querySelector(".temp").innerHTML=Math.round(data.main.temp)+"°c";
   document.querySelector(".city").innerHTML=data.name;
   document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
   document.querySelector(".wind").innerHTML=data.wind.speed+"km/h";
   weather=data.weather[0].main;
   weather_description=data.weather[0].description;
   if(weather=="Clouds"){
    if(weather_description=="few clouds"){
    weather_icon.src="img/12.svg";}
    else if(weather_description=="scattered clouds" ||weather_description=="broken clouds" ){
        weather_icon.src="img/3.svg";
    }
    else{
        weather_icon.src="img/clouds.svg";
       }
   }

   else if(weather=="Clear"){
    weather_icon.src="img/1.svg";
}
else if(weather=="Rain"){
    weather_icon.src="img/rain_icon.svg";
    if(weather_description=="light rain" ||weather_description=="light intensity shower rain" ){
        weather_icon.src="img/light rain.svg";}
}
else if(weather=="Mist"){
    weather_icon.src="img/mist_icon.svg";
}
document.querySelector(".weather").style.display = 'block';
}
async function getAPI(city_name){
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${APIkey}&units=metric`);
    const data= await response.json();
    console.log(data);
    console.log(data.weather[0].main);
    console.log(data.weather[0].description);
   return(pastAPI(data)) ;
}


getAPI("ferdjioua");

// get the locatoin *************************************************

async  function locatoinAPI(latitude,longitude){
    const response= await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=
    ${latitude}&longitude=${longitude}&localityLanguage=en`)
    const data= await response.json();
    console.log(data);
    console.log(data.locality);
    getAPI(data.locality);
}
function locatoin(){
    const success =(position)=>{
        console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        locatoinAPI(latitude,longitude);
    }
    const error = ()=>{
        console.log("fuck you");
    }
    navigator.geolocation.getCurrentPosition(success,error);

}
/// click and start  the functions ***************************************
locationbtn.addEventListener('click',()=>{
    locatoin();
    locationbtn.style.backgroundColor = '#dbdbdb';//
})
searchbtn.addEventListener('click',()=>{
    let city_name = document.querySelector(".search input").value;
    getAPI(city_name);
    locationbtn.style.backgroundColor = '#fff';
})
document.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        let city_name = document.querySelector(".search input").value;
    getAPI(city_name);
    locationbtn.style.backgroundColor = '#fff';
    }
})
