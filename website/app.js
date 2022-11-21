// the main button
const theGenButton = document.querySelector("#generate");
// Personal API Key for OpenWeatherMap API
const apiKey = "03cc0bc38009e71cf898d92dd7ad2a3f&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

/* Function called by event listener */
const generateF = () => {
  const userZIPcode = document.querySelector("#zip").value;
  const userHowFeels = document.querySelector("#feelings").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?zip=${userZIPcode}&appid=`;
  const apiFetch = mainF(url);
  apiFetch
    .then((dataGot) => {
      // console.log(data);
      const objFinData = {
        varTemp: dataGot.main.temp,
        userFeeling: userHowFeels,
        currentDate: newDate,
      };
      sendObjData("/put", objFinData);
    })
    .then(() => retrieveData());
};

/* Function to GET Web API Data*/
const mainF = async (url) => {
  const wholeLink = url + apiKey;
  const response = await fetch(wholeLink);
  try {
    const date = await response.json();

    return date;
  } catch (error) {
    console.log("Attention: ", error);
  }
};

// Function to send Data to LocalServer

const sendObjData = async (putRoute, objFinData) => {
  const response = await fetch(putRoute, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(objFinData),
  });
  try {
    const dataRespons = await response.json();
    console.log(dataRespons);
  } catch (error) {
    console.log("Attention: ", error);
  }
};

// Function to get data from LocalServer
const retrieveData = async () => {
  const request = await fetch("/get");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.varTemp) + "degrees";
    document.getElementById("content").innerHTML = allData.userFeeling;
    document.getElementById("date").innerHTML = allData.currentDate;
  } catch (error) {
    console.log("Attention: ", error);
    // appropriately handle the error
  }
};

// Event listener to add function to existing HTML DOM element
theGenButton.addEventListener("click", generateF);
