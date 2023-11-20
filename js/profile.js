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
let userLogin=document.getElementById("loginForm");
let adminOn = sessionstorageGet("adminOn");
let userOn = sessionstorageGet("userOn");
let Database = sessionstorageGet("Database");
function profileModify(profileDetails){
    profileDetails.innerHTML=`<form id="profileModify"> 
    <div class="mb-3"><label class="form-label detailsProfile">Name</label><input type="text" class="form-control" id="name"></div><div class="mb-3"><label class="form-label detailsProfile">Last Name</label><input type="text" class="form-control" id="lName"></div><label class="form-label detailsProfile">Genre</label><select class="form-select" id="genre"><option selected>Open this select menu</option><option value="1">Male</option><option value="2">Female</option><option value="3">Other</option></select><div class="mb-3"><label class="form-label detailsProfile">Social Status</label><input type="text" class="form-control" id="sStatus"></div><div class="mb-3"><label class="form-label detailsProfile">Cellphone Number</label><input type="text" class="form-control" id="cellNumber"></div><div class="mb-3"><label class="form-label detailsProfile">Home Address</label><input type="text" class="form-control" id="homeAddress" ></div><div class="mb-3"><label class="form-label detailsProfile">How Many Animals in your care?</label><input type="text" class="form-control" id="pets"></div><div class="profileButton"><button type="button" id="profileButton">Cancel</button><input type="submit" value="Save changes"></div></form>`;
    let inputsList = sessionstorageGet("Database");
    let name = document.getElementById("name");
    name.value=`${inputsList.name}`;
    let lName = document.getElementById("lName");
    lName.value=`${inputsList.lName}`;
    let genre = document.getElementById("genre");
    inputsList.genre=="Male"? genreIndex=1: inputsList.genre=="Female"? genreIndex=2 : genreIndex=3;
    genre.selectedIndex=`${genreIndex}`;
    let sStatus = document.getElementById("sStatus");
    sStatus.value=`${inputsList.sStatus}`;
    let cellNumber = document.getElementById("cellNumber");
    cellNumber.value=`${inputsList.cellNumber}`;
    let homeAddress = document.getElementById("homeAddress");
    homeAddress.value=`${inputsList.homeAddress}`;
    let pets = document.getElementById("pets");
    pets.value=`${inputsList.pets}`;
    let profileButton = document.getElementById("profileButton");
    let profileButtonTwo = document.getElementById("profileModify");
    profileButton.addEventListener("click",()=>{
        profileLogin(inputsList);
    })
    profileButtonTwo.addEventListener("submit",(e)=>{
        e.preventDefault();
        let inputs = e.target.children;
        inputsListItems=[];
        inputsListValues=[];
        for(i=0;i<= 7;i++){
        inputsListItems.push(inputs.item(i).children);
        }
        let contInputs=0;
        inputsListItems.forEach(item => {
            contInputs++;
            if(contInputs!=3){
            inputsListValues.push(item[1].value);
            }
        })
        genre=inputs.item(3).options[inputs.item(3).selectedIndex].text;
        email=inputsList.email;
        password=inputsList.password;
        inputsList={name:inputsListValues[0],lName: inputsListValues[1],genre:genre,sStatus:inputsListValues[3],cellNumber:inputsListValues[4],homeAddress:inputsListValues[5],pets:inputsListValues[6],email: email, password: password};
            Swal.fire({
                title: "Are you sure?",
                text: "Please verify your information is correct",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Sent!",
                    text: "Your user and information has been sent",
                    icon: "success"
                  });
                  sessionstorageSet(inputsList,"Database")
                  localstorageSet(inputsList,"registerData");
                  setTimeout(() =>{
                    location. reload()
                  }, 3000);
                }
              });
    })
}
function profileLogin(userData){
    let profileDetails=document.getElementById("profileDetails");
    profileDetails.innerHTML=`<div class="profileTitle"><p> Detalles del perfil</p></div><ul class="list-group list-group-flush"> <li class="list-group-item list-group-item-dark detailsProfile">Name:</li><li class="list-group-item list-group-item-dark">${userData.name}</li><li class="list-group-item list-group-item-dark detailsProfile">Last name:</li><li class="list-group-item list-group-item-dark">${userData.lName}</li><li class="list-group-item list-group-item-dark detailsProfile">Genre:</li><li class="list-group-item list-group-item-dark">${userData.genre}</li><li class="list-group-item list-group-item-dark detailsProfile">Social Status:</li><li class="list-group-item list-group-item-dark">${userData.sStatus}</li><li class="list-group-item list-group-item-dark detailsProfile">Telephone number:</li><li class="list-group-item list-group-item-dark">${userData.cellNumber}</li> <li class="list-group-item list-group-item-dark detailsProfile">Address:</li><li class="list-group-item list-group-item-dark">${userData.homeAddress}</li><li class="list-group-item list-group-item-dark detailsProfile">How many animals do you have in your house?:</li><li class="list-group-item list-group-item-dark">${userData.pets}</li></ul><div class="profileButton"><button class="btn" type="button" id="profileButton"> Press to change your profile details</button></div>`;
    let profileButton=document.getElementById("profileButton");
    profileButton.addEventListener("click", ()=>{
        profileModify(profileDetails);
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
  userLogin.innerHTML=`<div><p class= "welcomeBack">Welcome back Admin</p></div><button type="button" class="btn submitUser" id="logOffA">Log off</button>`;
  let logOff=document.getElementById("logOffA");
  logOff.addEventListener("click", ()=>{
      sessionStorage.removeItem("adminOn");
      location.reload();
  })
}
if(userOn!=null && userOn==1){
  loginSequence(Database,userLogin);
  profileLogin(Database);
}