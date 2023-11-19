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
    eraseElementMeeting.addEventListener("click", () => eraseElementFunction(elementMeeting[0].id));
}
let contador=0;
let dogListMeetingX=[];
let dogListMeeting=[];
let dogListA=[];
dogListA=localStorage.getItem("dogList");
let dogList=JSON.parse(dogListA);
if(dogList!=null){
    dogList.forEach(item => {
        dogListMeetingX = localStorage.getItem(`dogListMeeting${item.id}`);
        let reasonX = localStorage.getItem(`reason${item.id}`);
        dogListMeeting=JSON.parse(dogListMeetingX);
        let reason=JSON.parse(reasonX);
        if(dogListMeeting!=null && reason!=null){
            localStorage.setItem("dogListMeeting",JSON.stringify(dogListMeeting));
            meetingRoomRenderizado(dogListMeeting,reason);
        }  
    })
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
let sendButton=document.getElementById("meetingSubmit");
dogList.forEach(item => {
    sendButton.addEventListener("click", () => eraseElementFunction(item.id));
    sendButton.addEventListener('click', () => {
        appendAlert('An email will arrive with the instructions for you to visit the refugee and meet with all of us', 'success')
    })
})




