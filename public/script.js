
fetch('/63712b265de711c784cc654d268aa0f4')
  .then((res)=> res.json())
  .then((data)=>{
    apiKey = data.apiKey;
    
  })
  .catch((error)=>{
    console.log(error);
  });

const C = document.getElementById('country');
const F = document.getElementById('flag');

document.addEventListener("DOMContentLoaded", function () {
    const worldMap = document.getElementById("world-map");
    const latitudeElement = document.getElementById("latitude");
    const longitudeElement = document.getElementById("longitude");
    const city = document.getElementById("city");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    

    worldMap.addEventListener("click", function (event) {
        const rect = worldMap.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const mapWidth = worldMap.width;
        const mapHeight = worldMap.height;

        const latitude = -(((y / mapHeight) * 180) -90);
        const longitude = ((x / mapWidth) * 360) - 180;

        const latInput = latitude.toFixed(2);
        const lonInput = longitude.toFixed(2);

        latitudeElement.textContent = latInput;
        longitudeElement.textContent = lonInput;
        

        
        fetchWeather(latInput,lonInput);
    
    });
});


function fetchWeather(lat, long){
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
    .then(res => {
      return res.json(); // Return the JSON-parsed data
    })
    .then(data => {
      
      // Log the parsed data

      
      const countryName = data.city.country;
      if (countryName === ''){
        C.textContent = ("No Country Detected");
        C.style.color = 'red';
        if (F.hasChildNodes()){F.removeChild(F.firstChild)};
        
      }else{
      fetchCountry(countryName);
      }

      const clickedOnCity = data.city.name;

      if (clickedOnCity === ""){
        city.textContent = "No City Detected"
        city.style.color = 'red';
      }else{
        city.style.color = 'black'
        city.textContent = clickedOnCity;
      }
      

      const tempNow = data.list[0].main.temp;
      temp.textContent = tempNow+" C";

      const humidityNow = data.list[0].main.humidity;
      humidity.textContent = humidityNow +"%";

      const weatherStatus = data.list[0].weather[0].description;
      disc.textContent = weatherStatus;

      

    })
    .catch(error => {
      console.log("ERROR");
    });
};

const worldMap = document.getElementById("world-map");
worldMap.addEventListener("click", function(event){
  const newPin = '<img id="pin" src="images/map-pin.png" height="50px" width="50px">';

  if (document.body.firstChild === document.querySelector('#pin')){
    const x = 1;
  }else{
  document.querySelector('body').insertAdjacentHTML('afterbegin',newPin)
  }
  const pinImage = document.getElementById("pin"); // Custom pin image
  
  pinImage.style.left = event.x -16 + "px";
  pinImage.style.top = event.y -43 + "px";
  

})



function fetchCountry(countryCode){
  fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`)
  
  .then(res=>{
    return res.json()
  })
  .then(data => {
    
    const clickedOnCountry = data[0].name.common;

    
    C.textContent = clickedOnCountry;
    C.style.color = 'black';


    
    const flagImg = data[0].flags['png'];

    var imgElement = document.createElement("img");
    imgElement.src = flagImg;
    imgElement.alt = `Flag of ${clickedOnCountry}`;
    imgElement.height = 60;
    imgElement.width = 100;


    if (F.hasChildNodes()){
      F.removeChild(F.firstChild);
    }

    F.appendChild(imgElement);
    
    })
}


const darkmodeButton = document.getElementById('darkmode-toggle');

darkmodeButton.addEventListener("click",function(event){
  
  document.body.classList.toggle('dark-body');
  document.querySelector('h1').classList.toggle('dark-header');

  document.getElementById('country').classList.toggle('span-darkmode');
  document.getElementById('city').classList.toggle('span-darkmode');
  
  document.getElementById('live-header').classList.toggle('liveInfo-darkmode');

  document.querySelector('.live-info-container').classList.toggle('live-info-container-darkmode')

});
