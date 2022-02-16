// let result
// let m = 0;
// let input = new Date(dateInput)
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
                result = dateCalculate.toISOString('en',{day:'2-digit',month:'short',weekday:'short'});
                const splitDate = result.split('T');
                weeksquad.push(splitDate[0])
            }
        allweek.push(weeksquad)
        }
    }
    else{
        inputDate.setDate(1);
        startDay = new Date(inputDate.getTime() - 1000*60*60*24* (inputDate.getDay()-1));
        let n = startDay.getTime();
        for (let weeks = 0; weeks<6; weeks ++){
            weeksquad = []
            for (let week = 0; week<7; week ++){
                let dateCalculate = new Date(n + 1000*60*60*24*(week+(weeks*7)));
                result = dateCalculate.toISOString('en',{day:'2-digit',month:'short',weekday:'short'});
                const splitDate = result.split('T');
                weeksquad.push(splitDate[0])
            }
        allweek.push(weeksquad)
        }
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
      
    for (let eachDay of week){


      let cell = document.createElement('td');
      let idName = 'd'+ eachDay
      cell.setAttribute('id', idName);
      cell.innerText = eachDay.split('-')[2]
        
      row.append(cell)
      }
      document.getElementById('tab').append(row)
    }

    
    // console.log('today date is'+tdyDate)
    // for(let cell of document.querySelectorAll('td')){
    //     let dayofBox = new Date(cell.id.substring(1));
    //     let dateAfter = new Date(dayofBox.getTime()+1000*60*60*24);
    //     let pastDay = ' ';
    //     if (dateAfter<=tdyDate){
    //       pastDay = 'pastover'
    //     };
    // }

    let tdyDate = new Date();
    for (let td of document.querySelectorAll("td")) {
      let dayofBox = new Date(td.id.substring(1));
      let dateAfter = new Date(dayofBox.getTime()+1000*60*60*24);
      let daynum = td.innerText;
      let pastDay = ' ';
      console.log('past day'+ pastDay)
        if (dateAfter<=tdyDate){
          pastDay = 'pastover'
        };
      td.innerHTML = `<div class='box ${pastDay}'><div class=daynum>${daynum}</div></div>`;
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
          if (cell.firstElementChild.classList.contains('pastover')){
            performanceDiv.innerText = "Not Available"
            performanceDiv.setAttribute('id', 'available');
            // alert('not available');
            // return;
          }

          
          performanceDiv.onclick = () => {
            if (cell.firstElementChild.classList.contains('pastover')){
              return;
            }
            // document.getElementById("tab").classList.add("hide");
            // document.getElementById("lion").classList.add("hide");
            document.getElementById("calendar").classList.add("hide");
            
            console.log("I should be getting data for: ", p.id);
            fetch(
              `https://tw.igs.farm/lionking/${p.id}`
            )
              .then((r) => r.json())
              .then((r) => {
                let thelist = []
                let total = 0;
                for (let s of r.seats) {
                  let d = document.createElement("div");
                  
                  
                  d.onclick=()=>{
                    console.log(s.available)
                    let price = parseInt(p.price.minPrice + p.price.minPriceFee)
                    thelist.push({
                      eachPrice: price,
                      seatLabel: s.label,
                      dateTime: p.dates.performanceDate,
                      ticketPrice: p.price.minPrice,
                      fee: p.price.minPriceFee

                    })
                    // console.log('list is'+thelist)
                    for (let li of thelist){
                      console.log('price is'+li['eachPrice'])
                     
                      
                    }
                    console.log(total)

                    // console.log(p.price.minPrice + p.price.minPriceFee)
                    // console.log(s.id)
                    // console.log(p.availabilityStatus)
                    // console.log(s.zone)
                    
                
                  }
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
  

}
// let dateTime = new Date();
// let realDateTime = dateTime.getFullYear()+'-'+(dateTime.getMonth()+1)+'-'+'1';
// console.log('date is '+ realDateTime)
calendar(dateInput)
console.log(dateInput)
 


// document.getElementById('prev').onclick=()=>{

  
  
//   console.log('month is'+input.getMonth())
//   m = input.getMonth()
//   m++
//   input.setMonth(m)
//   calendar(input)
//   console.log('new month'+m)
  
// }

