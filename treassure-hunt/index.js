"use strict";

var score = 0; 
var answerChest = ""; 
var amountOfChests = 3; 
var winningPicture = ""; 

document.addEventListener("DOMContentLoaded", function() {
  init();
}, false);


function init(){
  initGameUI();
  placeTreassure();
  getImageFromPexels();
}

function initGameUI(){
  for(let i = 1; i <= amountOfChests; i++){initChests(i)}
  initScoreBoard()
  initChestEventListeners();
  initRefreshButton();
}

function initChests(i){
  let chest = document.createElement("img");
  chest.setAttribute("src", "images/chest-closed.png");
  chest.setAttribute("id", "chest" + i);
  chest.setAttribute("hspace", "10");
  document.getElementById("chests").appendChild(chest);
}

function initScoreBoard(){
  let parnetNode = document.getElementById("game-wrapper");
  let referenceNode = document.getElementById("chests");
  let scoreDisplay = document.createElement("p");
  scoreDisplay.setAttribute("style", "text-align:center; font-size:300%");
  scoreDisplay.setAttribute("id", "score");
  scoreDisplay.textContent = "score : " + score;
  parnetNode.insertBefore(scoreDisplay, referenceNode.nextSibling)
  setInterval(function(){
    document.getElementById("score").textContent = "score : " + score;;
  },500);
}

function initRefreshButton(){
  let element = document.getElementById("refresh-button");
  element.addEventListener("click", refresh, false);
}

function initChestEventListeners() {
  for(let i = 1; i <= amountOfChests; i++){
    let currentChest = "chest" + i;
    let element = document.getElementById(currentChest);
    element.addEventListener("click", chestClicked, false);
  }
}

function placeTreassure(){
  answerChest = "chest" + Math.floor(Math.random() * amountOfChests + 1) ;
}

function chestClicked(e){
  if(event.target.id == answerChest && answerChest != ""){
    event.target.setAttribute("src", winningPicture)  
    event.target.setAttribute("style", "width:350px; height:300px")
    score = score + 5;
  }else if(answerChest != ""){
    event.target.setAttribute("src", "images/chest-open.png");
  }
  answerChest = "";
}

function getImageFromPexels(){
  let xhrdiamant = new XMLHttpRequest();
  xhrdiamant.open("GET", "apirequestr", true);
  xhrdiamant.setRequestHeader("Authorization", "apikey");
  xhrdiamant.addEventListener("load", function () {
	var pictures = JSON.parse(xhrdiamant.responseText);
	if (xhrdiamant.readyState == 4 && xhrdiamant.status == "200") {
     winningPicture =  pictures.photos[Math.floor(Math.random() * pictures.photos.length)].src.original;
		}
  })
  xhrdiamant.send();
}


function refresh(e){
  removeChestEvents();
  placeTreassure();
  getImageFromPexels();
}

function removeChestEvents(){
  for(let i = 1; i <= amountOfChests; i++){
    document.getElementById("chest" + i).setAttribute("src", "images/chest-closed.png"); 
    document.getElementById("chest" + i).removeAttribute("style", "width:350px; height:300px");
  }
}

