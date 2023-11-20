  function sessionstorageSet(item,name){
    item=JSON.stringify(item);
    sessionStorage.setItem(name,item);
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
  function registerRenderizeTwo(inputsList){
    let elementtoErase=document.getElementsByClassName("registerForm");
    elementtoErase[0].remove();
    let container=document.getElementsByClassName("register");
    let div=document.createElement("div"); 
            div.className="container-fluid registerForm";
            div.innerHTML=`<div class="registerCheckTitle" id="register3"><p> Detalles del perfil</p></div>
            <ul class="list-group list-group-flush"><li class="list-group-item list-group-item-dark registerCheck">Name:</li><li class="list-group-item list-group-item-dark">${inputsList.name}</li> <li class="list-group-item list-group-item-dark registerCheck">Last name:</li><li class="list-group-item list-group-item-dark">${inputsList.lName}</li><li class="list-group-item list-group-item-dark registerCheck">Genre:</li><li class="list-group-item list-group-item-dark">${inputsList.genre}</li><li class="list-group-item list-group-item-dark registerCheck">Social Status:</li><li class="list-group-item list-group-item-dark">${inputsList.sStatus}</li><li class="list-group-item list-group-item-dark registerCheck">Telephone number:</li><li class="list-group-item list-group-item-dark">${inputsList.cellNumber}</li><li class="list-group-item list-group-item-dark registerCheck">Address:</li><li class="list-group-item list-group-item-dark">${inputsList.homeAddress}</li><li class="list-group-item list-group-item-dark registerCheck">How many animals do you have in your house?:</li><li class="list-group-item list-group-item-dark">${inputsList.pets}</li></ul><div><button class="btn buttonRegister" type="button" id="buttonRegisterReturn"> Go back</button><button class="btn buttonRegister" type="button" id="buttonRegisterSubmit"> Submit</button></div>`;
            container[0].append(div);
            let submit=document.getElementById("buttonRegisterSubmit");
            let returnRegister=document.getElementById("buttonRegisterReturn");
            submit.addEventListener("click",() => {
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
                      localstorageSet(inputsList,"registerData");
                      setTimeout(() =>{
                        location. reload()
                      }, 3000);
                    }
                  });
            })
            returnRegister.addEventListener("click",() => {
                registerRenderize();
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
            })
  }
  function registerRenderize(){
    let elementtoErase=document.getElementsByClassName("registerForm");
    elementtoErase[0].remove();
    let container=document.getElementsByClassName("register");
    let div=document.createElement("div"); 
            div.className="container-fluid registerForm";
            div.innerHTML=`<form id="register2"> 
            <div class="mb-3"><label class="form-label">Name</label><input type="text" class="form-control emailRegister" id="name"></div><div class="mb-3"><label class="form-label">Last Name</label><input type="text" class="form-control emailRegister" id="lName"></div><select class="form-select emailRegister" id="genre"><option selected>Open this select menu</option><option value="1">Male</option><option value="2">Female</option><option value="3">Other</option></select><div class="mb-3"><label class="form-label">Social Status</label><input type="text" class="form-control emailRegister" id="sStatus"></div><div class="mb-3"><label class="form-label">Cellphone Number</label><input type="text" class="form-control emailRegister" id="cellNumber"></div><div class="mb-3"><label class="form-label">Home Address</label><input type="text" class="form-control emailRegister" id="homeAddress" ></div><div class="mb-3"><label class="form-label">How Many Animals in your care?</label><input type="text" class="form-control emailRegister" id="pets"></div><input type="submit" class="buttonRegister" value="Next"></form>`;
            container[0].append(div);
            let nextInput = document.getElementById("register2");
            nextInput.addEventListener("submit", (e) => {
                e.preventDefault();
                let inputs = e.target.children;
                inputsListItems=[];
                inputsListValues=[];
                for(i=0;i<= 6;i++){
                    inputsListItems.push(inputs.item(i).children);
                }
                inputsListItems.forEach(item => {
                    inputsListValues.push(item[1].value);
                })
                email=sessionstorageGet("email");
                password=sessionstorageGet("password");
                genre=inputs.item(2).options[inputs.item(2).selectedIndex].text;
                inputsList={name:inputsListValues[0],lName: inputsListValues[1],genre:genre,sStatus:inputsListValues[3],cellNumber:inputsListValues[4],homeAddress:inputsListValues[5],pets:inputsListValues[6],email: email, password: password};
                sessionstorageSet(inputsList,"registerData");
                registerRenderizeTwo(inputsList);
            });
  }
let registerInput = document.getElementById("register1");
registerInput.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputs = e.target.children;
    let email=inputs.item(0).children;
    let password=inputs.item(1).children;
    let check=inputs.item(2).children;
    email=email[1].value;
    password=password[1].value;
    check=check[0].checked;
    if (check==false){
        let label=document.getElementById("checkLabel");
        label.innerText="You need to check me out first";
    } else{
        sessionstorageSet(email,"email");
        sessionstorageSet(password,"password");
        sessionstorageSet(check,"check");
        registerRenderize();
    }
});