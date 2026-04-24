/////////////////////////////////////////adding event listener////////////////////////////////

const tablesButton= document.querySelector('#tableBtn')
const standingsForm = document.querySelector('#standingsForm')

standingsForm.addEventListener('submit', async(e)=>{
    e.preventDefault()

////////////////////////////Display tableStandings function///////////////////////////////////////
    
    const searchInput = document.getElementById('tableInput').value.trim().toUpperCase()
    const tablesDisplay= document.querySelector('#table')
    if (!searchInput) {
  tablesDisplay.innerHTML = "Please enter a league code.";
  return;
}

    console.log("----", searchInput)
    try{
          const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/${searchInput}/standings`,
      {
        headers: {
          'X-Auth-Token': "a79ef265e53a4924a21f8ef439129dac",
        },})


        if(!response.ok){throw new Error("Failed to get standings")}

        const data = await response.json()
        console.log("===", data)

        const standings = data.standings[0].table

         console.log(standings)

        tablesDisplay.innerHTML =

    `<table>
        <thead>
            <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Pts</th>
             </tr>
         </thead>
     <tbody> 
                ${standings.map((team) => `<tr>
    <td>${team.position}</td>
    <td>${team.team.name}</td>
    <td>${team.points}</td>
    </tr>`).join('')}
    </tbody>
    </table>`

  

     } 

    catch(error){
        const errEl = document.querySelector('#standingsError')
  errEl.textContent = error.message
  errEl.className = 'msg error'
    }})



// // // ///////////////////////////////////display fixtures///////////////////////////////////////////
const fixturesBtn= document.querySelector('#fixturesBtn')
const fixturesForm = document.querySelector('#fixturesForm')
// //////////////////////////////////////////adding event listener//////////////////////////////////
fixturesForm.addEventListener('submit', fixturesDisplay)

// //////////////////////////////////////fixtures function////////////////////////////////////

async function fixturesDisplay(e){
    e.preventDefault()
    
    
const fixtureDisplay = document.querySelector('#displayFixtures')
const fixtureInput = document.querySelector('#fixtures').value.trim().toUpperCase()
if (!fixtureInput) {
  fixtureDisplay.innerHTML = "Please enter a league code.";
  return;
}


try{

 const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/${fixtureInput}/matches`,

      {
        headers: {
          'X-Auth-Token': "a79ef265e53a4924a21f8ef439129dac",
          'X-Unfold-Goals':"true"
        },})


if(!response.ok) {throw new Error("Failed to get Fixtures")}
const data= await response.json()
console.log(data)
const matches= data.matches

fixtureDisplay.innerHTML= `
<table>
      <thead>
         <tr>
           <th>Date</th>
           <th>Home</th>
           <th>Away</th>
           <th>Status</th>
           <th>Full-Time</th>
        </tr>
     </thead>
     <tbody>
     ${matches.map(match=>`
        <tr>
           <td>${new Date(match.utcDate).toLocaleDateString('en-GB' ,{day:'2-digit', month:'short'})}</td>
           <td>${match.homeTeam.name}</td>
           <td>${match.awayTeam.name}</td>
           <td>${match.status}</td>
           <td>${match.score.fullTime.home}-${match.score.fullTime.away}
        
        
        </tr>
        `).join('')}
     </tbody>


</table>`



    }

catch(error){
    const errEl = document.querySelector('#fixturesError')
  errEl.textContent = error.message
  errEl.className = 'msg error'
}



}


// //////////////////////////////////////////Display stats//////////////////////////////////
const statsForm= document.querySelector('#statsForm')
const statsBtn = document.querySelector('#statsBtn')
statsForm.addEventListener('submit', displayStats)

async function displayStats(e) {
    e.preventDefault()
const statsInput = document.querySelector('#stats').value.trim('').toUpperCase('')
    const statsDisplay= document.querySelector('#displayStats')

    if (!statsInput) {
  statsDisplay.innerHTML = "Please enter a league code.";
  return;
}

    try{
          const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.football-data.org/v4/competitions/${statsInput}/scorers`,
      {
        headers: {
          'X-Auth-Token': "a79ef265e53a4924a21f8ef439129dac",
        },})

        if(!response.ok){
    throw new Error("Failed to get Stats")
}
        const data= await response.json()
        console.log(data)
        const scorers= data.scorers||[0]
        statsDisplay.innerHTML=`

         <table>
           <thead>
            <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Team</th>
                <th>Goal</th>
            </tr>


        </thead>
        <tbody>

            ${scorers.map((scorer,index) =>`
            <tr>
            <td>${index + 1}</td>
            <td> ${scorer.player.name}</td>
            <td> ${scorer.team.name}</td>
            <td> ${scorer.goals}</td>
            </tr>
            `).join('')}
        </tbody>



         </table>
    `

    }
    catch(e){
        const errEl = document.querySelector('#statsError')
  errEl.textContent = e.message
  errEl.className = 'msg error'

    }

}