const $ = (selector) => document.querySelector(selector);
var clickNum = 0;
var chart1Data = null;
var chart2Data = null;

//current location automatically loads
function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log ("not provide");
    }
  }
  function showPosition(position) {
    const latitude= position.coords.latitude;
    const longitude = position.coords.longitude;
    const request = new XMLHttpRequest();

    console.log(request);
	if (request) {
		request.onreadystatechange = function () {
			buildPage1(request);
		};
		request.open("GET", `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=b3c520c62e579fb37874d14b0a970b60`, true);
		request.send(null);
	}
  }
  function showError(error) {
    switch (error.code) {
    case error.PERMISSION_DENIED:
      alert ("rejected");
      break;
    case error.POSITION_UNAVAILABLE:
        alert ("invaild");
      break;
    case error.TIMEOUT:
        alert("overtime");
      break;
    case error.UNKNOWN_ERROR:
        alert ("not known");
      break;
    }
  }


//diaplay map
function drawMap(latitude,longitude) {
    const myOptions = {
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    const map = new google.maps.Map(document.getElementById("mapDiv"), myOptions);
    const initialLocation = new google.maps.LatLng(latitude, longitude);
    const marker = new google.maps.Marker({
        position: initialLocation,
        map: map,
        title: "Hello World!"
    });
    map.setCenter(initialLocation);
}



const getData1 = (location) => {
	// Ajax code goes here
	const request1 = new XMLHttpRequest();
	//const url1s = "https://api.openweathermap.org/data/2.5/forecast?q=" + location +"&appid=b3c520c62e579fb37874d14b0a970b60";
    const url1c = "https://api.openweathermap.org/data/2.5/forecast?q=" + location +"&units=metric&appid=b3c520c62e579fb37874d14b0a970b60";
    const url1f = "https://api.openweathermap.org/data/2.5/forecast?q=" + location +"&units=imperial&appid=b3c520c62e579fb37874d14b0a970b60";
    
    const request2 = new XMLHttpRequest();
    const url2c = "https://api.openweathermap.org/data/2.5/forecast?q=Beijing&units=metric&appid=b3c520c62e579fb37874d14b0a970b60";
    const url2f = "https://api.openweathermap.org/data/2.5/forecast?q=Beijing&units=imperial&appid=b3c520c62e579fb37874d14b0a970b60";

    const request3 = new XMLHttpRequest();
    const url3c = "https://api.openweathermap.org/data/2.5/forecast?q=Dublin&units=metric&appid=b3c520c62e579fb37874d14b0a970b60";
    const url3f = "https://api.openweathermap.org/data/2.5/forecast?q=Dublin&units=imperial&appid=b3c520c62e579fb37874d14b0a970b60";

    const request4 = new XMLHttpRequest();
    const url4c = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=b3c520c62e579fb37874d14b0a970b60";
    const url4f = "https://api.openweathermap.org/data/2.5/forecast?q=London&units=imperial&appid=b3c520c62e579fb37874d14b0a970b60";

    if(request4){
        if(request3){
            if(request2){
                if(request1){
                    request1.onreadystatechange = function(){
                        buildPage1(request1);
                    };
                    request2.onreadystatechange = function(){
                        buildPage2(request2);
                    };
                    request3.onreadystatechange = function(){
                        buildPage3(request3);
                    };
                    request4.onreadystatechange = function(){
                        buildPage4(request4);
                    };
            }
        }
    }
    
    
        //Celsius or Fahrenheit
        if(clickNum == 0 || clickNum%2 == 0){
            request1.open("GET", url1c, true);
            request2.open("GET", url2c, true);
            request3.open("GET", url3c, true);
            request4.open("GET", url4c, true);
        }else if(clickNum%2 == 1){
            request1.open("GET", url1f, true);
            request2.open("GET", url2f, true);
            request3.open("GET", url3f, true);
            request4.open("GET", url4f, true);
        }

        request1.send(null);
        request2.send(null);
        request3.send(null);
        request4.send(null);
    }
     
}



// callback function that's registered for the 'onreadystatechange' event
const buildPage1 = (request1) => {
	if (request1.readyState == 4) {
		if ((request1.status == 200) || (request1.status == 304)) {
			// Access the data returned from the server and display on page
			const data1 = JSON.parse(request1.responseText);
			console.log(data1);
            
            let dateContainer1 =`<h2 class="date-city">${data1.city.name}</h2>`;
            dateContainer1 += `<span class="date-day">${data1.list[0].dt_txt}</span>`;
			$(".date-container1").innerHTML = dateContainer1;

            let weatherContainer1 = `<img src="http://openweathermap.org/img/wn/${data1.list[0].weather[0].icon}@2x.png" >`;

            //Switching unit °C or °F - according to whether the current value is Celsius or Fahrenheit
            if(clickNum == 0 || clickNum%2 == 0){
                weatherContainer1 += `<div class="weather-temp">${Math.round(data1.list[0].main.temp)}<p>°C</p></div>`;
            }else if(clickNum%2 == 1){
                weatherContainer1 += `<div class="weather-temp">${Math.round(data1.list[0].main.temp)}<p>°F</p></div>`;
            }                   
            weatherContainer1 += `<div class="weather-desc">${data1.list[0].weather[0].main}</div>`;
            $(".weather-container1").innerHTML = weatherContainer1;

            //Switching unit °C or °F - according to whether the current value is Celsius or Fahrenheit
            let todayInfor = `<div class="temp-min clear">
                                <span class="title">minimum temperature</span>`;
            if(clickNum == 0 || clickNum%2 == 0){
                todayInfor += `<span class="value">${Math.round(data1.list[0].main.temp_min)}°C</span></div>`;
            }else if(clickNum%2 == 1){
                todayInfor += `<span class="value">${Math.round(data1.list[0].main.temp_min)}°F</div>`;
            }  
            todayInfor +=  `<div class="temp-max clear">
                                <span class="title">maximum temperature</span>`;
            if(clickNum == 0 || clickNum%2 == 0){
                todayInfor += `<span class="value">${Math.round(data1.list[0].main.temp_max)}°C</span></div>`;
            }else if(clickNum%2 == 1){
                todayInfor += `<span class="value">${Math.round(data1.list[0].main.temp_max)}°F</div>`;
            } 
                                

            todayInfor +=  `<div class="humidity clear">
                                <span class="title">Humidity</span>
                                <span class="value">${data1.list[0].main.humidity}</span>
                            </div>

                            <div class="wind clear">
                                <span class="title">Wind Speed</span>
                                <span class="value">${data1.list[0].wind.speed}</span>
                            </div>

                            <div class="visibility clear">
                                <span class="title">Visibility</span>
                                <span class="value">${data1.list[0].visibility}</span>
                            </div>`;
            $(".today-info").innerHTML = todayInfor;

            //setting differet dataset - according to whether the current value is Celsius or Fahrenheit
            if(clickNum == 0 || clickNum%2 == 0){
                chart1Data = {
                    labels:[data1.list[0].dt_txt.slice(0,10),
                            data1.list[8].dt_txt.slice(0,10),
                            data1.list[16].dt_txt.slice(0,10),
                            data1.list[24].dt_txt.slice(0,10),
                            data1.list[32].dt_txt.slice(0,10)],
                    datasets: [{
                        label: 'Celsius/°C',
                        data: [Math.round(data1.list[0].main.temp), 
                        Math.round(data1.list[8].main.temp), 
                        Math.round(data1.list[16].main.temp), 
                        Math.round(data1.list[24].main.temp), 
                        Math.round(data1.list[32].main.temp)],
                        backgroundColor: "rgba(76, 211, 218, 0.8)"
                      }, {
                        label: 'Fahrenheit/°F',
                        data: [Math.round(data1.list[0].main.temp*1.8+32), 
                        Math.round(data1.list[8].main.temp*1.8+32), 
                        Math.round(data1.list[16].main.temp*1.8+32), 
                        Math.round(data1.list[24].main.temp*1.8+32), 
                        Math.round(data1.list[32].main.temp*1.8+32)],
                        backgroundColor: "rgba(54, 74, 181, 0.8)"
                      }]
                };
            }else if(clickNum%2 == 1){
                chart1Data = {
                    labels:[data1.list[0].dt_txt.slice(0,10),
                            data1.list[8].dt_txt.slice(0,10),
                            data1.list[16].dt_txt.slice(0,10),
                            data1.list[24].dt_txt.slice(0,10),
                            data1.list[32].dt_txt.slice(0,10)],
                    datasets: [{
                        label: 'Celsius/°C',
                        data: [Math.round((data1.list[0].main.temp-32)/1.8), 
                        Math.round((data1.list[8].main.temp-32)/1.8), 
                        Math.round((data1.list[16].main.temp-32)/1.8), 
                        Math.round((data1.list[24].main.temp-32)/1.8), 
                        Math.round((data1.list[32].main.temp-32)/1.8)],
                        backgroundColor: "rgba(76, 211, 218, 0.8)"
                      }, {
                        label: 'Fahrenheit/°F',
                        data: [Math.round(data1.list[0].main.temp), 
                        Math.round(data1.list[8].main.temp), 
                        Math.round(data1.list[16].main.temp), 
                        Math.round(data1.list[24].main.temp), 
                        Math.round(data1.list[32].main.temp)],
                        backgroundColor: "rgba(54, 74, 181, 0.8)"
                      }]
                };
            }  
            //line chart
            var ctx = document.getElementById('myChart1').getContext('2d');
            var myChart1 = new Chart(ctx, {
                type: 'line',
                data: chart1Data,
            });

            //bar chart
            chart2Data = {
                labels:[data1.list[0].dt_txt.slice(0,10),data1.list[8].dt_txt.slice(0,10),data1.list[16].dt_txt.slice(0,10),data1.list[24].dt_txt.slice(0,10),data1.list[32].dt_txt.slice(0,10)],
                datasets: [{
                    label: 'sea level',
                    data: [data1.list[0].main.sea_level, 
                    data1.list[8].main.sea_level, 
                    data1.list[16].main.sea_level, 
                    data1.list[24].main.sea_level, 
                    data1.list[32].main.sea_level],
                    backgroundColor: "rgba(76, 211, 218, 0.8)"
                  }, {
                    label: 'grnd level',
                    data: [data1.list[0].main.grnd_level, 
                    data1.list[8].main.grnd_level, 
                    data1.list[16].main.grnd_level, 
                    data1.list[24].main.grnd_level, 
                    data1.list[32].main.grnd_level],
                    backgroundColor: "rgba(54, 74, 181, 0.8)"
                  }]
            };
            var ctx = document.getElementById("myChart2").getContext('2d');
            var myChart2 = new Chart(ctx, {
            type: 'bar',
            data: chart2Data,
            });

            var latitude = `${data1.city.coord.lat}`;
            var longitude = `${data1.city.coord.lon}`;
            drawMap(latitude,longitude);

        }
	}
};

const buildPage2 = (request2) => {
	if (request2.readyState == 4) {
		if ((request2.status == 200) || (request2.status == 304)) {
			// Access the data returned from the server and display on city1
            const data2 = JSON.parse(request2.responseText);
            console.log(data2);


            let city1 =`<h3 class="city1-name">${data2.city.name}</h3>
            <img src="http://openweathermap.org/img/wn/${data2.list[0].weather[0].icon}@2x.png" >`;
            if(clickNum == 0 || clickNum%2 == 0){
                city1 += `<h4 class="city1-temp">${Math.round(data2.list[0].main.temp)}°C</h4>`;
            }else if(clickNum%2 == 1){
                city1 += `<h4 class="city1-temp">${Math.round(data2.list[0].main.temp)}°F</h4>`;
            }   
            $(".city1").innerHTML = city1;

        }
	}
};
const buildPage3 = (request3) => {
	if (request3.readyState == 4) {
		if ((request3.status == 200) || (request3.status == 304)) {
			// Access the data returned from the server and display on city2
            const data3 = JSON.parse(request3.responseText);
            console.log(data3);


            let city2 =`<h3 class="city2-name">${data3.city.name}</h3>
            <img src="http://openweathermap.org/img/wn/${data3.list[0].weather[0].icon}@2x.png" >`;
            if(clickNum == 0 || clickNum%2 == 0){
                city2 += `<h4 class="city2-temp">${Math.round(data3.list[0].main.temp)}°C</h4>`;
            }else if(clickNum%2 == 1){
                city2 += `<h4 class="city2-temp">${Math.round(data3.list[0].main.temp)}°F</h4>`;
            }   
            $(".city2").innerHTML = city2;

        }
	}
};
const buildPage4 = (request4) => {
	if (request4.readyState == 4) {
		if ((request4.status == 200) || (request4.status == 304)) {
			// Access the data returned from the server and display on city3
            const data4 = JSON.parse(request4.responseText);
            console.log(data4);


            let city3 =`<h3 class="city3-name">${data4.city.name}</h3>
            <img src="http://openweathermap.org/img/wn/${data4.list[0].weather[0].icon}@2x.png" >`;
            if(clickNum == 0 || clickNum%2 == 0){
                city3 += `<h4 class="city3-temp">${Math.round(data4.list[0].main.temp)}°C</h4>`;
            }else if(clickNum%2 == 1){
                city3 += `<h4 class="city3-temp">${Math.round(data4.list[0].main.temp)}°F</h4>`;
            }   
            $(".city3").innerHTML = city3;

        }
	}
};




window.addEventListener('load', () => {
    getLocation();

	$(".location-button").addEventListener('click', () => {
		const location = $(".location").value;
		console.log(location);
		getData1(location);
	});

    
    $(".onoffswitch-label").addEventListener('click', () => {
        clickNum++;
        console.log(clickNum);
	})
});