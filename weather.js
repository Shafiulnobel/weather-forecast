const spinner = document.getElementById("spinner");
function getUser() {
  fetch(`https://randomuser.me/api/`)
    .then(res => res.json())
    .then(data => displayUser(data.results[0]))
}
function getDaily(place) {
  spinner.removeAttribute('hidden');
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=QG444NSSA4R6RB5WV9DU8724L&contentType=json`)
    .then(res => res.json())
    .then(data => {
      spinner.setAttribute('hidden', '');
      loadDaily(data.days)
    })
}

function getData(place){

  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=QG444NSSA4R6RB5WV9DU8724L&contentType=json`)
    .then(res => res.json())
    .then(data => loadData(data.days))
}
const loadData=day=>{
  const chart = document.getElementById('chart');
  chart.style.backgroundColor = 'black';
  chart.style.color = 'white';
  var ctx = document.getElementById("myChart").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          // labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saterday"],
          labels: [day[0].temp+" (Sun)", day[1].temp+" (Mon)",day[2].temp+" (Tues)", day[3].temp+" (Wed)",day[4].temp+" (Thurs)", day[5].temp+" (Fri)", day[6].temp+" (Sat)"],
          datasets: [{
              label: '# Temp(Fahrenheit)',
              data: [day[0].temp, day[1].temp,day[2].temp, day[3].temp,day[4].temp, day[5].temp, day[6].temp],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(255, 206, 86, 0.2)'
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(255, 206, 86, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
      }
  });
}

const loadDaily = days => {
  const daysContainer = document.getElementById('days-container');
  daysContainer.innerHTML=``;
  days.slice(0, 7).forEach(day => {
    const dayWrapper = document.getElementById('dayswrapper');
    dayWrapper.style.backgroundColor = 'black';
    const temp = day.temp;
    const tempConv = ((temp - 32) / 1.8).toFixed(0);
    const date = new Date(`${day.datetime}`);
    const days = date.getDay();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday","Saterday"];

    // console.log(dayNames[days]);
    const daysDiv = document.createElement('div');
  
    daysDiv.classList.add('col');
    daysDiv.innerHTML = `
      <div class="card">
      <div class="card-body">
        <h5 class="card-title">${dayNames[days]}</h5>
        <img src="icons/${day.icon}.png" class="card-img-top" alt="...">
        <p class="card-text">${tempConv}°</p>
      </div>
    </div>
      `;
    daysContainer.appendChild(daysDiv);
  })


}

const displayUser = users => {
  const navContainer = document.getElementById('navbar');
  const navdiv = document.createElement('div');
  navdiv.classList.add('container-fluid');
  navdiv.innerHTML = `
  <div class="row gx-5">
    <div class="col">
    <img style="border-radius: 50%;" src="${users.picture.thumbnail}"  alt="...">
    </div>
    <div class="col">
    <p>Hi, ${users.name.last}</p>
    </div>
  </div>
  
  
  <button style="color:white" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  `;
  navContainer.appendChild(navdiv);
}
function search() {
  const searchField = document.getElementById('search');
  const searchVlaue = searchField.value;
  console.log(searchVlaue);
  current(searchVlaue);
  getDaily(searchVlaue);
  getData(searchVlaue);
  searchField.value = '';
}

function current(place) {
  spinner.removeAttribute('hidden');
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=us&key=QG444NSSA4R6RB5WV9DU8724L&contentType=json`)
    .then(res => res.json())
    .then(data => {
      spinner.setAttribute('hidden', '');
      displayCurrent(data)
    })
}



const displayCurrent = data => {


  const temp = data.currentConditions.temp;
  const tempConv = ((temp - 32) / 1.8).toFixed(0);
  const current = document.getElementById('current');
  current.style.backgroundColor = 'black';
  const container = document.getElementById('current-container');
  container.innerHTML = ``;
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
    <div class="card bg-dark text-light">
    <div class="card-body">
      <div class="row row-cols-1 row-cols-lg-5 g-2 g-lg-3 ">
              <div class="col d-flex align-items-center">
                <div class="p-3">
                <img src="icons/${data.currentConditions
      .icon}.png" class="card-img-top" alt="...">
                  <p class="card-text">${data.currentConditions.conditions}</p> 
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                <h5 class="card-title">${data.resolvedAddress}</h5>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                <h1 class="card-text">+${tempConv}°</h1>
                <p class="card-text">Temperature</p>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                <h1 class="card-text">${data.currentConditions.humidity}%</h1>
                <p class="card-text">Humidity</p>
                </div>
              </div>
              <div class="col">
                <div class="p-3">
                <h2 class="card-text">${data.currentConditions.windspeed}km/h</h2>
                <p class="card-text">Wind speed</p>
                </div>
              </div>
             
            </div>

      
    </div>
  </div>
    `;
  container.appendChild(div);
}

getUser();