//Api
const tablesApi = "https://api.football-data.org/v4/competitions/PL/standings";
// const fixturesApi= ""
// const statsApi=""

const apiKey= "b6f8f72738dd4e7789c10e7580e01337"
/////////////////////////////////////////adding event listener////////////////////////////////

const tablesButton= document.querySelector('#tableBtn')
const tableDisplay= document.querySelector('#table')


////////////////////////////Display tableStandings function///////////////////////////////////////

async function displayTables(){

    const tablesDisplay= document.querySelector('#tableStandings')

    if(!tablesDisplay) return;

    try{

    const response= await fetch(tablesApi,
        {
            headers: {'X-Auth-Token': apiKey}
        }
    )
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

displayTables()

// /////////////////////////////////////////display fixtures///////////////////////////////////////////

// async function fixturesDisplay(){
// const fixturesDisplay = document.querySelector('#fixturesShow')

// if(!fixturesDisplay) return;//checking if the id exixts

// try{

// const response= await fetch(fixturesApi) //fetching
// const data= await response.json()
// console.log(data)

// }

// catch(error){
//     console.log(error)
// }

// fixturesDisplay.innerHTML=


// }

// fixturesDisplay() //calling teh fixtureDisplay function

// //////////////////////////////////////////Display stats//////////////////////////////////

// async function displayStats() {

//     const statsDisplay= document.querySelector('#statsShow')

//     if(!statsDisplay) return

//     try{
//         const response= await fetch(statsApi)
//         const data= await response.json()
//         console.log(data)

//     }
//     catch(error){
//         console.log(error)
//     }

//     statsDisplay.innerHTML=
// }

