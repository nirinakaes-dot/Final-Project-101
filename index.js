//Api
const tablesApi = "https://api-football-standings.azharimm.site/leagues/eng.1/standings?season=2020&sort=asc";
const fixturesApi= ""
const statsApi=""

////////////////////////////Display tableStandings function///////////////////////////////////////

async function displayTables(){

    const tablesDisplay= document.querySelector('#tableStandings')

    if(!tablesDisplay) return;

    try{

    const response= await fetch(tablesApi)
    const data= await response.json()
    console.log(data)
}

    catch(error){
        console.log(error)
    }



}

displayTables()

/////////////////////////////////////////display fixtures///////////////////////////////////////////

async function fixturesDisplay(){
const fixturesDisplay = document.querySelector('#fixturesShow')

if(!fixturesDisplay) return;//checking if the id exixts

try{

const response= await fetch(fixturesApi) //fetching
const data= await response.json()
console.log(data)

}

catch(error){
    console.log(error)
}

fixturesDisplay.innerHTML=


}

fixturesDisplay() //calling teh fixtureDisplay function

//////////////////////////////////////////Display stats//////////////////////////////////

async function displayStats() {

    const statsDisplay= document.querySelector('#statsShow')

    if(!statsDisplay) return

    try{
        const response= await fetch(statsApi)
        const data= await response.json()
        console.log(data)

    }
    catch(error){
        console.log(error)
    }

    statsDisplay.innerHTML=
}