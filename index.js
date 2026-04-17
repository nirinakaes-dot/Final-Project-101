/////////////////////////////////////////adding event listener////////////////////////////////

const tablesButton= document.querySelector('#tableBtn')


tablesButton.addEventListener('click', async()=>{

////////////////////////////Display tableStandings function///////////////////////////////////////
    
    const searchInput = document.getElementById('tableInput').value.trim().toUpperCase()
    const tablesDisplay= document.querySelector('#table')

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

    catch(e){
        console.log(e)
    }})



// // // ///////////////////////////////////display fixtures///////////////////////////////////////////
const fixturesBtn= document.querySelector('#fixturesBtn')

// //////////////////////////////////////////adding event listener//////////////////////////////////
fixturesBtn.addEventListener('click', fixturesDisplay)

// //////////////////////////////////////fixtures function////////////////////////////////////

async function fixturesDisplay(){
const fixtureDisplay = document.querySelector('#displayFixtures')
const fixtureInput = document.querySelector('#fixtures').value.trim('').toUpperCase('')


try{

 const response = await fetch(
      `https://cors-anywhere.herokuapp.com/http://api.football-data.org/v4/competitions/2003/matches?matchday=1 
      -H "X-Unfold-Goals: true""`,
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
        </tr>
     </thead>
     <tbody>
     ${matches.map(match=>`
        <tr>
           <td>${new Date(match.utcDate)}</td>
           <td>${match.homeTeam.name}</td>
           <td>${match.awayTeam.name}</td>
           <td>${match.status}</td>
        
        </tr>
        `).join('')}
     </tbody>


</table>`



    }

catch(error){
    console.log(error)
}



}


// //////////////////////////////////////////Display stats//////////////////////////////////

const statsBtn = document.querySelector('#statsBtn')
statsBtn.addEventListener('click', displayStats)

async function displayStats() {
const statsInput = document.querySelector('#stats').value.trim('').toUpperCase('')
    const statsDisplay= document.querySelector('#displayStats')

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
    catch(error){
        console.log(error)

    }

    


}

