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
let dogList=[];
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
fetch("./json/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((item) => {
      dogList.push(item);
    });
    localstorageSet(dogList,"dogList");
  });
function localstorageGet(item){
  gotItem=localStorage.getItem(item);
  gotItem=JSON.parse(gotItem);
  return gotItem;
}
function localstorageSet(item,name){
  item=JSON.stringify(item);
  localStorage.setItem(name,item);
}
function sessionstorageGet(item){
  gotItem=sessionStorage.getItem(item);
  gotItem=JSON.parse(gotItem);
  return gotItem;
}
function sessionstorageSet(item,name){
  item=JSON.stringify(item);
  sessionStorage.setItem(name,item);
}
function filtering(filter){
    let found=null;
    let dogListFiltered=[];
    let dogList2=[];
    dogList2=localstorageGet("dogList");
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
  let dogList3=[];
  dogList3=localstorageGet("dogList");
  let longitud=dogList3.length + 1;
  longitud=longitud.toString();
    dogList3.push({id: longitud, name: inputs[1].value, image: inputs[5].value, description: inputs[3].value, breed: inputs[7].value, age: inputs[9].value, color: inputs[11].value, size: inputs[15].value, gender: inputs[13].value, personality: inputs[13].value });
    localstorageSet(dogList3,"dogList");
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
        let dogListB=[];
        dogListB=localstorageGet("dogList");
        renderizado(dogListB);
        }
});
function mettingAdopt(ID){
    let dogListV=[];
    dogListV=localstorageGet("dogList");
    let reason="Adopt";
    let dogListMeeting=dogListV.filter((item) => item.id === ID.toString());
    localstorageSet(dogListMeeting,`dogListMeeting${ID}`);
    localstorageSet(reason,`reason${ID}`);
}
function mettingSponsor(ID){
    let dogListV=[];
    dogListV=localstorageGet("dogList");
    let reason="Sponsor";
    let dogListMeeting=dogListV.filter((item) => item.id === ID.toString());
    localstorageSet(dogListMeeting,`dogListMeeting${ID}`);
    localstorageSet(reason,`reason${ID}`);
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
    setTimeout(()=>{
      let checkStorageList=localstorageGet("dogList");
      if (checkStorageList==null){
        localstorageSet(dogList,"dogList");
          let dogListJSON= dogList;
          renderizado(dogListJSON); 
        }else {
          let dogListJSON= dogList;
          renderizado(dogListJSON);
        }
    },1000);
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
      function loginSequence(Database,userDiv){
        userDiv.innerHTML=`<div><p class= "welcomeBack">Welcome back ${Database.name}</p></div><button type="button" class="btn submitUser" id="logOff">Log off</button>`;
        let logOff=document.getElementById("logOff");
        logOff.addEventListener("click", ()=>{
            sessionStorage.removeItem("userOn");
            location.reload();
        })
      }
      let userLogin=document.getElementById("loginForm");
      userLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        let inputs = e.target.children;
        inputs=inputs.item(0).children;
        let username=inputs[0].value;
        let password=inputs[1].value;
        let Database=localstorageGet("registerData");
        if(Database!=null){
          userDatabase=Database.email;
          passwordDatabase=Database.password;
          if(username==userDatabase && password==passwordDatabase){
            let userOn=1;
            sessionstorageSet(userOn,"userOn");
            sessionstorageSet(Database,"Database");
            location. reload()
          }else if(username=="admin" && password=="admin"){
            let adminOn=1;
            sessionstorageSet(adminOn,"adminOn");
            location. reload()
          }else{
            Swal.fire({
              icon: "error",
              title: "User not registered",
              text: "Something went wrong!"
            });
          }
        }
      });
      let adminOn = sessionstorageGet("adminOn");
      let userOn = sessionstorageGet("userOn");
      let Database = sessionstorageGet("Database");
      if(adminOn!=null && adminOn==1){
        let visible=document.getElementById("invisibleConsole");
        visible.className="btn console";
        userLogin.innerHTML=`<div><p class= "welcomeBack">Welcome back Admin</p></div><button type="button" class="btn submitUser" id="logOffA">Log off</button>`;
        let logOff=document.getElementById("logOffA");
        logOff.addEventListener("click", ()=>{
            sessionStorage.removeItem("adminOn");
            location.reload();
        })
      }
      if(userOn!=null && userOn==1){
        loginSequence(Database,userLogin);
      }