//Constructor de la lista de perros.
class doglistBuilder {
    constructor(id,name,image,description,breed,age,color,size,gender,personality){
        this.id=id;
        this.name=name;
        this.image=image;
        this.description=description;
        this.breed=breed;
        this.age=age;
        this.color=color;
        this.size=size;
        this.gender=gender;
        this.personality=personality;
    }
};
//Declaracion lista de perros
const dogList=[];
dogList.push(new doglistBuilder("1","Jay","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Huskysiberiano","2","White","Big","Male","Sociable"));
dogList.push(new doglistBuilder("2","Nunu","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Goldenretriever","1","Beige","Male","Medium","Sociable"));
dogList.push(new doglistBuilder("3","Ginger","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Caniche","0","Beige","Small","Female","Playful"));
dogList.push(new doglistBuilder("4","Marley","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Germansheperd","0","Brown","Small","Male","Fearless"));
dogList.push(new doglistBuilder("5","Bella","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Yorkshireterrier","1","White","Small","Female","Timid"));
dogList.push(new doglistBuilder("6","Luna","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Dalmatian","1","White","Medium","Female","Sociable"));
dogList.push(new doglistBuilder("7","Charlie","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Boxer","3","Brown","Big","Male","Playful"));
dogList.push(new doglistBuilder("8","Cooper","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Chihuahua","1","Black","Small","Male","Fearless"));
dogList.push(new doglistBuilder("9","Milo","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","EnglishBulldog","1","White","Medium","Male","Timid"));
dogList.push(new doglistBuilder("10","Max","./img/Sitting-Dog-Silhouette-Shepherd-Dog-Graphics-35367704-1.png","Description of the dog","Beagle","0","Brown","Small","Male","Curious"));
let checkStorageList=localStorage.getItem("dogList");
function filtering(filter){
    let found=null;
    let dogListFiltered=[];
    let dogListK=[];
    dogListK=localStorage.getItem("dogList");
    dogList2=JSON.parse(dogListK);
    dogList2.forEach(item=>{
        for(let i=0;i<Object.keys(item).length;i++){
            if(Object.values(item)[i].toLowerCase()===filter){
                    found=i;

            }
        }
    })
        if(found!=null){
            dogListFiltered=dogList2.filter(item=> Object.values(item)[found].toLowerCase() === filter)
        }
  return dogListFiltered;
  }
function dogRequest(doglistFiltered,dogselectedId){
    let dogSelectedFind= doglistFiltered.find((item) => item.id === dogselectedId);
    return dogSelectedFind;
};
let contenedor = document.getElementById("refugeeContainer");
let contador=0;
let adminConsole = document.getElementById("console");
let filterSearch = document.getElementById("searchEngine");
let contador2=0;
const renderizado = (dogListX) => {
  contenedor.innerHTML = "";
    let contador=0;
    let lengthDogList=dogListX.length;
    let rowQuantity= Math.ceil(lengthDogList/4);
    let dogListDivided=[];
    for(let i=1;i<=rowQuantity;i++){
        dogListDivided=dogListX.slice(contador,4+contador);
        let divy=document.createElement("div");
        divy.className="row lineDogs";
        contenedor.append(divy);
        contador+=4;
        let contenedor2 = document.getElementsByClassName("row lineDogs");
        contenedor2[i-1].innerHTML = "";
        dogListDivided.forEach(item => {
            let divx=document.createElement("div"); 
            divx.className="card col-2";
            divx.innerHTML=`<img src="${item.image}" class="card-img-top" alt="dogsilouette"><div class="card-body"><h5 class="card-title nameDog">${item.name}</h5><p class="card-text descriptionDog">${item.description}</p></div><ul class="list-group list-group-flush"><li class="list-group-item breedDog">${item.breed}</li><li class="list-group-item colorDog">${item.color}</li><li class="list-group-item genreDog">${item.gender}</li></ul><div class="card-body"><button id="botonA${item.id}" class="btn adoptButton" type="button">Adopt</button><button id="botonB${item.id}" class="btn sponsorButton" type="button">Sponsor</button></div>
            `;
            contenedor2[i-1].append(divx);
        });
    }
    refreshButtons(dogListX);
};
adminConsole.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputs = e.target.children;
  let name= inputs[1].value;
  let image= inputs[5].value;
  let description= inputs[3].value;
  let breed= inputs[7].value;
  let age= inputs[9].value;
  let color= inputs[11].value;
  let size= inputs[15].value;
  let gender= inputs[13].value;
  let personality= inputs[17].value;
  let dogListY=[];
  dogListY=localStorage.getItem("dogList");
  dogList3=JSON.parse(dogListY);
  let longitud=dogList3.length + 1;
  longitud=longitud.toString();
    dogList3.push({id: longitud, name, image, description, breed, age, color, size, gender, personality });
    localStorage.setItem("dogList",JSON.stringify(dogList3));
    renderizado(dogList3);
});
filterSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = e.target.children;
    let userSearch= inputs[0].value;
    userSearch=userSearch.toLowerCase();
    if(userSearch!=""){    
        let dogListFiltered=[];
        dogListFiltered= filtering(userSearch);
        renderizado(dogListFiltered);
    }else if(userSearch==""){
        let dogListU=localStorage.getItem("dogList");
        let dogListB=JSON.parse(dogListU);
        renderizado(dogListB);
        }
});
function mettingAdopt(ID){
    let dogListF=[];
    dogListF=localStorage.getItem("dogList");
    let dogListV=JSON.parse(dogListF);
    let reason="Adopt";
    let dogListMeeting=dogListV.filter((item) => item.id === ID.toString());
    localStorage.setItem(`dogListMeeting${ID}`,JSON.stringify(dogListMeeting));
    localStorage.setItem(`reason${ID}`,JSON.stringify(reason));
}
function mettingSponsor(ID){
    let dogListF=[];
    dogListF=localStorage.getItem("dogList");
    let dogListV=JSON.parse(dogListF);
    let reason="Sponsor";
    let dogListMeeting=dogListV.filter((item) => item.id === ID.toString());
    localStorage.setItem(`dogListMeeting${ID}`,JSON.stringify(dogListMeeting));
    localStorage.setItem(`reason${ID}`,JSON.stringify(reason));
}   
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  alertPlaceholder.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible alertLayout" role="alert" data-aos="fade-up" data-aos-offset="-1800">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
}
    let dogListJSON= JSON.parse(checkStorageList);
    if (dogListJSON===null){
        localStorage.setItem("dogList",JSON.stringify(dogList));
        let dogListJSON= dogList;
        renderizado(dogListJSON); 
      }else {
        renderizado(dogListJSON);
      }
      function refreshButtons(dogListJSON){
        let adoptButtonJs= [];
        let sponsorButtonJs= [];
        dogListJSON.forEach(item => {
          adoptButtonJs= document.getElementById(`botonA${item.id}`);
          sponsorButtonJs= document.getElementById(`botonB${item.id}`);
          adoptButtonJs.addEventListener("click" ,() =>mettingAdopt(item.id));
          sponsorButtonJs.addEventListener("click" ,() =>mettingSponsor(item.id));
          if (adoptButtonJs) {
            adoptButtonJs.addEventListener('click', () => {
              appendAlert('The dog will be waiting for you at the meeting room for adopting!', 'success')
            })
          }
          if (sponsorButtonJs) {
            sponsorButtonJs.addEventListener('click', () => {
              appendAlert('The dog will be waiting for you at the meeting room for sponsoring!', 'success')
            })
          }
      })
      }

