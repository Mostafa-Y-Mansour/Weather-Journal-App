/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

// Server URL to Post data
const server = "http://localhost:8000";

// function to GET Web API Data
async function getApiData(zipCode) {
  // Api Key from OpenWeatherMap.org
  const apiKey = "5e605de747cef4e7e217c9b0275cfed1";
  // the url to get the weather Data from the API
  const apiUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // log the status in the console
    console.log(`status: ${data.cod}`);
    const status = document.querySelector(".status");
    if (data.cod != 200) {
      status.innerHTML = "ERROR";
      status.style.backgroundColor = "rgb(255 68 68 / 66%)";
      status.style.opacity = 1;
    }
    return data;
  } catch (err) {
    console.log(err);
  }
}

// function to POST data
async function postApiData(url = "", info = {}) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  try {
    const apiData = await res.json();
    return apiData;
  } catch (err) {
    console.log(err);
  }
}

// updating the page with the data

async function updatePage() {
  const res = await fetch(server + "/all");
  try {
    const savedApiData = await res.json();

    document.getElementById("date").innerHTML = `Date: ${savedApiData.newDate}`;
    document.getElementById("city").innerHTML = savedApiData.city;
    document.getElementById(
      "temp"
    ).innerHTML = `Temp: ${savedApiData.temp}&degC`;
    document.getElementById(
      "content"
    ).innerHTML = `Feeling: ${savedApiData.feelings}`;
  } catch (err) {
    console.log(err);
  }
}

// Event listener
document.getElementById("generate").addEventListener("click", () => {
  // Get the value after clicking on the button
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  // getWeatherData return promise
  getApiData(zipCode).then((data) => {
    // making sure from the received data to execute rest of the steps
    if (data) {
      const {
        main: { temp },
        name: city,
      } = data;

      const info = {
        temp: Math.round(temp),
        newDate: newDate,
        city: city,
        feelings: feelings,
      };

      postApiData(server + "/add", info);

      document.querySelector(".entry").style.visibility = "visible";
      updatePage();
    }
  });
});
