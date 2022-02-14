function calendar(date){
  let inputDate = new Date(date);
    let allweek = []
    if(inputDate.getMonth()== 4){
        inputDate.setDate(1);
        startDay = new Date(inputDate.getTime() - 1000*60*60*24* (inputDate.getDay()+6));
        let n = startDay.getTime();
        for (let weeks = 0; weeks<6; weeks ++){
            weeksquad = []
            for (let week = 0; week<7; week ++){
                let dateCalculate = new Date(n + 1000*60*60*24*(week+(weeks*7)));
                let result = dateCalculate.toISOString('en',{day:'2-digit',month:'short',weekday:'short'});
                const splitDate = result.split('T');
                weeksquad.push(splitDate[0])
            }
        allweek.push(weeksquad)
        }
        console.log(allweek)
    }
    else{
        inputDate.setDate(1);
        startDay = new Date(inputDate.getTime() - 1000*60*60*24* (inputDate.getDay()-1));
        let n = startDay.getTime();
        for (let weeks = 0; weeks<6; weeks ++){
            weeksquad = []
            for (let week = 0; week<7; week ++){
                let dateCalculate = new Date(n + 1000*60*60*24*(week+(weeks*7)));
                let result = dateCalculate.toISOString('en',{day:'2-digit',month:'short',weekday:'short'});
                const splitDate = result.split('T');
                weeksquad.push(splitDate[0])
            }
        allweek.push(weeksquad)
        }
        console.log(allweek)
    }
  
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
  for (let week of allweek){
      console.log(week)
      let row = document.createElement('tr');
      // console.log(week)
      
    for (let eachDay of week){

      // function changeDateFormat(date) {
      //   let changeDate = new Date(date),
      //     month = ("0" + (changeDate.getMonth() + 1)).slice(-2),
      //     day = ("0" + changeDate.getDate()).slice(-2);
      //     return [changeDate.getFullYear(), month, day].join("-");
      //   }
        
      // let weekDays = changeDateFormat(eachDay)

      let cell = document.createElement('td');
      let idName = 'd'+ eachDay
      console.log(idName)
      cell.setAttribute('id', idName);
      cell.innerText = eachDay.split('-')[2]
        
      row.append(cell)
      }
      document.getElementById('tab').append(row)
    }
    
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
  

}
let dateTime = new Date();
let realDateTime = dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+'1';
// console.log('date is '+ realDateTime)
calendar(dateInput)
 

