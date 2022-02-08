// Create a table to show every day in Feb
let monthHTML = `
<table>
 <caption>February</caption>
 <tr>
 <th>Mon</th>
 <th>Tue</th>
 <th>Wed</th>
 <th>Thu</th>   
 <th>Fri</th>
 <th>Sat</th>
 <th>Sun</th>
 </tr>
 <tr>
 <td id='d2022-01-31'>31</td>
 <td id='d2022-02-01'>1</td>
 <td id='d2022-02-02'>2</td>
 <td id='d2022-02-03'>3</td>
 <td id='d2022-02-04'>4</td>
 <td id='d2022-02-05'>5</td>
 <td id='d2022-02-06'>6</td>
 </tr>
 <tr>
 <td id='d2022-02-07'>7</td>
 <td id='d2022-02-08'>8</td>
 <td id='d2022-02-09'>9</td>
 <td id='d2022-02-10'>10</td>
 <td id='d2022-02-11'>11</td>
 <td id='d2022-02-12'>12</td>
 <td id='d2022-02-13'>13</td>
 </tr>

</table>
`;
// jQuery.get("/lionking/2021-02-02",function(data){
//   let x = JSON.parse(data)
//   console.log(x)
// })
//   .then((r) => r.json())
//   .then((r) => {
//     console.log(r)
//     for(let d of r){
//       console.log(d.days)
//     }

// })
// for (let day = 1; day < 31; day ++){
//     console.log(day)
//     let monthHTML =`<div class="day">${day}</div>`;

// }
// let data = JSON.parse("{{ result }}");

// console.log(data)
// year = 2021
// month = 02

let dateTime = new Date();
let realDateTime = dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+'1';
// let realDateTime = dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+dateTime.getDate();
// console.log(realDateTime)
// realDateTime = 2022-01-01

fetch(`/lionking/${realDateTime}`)
  .then(r => r.json())
  .then(r => {
    // console.log(r.week)
    let dayName = `
    <tr>
    <th>Mon</th>
    <th>Tue</th>
    <th>Wed</th>
    <th>Thu</th>
    <th>Fri</th>
    <th>Sat</th>
    <th>Sun</th>
    </tr>
    `
    document.getElementById('tab').innerHTML = dayName;
    for (let week of r.week ){
      let row = document.createElement('tr');
      // console.log(week)
      
      for (let eachDay of week){

        function changeDateFormat(date) {
          let changeDate = new Date(date),
            month = ("0" + (changeDate.getMonth() + 1)).slice(-2),
            day = ("0" + changeDate.getDate()).slice(-2);
          return [changeDate.getFullYear(), month, day].join("-");
        }
        
        // console.log(changeDateFormat(eachDay))
        let weekDays = changeDateFormat(eachDay)
        // console.log(weekDays)
        let cell = document.createElement('td');
        // cell.id = 'd' + weekDays
        idName = 'd'+ weekDays
        console.log(idName)
        cell.setAttribute('id', idName);
        cell.innerText = weekDays.split('-')[2]
        // console.log(weekDays.split('-')[2])

        // console.log(eachDay)
        // c = eachDay.split(' ')[1]
        // console.log(c)
        // document.getElementById('tab').innerHTML = cell
        row.append(cell)
      }
      // document.getElementById('tab').append(row)
      // console.log(row)
      document.getElementById('tab').append(row)
    }
    
    // document.getElementById("tab").append(row)
    // document.getElementById("tab").innerHTML = dayName;
    

    // document.getElementById("calendar").innerHTML = monthHTML;
    for (let td of document.querySelectorAll("td")) {
      let daynum = td.innerText;
      td.innerHTML = `<div class=box><div class=daynum>${daynum}</div></div>`;
    }

    fetch("https://tw.igs.farm/lionking/all.json")
    .then((r) => r.json())
    .then((r) => {
      let performances = r.data.getShow.show.performances;
      
  
      for (let p of performances) {
        let pd = p.dates.performanceDate;
        let cellId = "d" + pd.split("T")[0];
        let cell = document.getElementById(cellId);
        if (cell !== null) {
          let performanceDiv = document.createElement("div");
          performanceDiv.setAttribute('id', 'maindiv');
          performanceDiv.classList.add(p.performanceTimeDescription);
          let line1 = document.createElement("div");
          line1.setAttribute('id', 'firstdiv');
          line1.innerHTML = `<div class='dot ${p.availabilityStatus}'></div> ${pd.substr(11, 5)}`;
          let line2 = document.createElement("div");
          line2.setAttribute('id', 'secdiv');
          line2.classList.add("price");
          line2.innerHTML = `from £${p.price.minPrice + p.price.minPriceFee}`;
          performanceDiv.append(line1, line2);
          
          performanceDiv.onclick = () => {
            document.getElementById("tab").classList.add("hide");
            
            console.log("I should be getting data for: ", p.id);
            fetch(
              `https://tw.igs.farm/lionking/${p.id}`
            )
              .then((r) => r.json())
              .then((r) => {
                for (let s of r.seats) {
                  let d = document.createElement("div");
                  d.classList.add("seat");
                  d.classList.add("Z" + s.zone);
                  d.style.left = s.x / 2 + 500 + "px";
                  d.style.top = s.y / 2 + 200 + "px";
                  if (s.available) {
                    d.classList.add("available");
                  }
                  document.getElementById("seats").append(d);
                }
              });
          };
          cell.querySelector(".box").append(performanceDiv);
          
          // document.getElementById('box').append(performanceDiv);
  
  
        }
      }
    });
  })


 

