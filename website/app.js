/* Global Variables */
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

const key = '0b26df611e6727d54c2adf7a4a2886a1';

const generateBtn = document.getElementById('generate');
const zipCode = document.getElementById('zip');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getWeatherFunction = async (zipcode) => {

    const apiURL = baseURL + "?zip=" +zipCode.value + "&appid="+ key;
    const res = await fetch(apiURL);
    try {
      const userData = await res.json();
      return `${userData.main.temp}°C, ${userData.weather[0].description}, ${userData.name}`;
    } catch (error) {
      console.log("error", error);
      console.log('invalid zip code')
    }
};

generateBtn.addEventListener('click', async () => {
    await postData("/addWeather", {
      date: newDate,
      temperature: await getWeatherFunction(),
      feelings: document.getElementById('feelings').value,
    });
    updateUIDynamically('/getWeather');
});

const updateUIDynamically = async (url = '') => {
    const res = await fetch('http://localhost:5500' + url);
    try {
      const projectData = await res.json();
      console.log(projectData);
      document.getElementById('date').innerHTML = projectData.date;
      document.getElementById('temp').innerHTML = projectData.temperature;
      document.getElementById('content').innerHTML = projectData.feelings;
    } catch (error) {
      console.log(error);
    }
}

const postData = async (url = "", data = {}) => {
    url = 'http://localhost:5500' + url;
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error);
    }
};