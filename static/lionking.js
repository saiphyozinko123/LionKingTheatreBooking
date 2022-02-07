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
yearmonth = '2022-01'

fetch(`/lionking/${yearmonth}`)
  .then(r => r.json())
  .then(r => {
    console.log(r.days)
  // console.log(r.dates)
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
  for (let d in r.days){
    console.log(d)
  }
  document.getElementById("tab").innerHTML = dayName;
  })



// document.getElementById("calendar").innerHTML = monthHTML;
for (let td of document.querySelectorAll("td")) {
  let daynum = td.innerText;
  td.innerHTML = `<div class=box><div class=daynum>${daynum}</div><div id=availabilty></div></div>`;
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
        performanceDiv.classList.add(p.performanceTimeDescription);
        let line1 = document.createElement("div");
        line1.innerHTML = `<div class='dot ${
          p.availabilityStatus
        }'></div> ${pd.substr(11, 5)}`;
        let line2 = document.createElement("div");
        line2.classList.add("price");
        line2.innerHTML = `from £${p.price.minPrice}`;
        performanceDiv.append(line1, line2);
        performanceDiv.onclick = () => {
          document.getElementById("calendar").classList.add("hide");
          console.log("I should be getting data for: ", p.id);
          fetch(
            "https://tw.igs.farm/lionking/692A2B01-A607-4616-9409-9696D905340D"
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
      }
    }
  });
