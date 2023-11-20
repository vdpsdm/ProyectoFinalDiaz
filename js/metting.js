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
let contenedorMeeting = document.getElementById("elementContainer");
function eraseElementFunction(element){
    let elementtoErase=document.getElementById(`element${element}`);
    elementtoErase.remove();
    localStorage.removeItem(`dogListMeeting${element}`);
    localStorage.removeItem(`reason${element}`);
}
function meetingRoomRenderizado(elementMeeting,motive){
    let div = document.createElement("div");
    div.className=("cardContainer");
    div.id=(`element${elementMeeting[0].id}`);
    div.innerHTML=`<div class="card"><div class="escButton"><button class="btn" type="button" id="eraseBtn${elementMeeting[0].id}"> X</button></div><div class="row g-0"><div class="col-3 imgmeetingDog"><img src=".${elementMeeting[0].image}" class="img-fluid rounded-start" alt="imgDog"></div><div class="col-7"><div class="card-body"><h5 class="card-title nameDog">${elementMeeting[0].name}</h5><p class="card-text descriptionDog">${elementMeeting[0].description}</p></div><ul class="list-group list-group-flush"><li class="list-group-item breedDog">Breed: ${elementMeeting[0].breed}</li><li class="list-group-item colorDog">Color: ${elementMeeting[0].color}</li><li class="list-group-item genreDog">Gender: ${elementMeeting[0].gender}</li><li class="list-group-item ageDog">Age: ${elementMeeting[0].age}</li><li class="list-group-item sizeDog">Size: ${elementMeeting[0].size}</li><li class="list-group-item personalityDog">Personality: ${elementMeeting[0].personality}</li><li class="list-group-item motiveDog">Motive: ${motive}</li></ul></div></div></div>
    `;
    contenedorMeeting.append(div);
    let eraseElementMeeting=document.getElementById(`eraseBtn${elementMeeting[0].id}`);
    eraseElementMeeting.addEventListener("click", () => {
        Swal.fire({
            title: "Are you sure?",
            text: "The dog will already miss you!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if (result.isConfirmed) {
              eraseElementFunction(elementMeeting[0].id);
              Swal.fire({
                title: "Deleted!",
                text: "The dog went back to the refugee",
                icon: "success"
              });
            }
          });
        
    });
}
let userLogin=document.getElementById("loginForm");
let adminOn = sessionstorageGet("adminOn");
let userOn = sessionstorageGet("userOn");
let Database = sessionstorageGet("Database");
function loginSequence(Database,userDiv){
    userDiv.innerHTML=`<div><p class= "welcomeBack">Welcome back ${Database.name}</p></div><button type="button" class="btn submitUser" id="logOff">Log off</button>`;
    let logOff=document.getElementById("logOff");
    logOff.addEventListener("click", ()=>{
        sessionStorage.removeItem("userOn");
        location.reload();
    })
  }
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
if(adminOn!=null && adminOn==1){
  userLogin.innerHTML=`<div><p class= "welcomeBack">Welcome back Admin</p></div>`;
}
if(userOn!=null && userOn==1){
  loginSequence(Database,userLogin);
}
let contador=0;
let dogListMeeting=[];
let dogListNew=[];
let dogList=[];
let reason="";
dogList=localstorageGet("dogList");
if(dogList!=null){
    dogList.forEach(item =>{
        dogListMeeting = localstorageGet(`dogListMeeting${item.id}`);
        reason = localstorageGet(`reason${item.id}`);
        if(dogListMeeting!=null && reason!=null){
            dogListNew.push(dogListMeeting[0]);
            meetingRoomRenderizado(dogListMeeting,reason);
        }  
    })
}
localstorageSet(dogListNew,"dogListNew");
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  alertPlaceholder.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible alertLayout" role="alert" data-aos="fade-up" data-aos-offset="-1800">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
}
let sendButton=document.getElementById("meetingSubmit");
dogListNew.forEach(item => {
    sendButton.addEventListener("click", () =>{ 
    if (userOn!=null && userOn==1){
        eraseElementFunction(item.id);
    }else{
        Swal.fire({
            icon: "info",
            title: "Wait!",
            text: "You need to be logged in to request a meeting",
            footer: '<a href="./register.html">Go register now!</a>'
          });
    }
    }
    );
})
sendButton.addEventListener('click', () => {
    if (userOn!=null && userOn==1){
        appendAlert('An email will arrive with the instructions for you to visit the refugee and meet with all of us', 'success')
    }else{
        Swal.fire({
            icon: "info",
            title: "Wait!",
            text: "You need to be logged in to request a meeting",
            footer: '<a href="./register.html">Go register now!</a>'
          });
    }
})
sendButton.addEventListener('click', () => {
    if (userOn!=null && userOn==1){
        localStorage.removeItem("dogListNew");
    }else{
        Swal.fire({
            icon: "info",
            title: "Wait!",
            text: "You need to be logged in to request a meeting",
            footer: '<a href="./register.html">Go register now!</a>'
          });
    }
})