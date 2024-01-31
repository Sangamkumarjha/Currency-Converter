const Base_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdownSelect=document.querySelectorAll(".dropdown select");
const btn =document.querySelector(".btn")
const fromCurr =document.querySelector("#from select");
const toCurr =document.querySelector("#to select");
const msg=document.querySelector(".pgp");

for (let select of dropdownSelect){
    for(currCode in countryList){
    let newOption =document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if(select.name==="from" && currCode==="USD"){
        newOption.selected="selected";
    }
    else if(select.name==="to" && currCode==="INR"){
        newOption.selected="selected";
    }
    select.append(newOption);

    }
    select.addEventListener("change",(e)=>{upDateFlag(e.target);});
}

const upDateFlag=(el)=>{
let currCode =el.value;
let countryCode =countryList[currCode];
let newSrc =`https://flagsapi.com/${countryCode}/flat/64.png`;
let img=el.parentElement.querySelector("img");
img.src =newSrc;
}

btn.addEventListener("click",async(evt)=>{
evt.preventDefault();
let amount =document.querySelector("#amount");
let amtValue =amount.value;
if(amtValue ==="" || amtValue<=0){
    amtValue=1;
    amount.value ="1"
}
const URL =`${Base_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
let response = await fetch(URL);
let data = await response.json();
let rate = data[toCurr.value.toLowerCase()];

let finalAmount =amount.value * rate;
msg.innerText=  `${amtValue} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`

})