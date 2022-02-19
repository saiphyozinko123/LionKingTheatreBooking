let dateOfFirst = window.location.pathname.split("/")[2];
let months = ["Jan","Feb","Mar","Apr","May"];
let monthName = months[new Date(dateOfFirst).getMonth()];
function calendar(date){
  
  let inputDate = new Date(date);
  let monthName = inputDate.toLocaleString('default', { month: 'long' })
  document.getElementById('mthName').append(monthName)
  console.log('inputDate'+monthName)
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
      // alert(dateAfter)
      // console.log('dateaft'+dateAfter)
      let daynum = td.innerText;
      let lastDay = new Date(inputDate.getFullYear(), inputDate.getMonth()+1, 0);
      let xb = lastDay.getDate()+2
      lastDay.setDate(xb)
      let last = lastDay
      // console.log(last)
      // console.log('lastDay is'+ lastDay.toISOString('en',{day:'2-digit',month:'short',weekday:'short'}))
      let pastDay = ' ';
        if (dateAfter<=tdyDate){
          pastDay = 'pastover'
        }if(last<=dateAfter){
          pastDay = 'last'
        }
        // if (tdyMonth === dateAfter){
        //   pastDay = 'pastover'
        // }
        // if(dateAfter==afterMonth){
        //   pastDay = 'pastover'
        // }
      td.innerHTML = `<div class='box ${pastDay}'><div class=daynum>${daynum}</div></div>`;
    }

    fetch(`https://tw.igs.farm/lionking/all.json`)
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
          }


          
          performanceDiv.onclick = () => {
            if (cell.firstElementChild.classList.contains('pastover')){
              return;
            }
            if(cell.firstElementChild.classList.contains('last')){
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
                // for (let i of Object.values(r)){
                //   console.log(i)
                // }
                // for(let h of r.zones){

                // }
                // for(let y of r.seats){
                //   console.log(y.zone)
                //   // console.log(r.zones[y.zone].tickets[r.zones[y.zone].defaultTicket].total)
                // }
                
                for (let s of r.seats) {
                  // for(let h of Object.values(r.zones)){
                  //   if(h.id == s.zone){
                  //     alert('id are the same')
                  //   }
                  // }

                

                  // for (let [name, value] of Object.entries(r.zones)) {
                  //   console.log(name)
                  //   console.log(value)
                  // }
                  // for (let h of r.zones){
                  //   console.log(h)
                  // }
                  
                  // console.log('h is'+h.id)
                  // console.log('s is'+s.id)
                  

                  
                  let d = document.createElement("div");
                  
                  // for(let h of Object.values(r.zones)){
                    
                  
                  d.classList.add("seat");
                  
                  d.classList.add("Z" + s.zone);
                  d.style.left = s.x / 2.5 + 500 + "px";
                  d.style.top = s.y / 2.5 + 200 + "px";
                  // for(i = 0;i<117;i++){
                  //   let h = r.labels[`UYdv4OOeQCe/eq5R7cDGLQ/${i}`];
                  //   console.log(h.x)
                  // }
                  for(let h of Object.values(r.labels)){
                    let n = document.createElement('div');
                    n.classList.add('name')
                    n.style.left = h.x / 2.4 + 500 + "px";
                    n.style.top = h.y / 2.5 + 196 + "px";
                    n.innerText = h.content
                    document.getElementById("seats").append(n);
                  }
                  // for(let h of r.labels){
                  //   console.log
                  // }
                  if (s.available) {
                    // console.log(s.zone)
                    d.classList.add("available");
                  }else{
                    d.classList.add("unavailable");
                  }
                  d.onclick=()=>{
                    
                    // alert(h.tickets[h.defaultTicket].total)
                    // let price = parseInt(p.price.minPrice + p.price.minPriceFee)
                    // thelist.push({
                    //   eachPrice: price,
                    //   seatLabel: s.label,
                    //   dateTime: p.dates.performanceDate,
                    //   ticketPrice: p.price.minPrice,
                    //   fee: p.price.minPriceFee

                    // })
                    // // console.log('list is'+thelist)
                    // for (let li of thelist){
                    //   console.log('price is'+li['eachPrice'])
                      
                    // }
                    alert('ticket is'+r.zones[s.zone].defaultTicket)
                    // alert(r.zones[s.zone].tickets[r.zones[s.zone].defaultTicket].total)
                    
                  }
                  document.getElementById("seats").append(d);
                  
              
            }

              });
          };
          cell.querySelector(".box").append(performanceDiv);
          
  
  
        }
      }
    });
    // let m = 0;

    // let dateData = ['2022']
    // let x = 0
    // let sub = 1;
    let dateMonth = inputDate.getMonth()+1;
    let y = inputDate.getFullYear();

    if(dateMonth == 1){
      document.getElementById("prev").classList.add("nexmonth");
    }else if(dateMonth == 12){
      document.getElementById("next").classList.add("nexmonth");
      
    }

    document.getElementById('next').onclick=()=>{
      dateMonth++
      location.href = `http://localhost:5000/lionking/${y}-${dateMonth}-01`;
    }
    
    document.getElementById('prev').onclick=()=>{
      dateMonth--
      location.href = `http://localhost:5000/lionking/${y}-${dateMonth}-01`;
    }
    
   
}

calendar(dateInput);


