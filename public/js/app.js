console.log("client side js running!");
// fetch("http://localhost:8000/weather?address=boston").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error);
//         }else{
//             // const oriData = JSON.parse(data)
//             console.log(data.location);
//             console.log(data.forcastData);
//         }
        
//     })
// });

const weatherForm = document.querySelector("form");
const Search =document.querySelector("input");
const messageOne=document.querySelector("#message-1");
const messageTwo=document.querySelector("#message-2")
weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const location = Search.value;
    // console.log(location);
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    fetch(`http://localhost:8000/weather?address=${location}`).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageOne.textContent=`Error:- ${data.error}`;
            messageOne.textContent="";
        }else{
            messageOne.textContent=`Location:- ${data.location}`;
            messageTwo.textContent=`Data:- ${data.forcastData}`;
        }
        
    })
});
})