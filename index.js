//Api
const proxy = "https://corsproxy.io/?"

const apiKey= "b6f8f72738dd4e7789c10e7580e01337"

/////////////////////////////////////////adding event listener////////////////////////////////

const tablesButton= document.querySelector('#tableBtn')


tablesButton.addEventListener('click', displayTables)

////////////////////////////Display tableStandings function///////////////////////////////////////

async function displayTables(){

    const tablesDisplay= document.querySelector('#table')
    const searchInput = document.querySelector('#tables').value.trim().toUpperCase()

    if(!tablesDisplay) return;

    try{

    const response= await fetch(`${proxy}https://api.football-data.org/v4//${searchInput}/standings`,
        {
            headers: {'X-Auth-Token': apiKey}
        }
    )
    if(!response.ok){throw new Error("Failed to get standings")}

    const data= await response.json()
    console.log(data)

    const standings= data.standings[0].table;
    console.log(standings)

     tablesDisplay.innerHTML=

    `<table>
        <thead>
            <tr>
                <th>Pos</th>
                <th>Team</th>
                <th>Pts</th>
             </tr>
         </thead>
     <tbody> 

    
   ${ standings.map(team=>`<tr>
    <td>${team.position}</td>
    <td>${team.team.name}</td>
    <td>${team.points}</td>
    </tr>`).join('')}
    </tbody>
    </table>`



}

    catch(error){
        console.log(error)
    }


   

}


// // /////////////////////////////////////////display fixtures///////////////////////////////////////////
// const fixturesBtn= document.querySelector('#fixturesBtn')

// //////////////////////////////////////////adding event listener//////////////////////////////////
// fixturesBtn.addEventListener('click', fixturesDisplay)

// //////////////////////////////////////fixtures function////////////////////////////////////

// async function fixturesDisplay(){
// const fixtureDisplay = document.querySelector('#displayFixtures')
// const fixtureInput = document.querySelector('#fixtures').value.trim('').toUpperCase('')

// if(!fixtureDisplay) return;//checking if the id exixts

// try{

// const response= await fetch(`${proxy}https://api.football-data.org/v4//${fixtureInput}/`
//     { headers:{'X-Auth-Token': apiKey }}


// ) 
// if(response.ok) {throw new Error("Failed to get Fixtures")}
// const data= await response.json()
// console.log(data)

// // fixturesDisplay.innerHTML=


// }

// catch(error){
//     console.log(error)
// }



// }


// //////////////////////////////////////////Display stats//////////////////////////////////

const statsBtn = document.querySelector('#statsBtn')
statsBtn.addEventListener('click' displayStats)

async function displayStats() {
const statsInput = document.querySelector('#stats').value.trim('').toUpperCase('')
    const statsDisplay= document.querySelector('#diaplayStats')

    if(!statsDisplay) return

    try{
        const response= await fetch(`${proxy} ${statsInput}`,
            {headers: {"X-Auth-Token":apiKey}
            }
        )
if(!response.ok){
    throw new Error("Failed to get Stats")
}
        const data= await response.json()
        console.log(data)

    }
    catch(error){
        console.log(error)
    }

}

