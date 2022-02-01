//Create a table to show every day in Feb
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
document.getElementById('calendar').innerHTML = monthHTML;

fetch('https://tw.igs.farm/lionking/all.json')
  .then(r=>r.json())
  .then(r=>{
      let performances = r.data.getShow.show.performances;
      for(let p of performances){
          let pd = p.dates.performanceDate;
          let cellId = "d"+pd.split("T")[0];
          let cell = document.getElementById(cellId);
          if (cell !== null){
              let performanceDiv = document.createElement('div');
              performanceDiv.classList.add(p.performanceTimeDescription);
              let line1 = document.createElement('div');
              line1.innerHTML = `<div class='dot ${p.availabilityStatus}'></div> ${pd.substr(11,5)}`;
              let line2 = document.createElement('div');
              line2.innerHTML = 'tbc';
              performanceDiv.append(line1,line2);
              cell.append(performanceDiv);
          }
      }
  })
