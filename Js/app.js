'use strict';

let formContainer=document.getElementById('form');
let tablecontainer=document.getElementById('tablesection');
let table=document.getElementById('table');
let total=document.createElement('p');


Doner.allDoners=[];
Doner.total=0;
function Doner (name,amount){

  this.name=name;
  this.amount=amount;

  Doner.allDoners.push(this);

  savetols();

}

formContainer.addEventListener('submit',traceSubmition);

function traceSubmition(event){

  event.preventDefault();

  let donerName=event.target[0].value;
  let donerAmount=event.target[1].value;

  let newDoner= new Doner(donerName,donerAmount);
  Doner.total+=parseInt(donerAmount);
  newDoner.randerDoners();
  randerTotal();

}

Doner.prototype.randerDoners=function(){

  let newRow=document.createElement('tr');
  table.appendChild(newRow);

  let donernames=document.createElement('td');
  newRow.appendChild(donernames);
  donernames.textContent=this.name;


  let donerAmounts=document.createElement('td');
  newRow.appendChild(donerAmounts);
  donerAmounts.textContent=this.amount;

  let donerAge=document.createElement('td');
  newRow.appendChild(donerAge);
  donerAge.textContent=Math.round(getRandomArbitrary(18,30));


};
function randerTotal(){
  total.remove();
  total=document.createElement('p');
  tablecontainer.appendChild(total);
  total.textContent=`Total : ${Doner.total}`;
}


function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}


function savetols(){

  let strainArry=JSON.stringify(Doner.allDoners);
  localStorage.setItem('doner',strainArry);
}


function getDoner(){

  let arry=JSON.parse(localStorage.getItem('doner'));

  if (arry!==null){
    for(let i=0; i<arry.length;i++){

      let oldDoner=new Doner(arry[i].name,arry[i].amount);
      Doner.total+=parseInt(arry[i].amount);

      oldDoner.randerDoners();
      randerTotal();

    }
  }

}
getDoner();
randerTotal();
