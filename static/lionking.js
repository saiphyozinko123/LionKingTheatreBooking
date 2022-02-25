document.getElementById("seatrow").classList.add("hide");
function calendar(date){
  
  let inputDate = new Date(date);
  let monthName = inputDate.toLocaleString('default', { month: 'long' })
  document.getElementById('mthName').append(monthName)
  console.log('inputDate'+monthName)
    let allweek = []
    if(inputDate.getMonth()== 4){
        inputDate.setDate(1);
        startDay = new Date(inputDate.getTime() - 1000*60*60*24* (inputDate.getDay()+5));
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

    let tdyDate = new Date();
    for (let td of document.querySelectorAll("td")) {
      let dayofBox = new Date(td.id.substring(1));
      let dateAfter = new Date(dayofBox.getTime()+1000*60*60*24);
      let daynum = td.innerText;
      let lastDay = new Date(inputDate.getFullYear(), inputDate.getMonth()+1, 0);
      let xb = lastDay.getDate()+2
      lastDay.setDate(xb)
      let last = lastDay
      let pastDay = ' ';
        if (dateAfter<=tdyDate){
          pastDay = 'pastover'
        }if(last<=dateAfter){
          pastDay = 'last'
        }
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
            document.getElementById("calendar").classList.add("hide");
            document.getElementById("seatrow").classList.remove("hide")
            document.getElementById("butdiv").classList.add("hide")
            document.getElementById("status").classList.add("hide")
            document.getElementById("bdsection").classList.add("bdsectiontwo")
           
            let performanceTime = new Date(p.dates.performanceDate)
            document.getElementById('performanceTime').append(performanceTime.toLocaleString())
            
            console.log("I should be getting data for: ", p.id);
            fetch(
              `https://tw.igs.farm/lionking/${p.id}`
            )
              .then((r) => r.json())
              .then((r) => {
                
               
                let totPrice = 0;
                
                for (let s of r.seats) {
                  let d = document.createElement("div");
                  d.classList.add("seat");
                  d.classList.add("Z" + s.zone);
                  d.style.left = s.x / 2.5 + 500 + "px";
                  d.style.top = s.y / 2.5 + 250 + "px";
                  
                  if (s.available) {
                    d.classList.add("available");
                  }else{
                    d.classList.add("unavailable");
                  }
                  d.onclick=()=>{
                    let myOffcanvas = document.getElementById('offcanvasRight')
                    let bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
                    bsOffcanvas.show()
                    let priceTotal = r.zones[s.zone].tickets[r.zones[s.zone].defaultTicket].total;
                    let row = `
                    <td id="labelName">${s.label}</td>
                    <td id="state">${p.performanceTimeDescription}</td>
                    <td id="fullprice">€${priceTotal}</td>`
                    document.getElementById('trRow').innerHTML = row;
                    
                  
                  
                  document.getElementById('confimrbtn').onclick=()=>{
                    let priceTotal = r.zones[s.zone].tickets[r.zones[s.zone].defaultTicket].total;
                    let tr = document.createElement('tr')
                    tr.classList.add("table-info");
                    let tdOne = document.createElement('td')
                    let tdTwo = document.createElement('td')
                    let tdThree = document.createElement('td')
                    tdOne.append('Full Price');
                    tdOne.classList.add("fullPrice");
                    tdTwo.append(s.label);
                    tdThree.append('€'+ priceTotal);
                    tr.append(tdOne);
                    tr.append(tdTwo);
                    tr.append(tdThree);

                    document.getElementById('tableComfirmData').append(tr)
                    totPrice += parseInt(priceTotal);

                    document.getElementById('totalPrice').innerText = '€ '+ totPrice;
                   

                  console.log('price'+totPrice)
                  }

                }
                  document.getElementById("seats").append(d);
                  
              
            }
            for(let h of Object.values(r.labels)){
              let n = document.createElement('div');
              n.classList.add('name')
              n.style.left = h.x / 2.4 + 500 + "px";
              n.style.top = h.y / 2.5 + 246 + "px";
              n.innerText = h.content
              document.getElementById("seats").append(n);
            }

              });
          };
          cell.querySelector(".box").append(performanceDiv);
          
  
        }
      }
    });

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


