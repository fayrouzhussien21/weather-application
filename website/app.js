
let server="http://localhost:8000";//server url
// Personal API Key for OpenWeatherMap API
const apikey=",&appid=33a33f0c2a7c18189c4425cf4d08bdda&units=metric";//
const apiurl="https://api.openweathermap.org/data/2.5/weather?zip=";
let date= new Date();// make an instance from date
let newd=date.toDateString();
//catching errors or invalid zip code
const err=document.getElementById("error");
// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);
/* Function called by event listener */
function performAction(){
const zip_code =  document.getElementById('zip').value;
/* Function to GET Project Data */
getcurrentweather(zip_code).then(function(data){
  const feelings =  document.getElementById('feelings').value;
   if(data)//if there are a data then extract the needed information fron the api information.
   {
     const {
       main:{temp},
       name:country,
       weather:[{description}]
      }=data;
     const Recent_entry={newd,temp,country,description,feelings};
     console.log(Recent_entry);
     postdata(server+'/add', Recent_entry );
     updateUI();
   }

  })

}
/* Function to GET Web API Data*/
const getcurrentweather = async (zip_code)=>{

  const res = await fetch(apiurl+zip_code+apikey)
  try {

    const data = await res.json();
    
    if(data.cod!=200)//if the input doesnt match any zip code return error message
    {
      err.innerHTML=data.message;
      setTimeout(()=>{err.innerHTML=" ";},3000)//hide the error message after 3 sec
    }
    console.log(data)
    return data;
  }  
  catch(error) {
    console.log("error");
    // appropriately handle the error
  }
}

  

  
/* Function to POST data */
const postdata= async(url=" ",entryy={})=>
{
  const res = await fetch(url,{
    method: 'POST',
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(entryy),
  });
  try {
    const newData = await res.json();
    
    return newData
  }
  catch(error) {
  console.log("error", error);

  }
}
/*Updating ui*/
const updateUI = async () => {
  const request = await fetch(server+'/all');
  try{
    const allData = await request.json();
    document.getElementById('temp').innerHTML = Math.round(allData.temp)+"&degC";
    document.getElementById('weather').innerHTML = allData.description;
    document.getElementById('content').innerHTML = allData.feelings;
    document.getElementById('date').innerHTML = allData.newd;
    document.getElementById('city').innerHTML = allData.country;

  }catch(error){
    console.log("error", error);
  }
}

  