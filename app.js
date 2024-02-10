const container = document.getElementById("container");
const apiKey = "55ff5b9f1aa556e25d9767c01329b185";

function submitCity() {
  let city = document.getElementById("city").value;
  curWeather(city);
  forecast(city);
}

const curWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const objecturl = await fetch(url);
  const object = await objecturl.json();

  if (object.message != undefined) {
    document.getElementById("cityName").innerHTML = `
         <div class="text-center text-2xl font-extrabold text-gray-600">
           ${object.message}
         </div>
  `;
  } else {
    container.innerHTML = `
    <div class="">
      <div class="bg-[#d1e5f4] rounded-xl w-60 mx-auto p-1 opacity-50">
        <h1 class="text-cyan-800 text-3xl text-bold text-center mt-3">${object.main.temp}°C</h1>
           <br>
        <img src="http://openweathermap.org/img/wn/${object.weather[0].icon}@2x.png" class="-mt-3 mx-auto">
        <p class="text-center text-teal-700 text-2xl">${object.weather[0].main}</p>
      </div>
    </div>
  `;
    document.getElementById("cityName").innerHTML = `${object.name}`;
  }
};

const forecast = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  const objecturl = await fetch(url);
  const object = await objecturl.json();

  let data = [];
  footer.innerHTML = "";
  let list = object.list;
  for (let num = 0; num < list.length; num++) {
    const element = list[num];
    let variable = new Date(element.dt_txt).getHours();
    if (variable === 0) {
      data.push(element);
    }
  }

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  for (let num = 0; num < data.length; num++) {
    const element = data[num];
    footer.innerHTML += `
    <div>
    <span>${days[new Date(element.dt_txt).getDay()]}</span> 
    <img src="http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png" class="w-10">
    <span>${element.main.temp}</span>
    </div>
     `;
  }
  btn.disabled = false;
};
