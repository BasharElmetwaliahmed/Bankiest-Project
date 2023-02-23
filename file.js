// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
    movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE

};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
    movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const accounts = [account1, account2, account3, account4];






let currentAccount;
let sorts=false;
//create username function
function getUserName(accs){
accs.forEach(acc=>{
    fullName=acc.owner;
    acc.UserName=fullName.split(" ").map((name=>name[0])).join("").toLowerCase()
    
})
}




getUserName(accounts)
//elements
let submitBtn=document.querySelector(".submitButton");
let userInputField=document.querySelector(".userInput");
let pinInputField=document.querySelector(".pinInput");
let logMsg=document.querySelector(".log-msg");
let balanceValue=document.querySelector(".balance-value");
let balanceTime=document.querySelector(".balance-title p");
let movments=document.querySelector(".movments");
let transferBtn=document.querySelector(".transferSubmit");
let transferTo=document.querySelector("#transferto");
let transferAmount=document.querySelector("#Transferamount");
let closeBtn=document.querySelector(".closeSubmit");
let closePin=document.querySelector("#deletePin");
let closeUser=document.querySelector("#confirmUser");
let loanBtn=document.querySelector(".loanSubmit");
let loanAmount=document.querySelector("#loanAmount")
let inSum=document.querySelector(".in ");
let outSum=document.querySelector(".out ");
let interestSum=document.querySelector(".interest ");


//get balance
let getBalance=function(movs){
    let balance=movs.reduce((acc,curr)=>acc+Number(curr));
    return balance
}
//format date
const FormatDate=function(date){
let PassedDays=(date1,date2)=>{
  return Math.round(Math.abs(date1-date2))
}
let days=PassedDays(Date.now(),date)
if(days==0) return`Today`;
else if(days==1) return `Yesterday`;
else if(days<=7) return `this Week`;
else{
        let year=date.getFullYear();
      let day=(date.getDate()).toString().padStart(2,"0")
      let month=(date.getMonth()+1).toString().padStart(2,"0")
  return `${month}/${day}/${year}`
}

}
//display momvents function
let displayMovment=function(movs){
    movments.innerHTML=``
    let desp=0;
    let draw=0;
    sorting(movs,sorts)
    movs.forEach((mov,i)=>{
      let date=new Date(currentAccount.movementsDates[i]);
      let moveDate=FormatDate(date)
      
      if(mov>0){
            desp++
      
                movments.insertAdjacentHTML("afterbegin",`<div class="movrow dispoit">
                    <p>${desp} dispoit</p>
                    <p class='movDate'>${moveDate}</p>
                  <h3>${mov}€</h3>
                </div>`)
        }
        else{
            draw++
      movments.insertAdjacentHTML("afterbegin",`<div class="movrow withdrawal">
                    <p>${draw} withdrawal</p>
                                        <p>${moveDate}</p>

                  <h3>${mov}€</h3>
                </div>`)
        }
    })
    document.querySelectorAll(".movrow").forEach((row,i)=>{
      if(!(i%2==0)){
        row.style.backgroundColor="#002D62"
        
      }
      else{
        row.style.backgroundColor="white";
        document.querySelectorAll(".movrow p:nth-child(2)")[i].style.color="black";
      }
    })
    sorts=false
}

//update in / out/interest
let updateSummary=function(movs){
  //calc in sum
let insumvalue=movs.filter(mov=>mov>0).reduce((acc,curr)=>acc+curr);


//update (in)
inSum.innerHTML=insumvalue+`€`

//calc out sum
let outsumvalue=movs.filter(mov=>mov<0).reduce((acc,curr)=>acc+curr);
//update out
outSum.innerHTML=Math.abs(outsumvalue)+`€`

//calc interest
let interestVal=movs.map(mov=>mov*currentAccount.interestRate/100).filter(mov=>mov>0).reduce((acc,curr)=>acc+curr);
//update interest
interestSum.innerHTML=interestVal+`€`


}
//sort funct
let sorting=function(movs,sorting){
  if(sorting){
movs.sort((a,b)=>a-b);
  }
}

//on click sort button
document.querySelector("footer button").onclick=function(e){
  e.preventDefault();
  console.log("Bashar")
  sorts=true
  displayMovment(currentAccount.movements)
  
}




function updateUI(userAccount){
    //display 
    document.querySelector(".container").style.opacity=1;
    document.querySelector(".container").style.transform="unset";
    document.querySelector("footer").style.opacity=1;
    document.querySelector("footer").style.transform="unset";

       balanceValue.innerHTML=`${getBalance(userAccount.movements)}€`
    let time=new Date();
    balanceTime.innerHTML=`As of ${time.getDate()}/${time.getMonth()+1}/${time.getFullYear()} ,${time.getHours()}:${time.getMinutes()}`
    displayMovment(userAccount.movements)
    updateSummary(userAccount.movements)
}

//make timer global
let timer
//Make Timer
const StartTimer=function(time){
  let tick=function(){
    let min=(Math.trunc(time/60)).toString().padStart(2,0);
    let sec=(time%60).toString().padStart(2,0)
    document.querySelector(".timer").innerHTML=`${min} : ${sec}`
    if(time==0){clearInterval(timer)
    logMsg.innerHTML=`Log in to started`
        document.querySelector(".container").style.opacity=0;
    document.querySelector(".container").style.transform="translateY(-40px)";
    document.querySelector("footer").style.opacity=0;
    
    }
    time--;

  }
   timer=setInterval(tick,1000)
}

//submit button on click

submitBtn.addEventListener('click',function(e){
    //prevent default action
    e.preventDefault();
    //find the account
    
   let userAccount= accounts.find(acc=>acc.UserName===userInputField.value);
   currentAccount=userAccount;
    if(userAccount&& userAccount?.pin==pinInputField.value){
  //display welcome message
   logMsg.innerHTML=`Welcome ${userAccount.owner.split(" ")[0]} !`
   //empty fields
   userInputField.value=``;
   pinInputField.value=``;

   //update ui
   updateUI(userAccount)
   //stop the last timer
   clearInterval(timer)

   //start time again
   StartTimer(120);


    }
})

//on click transfer submit button
//implementing transfer
transferBtn.addEventListener('click',function(e){
    e.preventDefault();
    let amount=Number(transferAmount.value)
    
    let receiver=accounts.find(acc=>transferTo.value===acc.UserName);
    transferAmount.value=``;
    transferTo.value=``;
    

   if(receiver && amount>0 && amount<=getBalance(currentAccount.movements)){
    //add movment amount 
    receiver.movements.push(amount);
    currentAccount.movements.push(-amount);

    //add date of transfer

    receiver.movementsDates.push(new Date().toISOString)
    currentAccount.movementsDates.push(new Date().toISOString())
 

    updateUI(currentAccount)
   }
})

//on click close Button

closeBtn.addEventListener('click',function(e){
    e.preventDefault();

    if(currentAccount.UserName===closeUser.value &&Number(closePin.value) ===currentAccount.pin){
        let ind=accounts.findIndex(acc=>acc.UserName===closeUser.value)
        accounts.splice(ind,1);
            document.querySelector(".container").style.opacity=0;
    document.querySelector(".container").style.transform=" translateY(100px)";

    }
    closePin.value=closeUser.value=``;
    
})

//on click loan button
loanBtn.addEventListener('click',function(e){
    e.preventDefault();
    let amount =loanAmount.value;
setTimeout(function(){
      if(amount>0 && currentAccount.movements.some(mov=>mov>=amount*0.1)){
      //add loan movment
        currentAccount.movements.push(amount)
        //add loan date
        currentAccount.movementsDates.push(new Date().toISOString())


        updateUI(currentAccount);
    }
},2000)
            loanAmount.value=``;

})



