//set up the canvas
var canvas = document.createElement("canvas");
canvas.id = "game";
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth - 22;
canvas.height = window.innerHeight - 75;
document.body.appendChild(canvas);

//background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){ bgReady = true; };
bgImage.src = "tiles/background.png";

//wall objects
var wallReady = false;
var wallPNG = new Image();
wallPNG.onload = function(){wallReady = true;};
wallPNG.src = "tiles/brick1.png";

var floorReady = false;
var floorPNG = new Image();
floorPNG.onload = function(){floorReady = true;};
floorPNG.src = "tiles/floor.png";

//floor objects
var fillReady = false;
var fillPNG = new Image();
fillPNG.onload = function(){fillReady = true;};
fillPNG.src = "tiles/fill.png";

//map
var map = [];
var maxRooms = 15;
var mapSet = false;
var walls = [];
var rows = Math.floor(canvas.height / 32);
var cols = Math.floor(canvas.width / 32);
var roomCenters = [];

//loading screen
var loadingReady = false;
var loadingPNG = new Image();
loadingPNG.onload = function(){
  loadingReady = true;
}
loadingPNG.src = "art/pause.png";

//gameover map
var zeroReady = false;
var zeroPNG = new Image();
zeroPNG.onload = function(){zeroReady = true;};
zeroPNG.src = "tiles/dark.png";

var oneReady = false;
var onePNG = new Image();
onePNG.onload = function(){oneReady = true;};
onePNG.src = "tiles/one.png";
    
  
var drawn = false;

var gscale;
  
var ratio = canvas.width / canvas.height;
if(ratio > (32/21)){
  gscale = (canvas.height + 40) / 21;
}else{
  gscale = canvas.width / 32;
}
        
var leftM = (canvas.width - (32*gscale)) / 2;
var topM = (canvas.height - (21*gscale))/ 2;
var isgameover = false;
var gameoverMap = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
                [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]


////////////////   player and ai
var player = {
  speed : 5,  
  x : 3, 
  y : 3
};
var playerReady = false;
var playerPNG = new Image();
playerPNG.onload = function(){playerReady = true;};
playerPNG.src = "entities/player.png";
var turns = 0;
var activeTurn = -1;

var hat = {
  x : 3,
  y : 3
};
var hatReady = false;
var hatPNG = new Image();
hatPNG.onload = function(){hatReady = true;};
hatPNG.src = "items/hats/none.png";

var target = player;

/////////////////   scene items
var hole = {
  x : 10,
  y : 16
};
var holeReady = false;
var holePNG = new Image();
holePNG.onload = function(){holeReady = true;};
holePNG.src = "items/stair.png";

var blackMarket = {
  x : 0,
  y : 0,
  ingame : false
};
var marketReady = false;
var marketPNG = new Image();
marketPNG.onload = function(){marketReady = true;};
marketPNG.src = "items/Stair_Black2.png";

var treasureRoom = {
  x : 0,
  y : 0,
  ingame : false
}
var treasureReady = false;
var treasurePNG = new Image();
treasurePNG.onload = function(){treasureReady = true;};
treasurePNG.src = "items/stair_gold.png";


function money(x,y, value, id){
  this.x = x;
  this.y = y;
  this.value = value;
  this.moneyPNG = new Image();
  this.moneyPNG.src = "items/items2/Pickup_"+ id +".png";
}
var maxCash = 10;
var wallet = 0;
var moneyMult = 1;

var bank = {
  x : 0,
  y : 0
}
var bankReady = false;
var bankPNG = new Image();
bankPNG.onload = function(){bankReady = true;};
bankPNG.src = "items/Chest_Green.png";

var casino = {
  x : 0,
  y : 0,
  ingame : false
}
var casinoReady = false;
var casinoPNG = new Image();
casinoPNG.onload = function(){casinoReady = true;};
casinoPNG.src = "items/items3/Slot_Mascheen_norm.png";

var artifacts = [];
var artifact = {
  x : 0, 
  y : 0,
  ingame : false,
  id : 'A'
};
var artifactReady = false;
var artifactPNG = new Image();
artifactPNG.onload = function(){artifactReady = true;};
artifactPNG.src = "puzzles/artifacts/--.png"

var breadCat = {
  x : 0,
  y : 0,
  ingame : false,
  lives : 9,
  facing : "front"
};
var catReady = false;
var catPNG = new Image();
catPNG.onload = function(){catReady = true;};
catPNG.src = "items/items4/bread cat/front2.png";
var playerPosCat = [player.x, player.y];

//input variables 
var moveKey = null;
var npcCanMove = false;

var tapMove = true;
var holdMove = false;

var canMove = false;
var speedTime;

var upKey = 38;
var downKey = 40;
var leftKey = 37;
var rightKey = 39;

var konamiCode = [38,38,40,40,37,39,37,39,66,65,13];
var konamiUsed = false;

//global variables
var score = 0;
var bankCash = 0;
var visitedBank = false;
var hats = [];
var powerups = [];
var highscore = 0;
var skins = [];
var curHat = "items/hats/none.png";
var curSkin = "entities/player.png";
var hatDisp = 0;
var maxWindow;
var playing = true;
var lives = 1;



///////////////////////     PLAYER FUNCTION    //////////////////


//handle user input
var handPos = "Arrow";
function switchHands(value){
  if(value == "arrows"){
    upKey = 38;
    downKey = 40;
    leftKey = 37;
    rightKey = 39;
  }else if(value == "WASD"){
    upKey = 87;
    downKey = 83;
    leftKey = 65;
    rightKey = 68;
  }
  canvas.focus();
}
function switchMove(value){
  if(value == "tap"){
    tapMove = true;
    holdMove = false;
  }else{
    tapMove = false;
    holdMove = true;
  }
}

var counter = 0;
function moveType(e){
  if(tapMove && moveKey === null){
    canMove = true;
    move(e);
  }else if(holdMove){
    //if first step
    if(moveKey === null){
      canMove = true;
      move(e);
    }
    //if one of the movement keys pressed
    if(e.keyCode == upKey || e.keyCode == downKey || e.keyCode == leftKey || e.keyCode == rightKey){
      counter++;
    }
    //every interval, move another step then restart counter
    if(counter % player.speed === 0 && counter !== 0){
      pathNPC();
      canMove = true;
      move(e);
      counter = 0;
    }
  }
}

function move(e){
  if(canMove && playing){
    moveKey = e.keyCode;
    
    if(e.keyCode == upKey || e.keyCode == downKey || e.keyCode == leftKey || e.keyCode == rightKey)
      turns++;
    
    if(e.keyCode == upKey && moveNext(player, "up")){
      player.y -= 1;
      moveKey = upKey;
      canMove = false;
    }else if(e.keyCode == downKey && moveNext(player, "down")){
      player.y += 1;
      moveKey = downKey;
      canMove = false;
    }else if(e.keyCode == leftKey && moveNext(player, "left")){
      player.x -= 1;
      moveKey = leftKey;
      canMove = false;
    }else if(e.keyCode == rightKey && moveNext(player, "right")){
      player.x += 1;
      moveKey = rightKey;
      canMove = false;
    }
  }
}

function resetKey(e){
  if(moveKey == e.keyCode){
    moveKey = null;
    counter = 0;
    npcCanMove = false;
    canMove = false;
  }
}

function moveNext(entity, dir){
  var playX = entity.x;
  var playY = entity.y;
  
  //console.log(playX + " " + playY);
  //console.log(map[playY][playX]);
  
  if(dir == "up"){
    if(playY - 1 < 0){
      return false;
    }else if(map[playY - 1][playX] === 0){
      return true;
    }else{
      return false;
    }
  }
  if(dir == "down"){
    if(playY + 1 > rows -1){
      return false;
    }else if(map[playY + 1][playX] === 0){
      return true;
    }else{
      return false;
    }
  }
  if(dir == "left"){
    if(playX - 1 < 0){
      return false;
    }else if(map[playY][playX - 1] === 0){
      return true;
    }else{
      return false;
    }
  }
  if(dir == "right"){
    if(playX + 1 > cols - 1){
      return false;
    }else if(map[playY][playX + 1] === 0){
      return true;
    }else{
      return false;
    }
  }
}
function getItemByName(item){
  for(var t = 0; t < gameHats.length; t++){     //check hats
    if(gameHats[t].name == item){
      return gameHats[t];
    }
  }
  for(var t = 0; t < gameSkins.length; t++){     //check skins
    if(gameSkins[t].name == item){
      return gameSkins[t];
    }
  }
}
function wearHat(){
  hat.x = player.x;
  hat.y = player.y;
  
  var obj = getItemByName(localStorage.myHat);
  hatPNG.src = obj.src;
  hatDisp = obj.dispY;
}
function wearSkin(){
  var obj = getItemByName(localStorage.mySkin);
  playerPNG.src = obj.src;

}

//prevent other interactions when arrow keys or wasd keys down 
window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([87, 83, 65, 68, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);





///////////////////////////////////  NPCS  /////////////////////////////////////

/*
  the ratio of the player's speed [counting based on computation speed]
              vs. the npc's speed [interval based on timing]
        is  15:610 -> 3:122 -> 1:40 2/3
*/
var red = new enemy("red");
var pink = new enemy("pink");
var blue = new enemy("blue");
var orange = new enemy("orange");
var enemies = [red, blue, pink, orange];
var enemiesInGame = [];

function getMapArea(){
  var whiteSpace = 0;
  for(var a = 0; a < map.length; a++){
    for(var b = 0; b < map[a].length; b++){
      if(map[a][b] == 0)
        whiteSpace++;
    }
  }
  return whiteSpace;
}

function enemy(color){
  this.x = 0,
  this.y = 0,
  this.color = color;
  this.target = player;
  this.frontier = [];
  this.start = [this.x, this.y];
  this.frontier.push(this.start);
  this.closedCells = [];
  this.closedCells.push(this.start);
  this.index = 0;
  this.parents = [];
  
  this.count = 0;
  this.curCount = 0;
  this.dice = 0;
  this.dir = "left";
  
  this.npcReady = true;
  this.npcPNG = new Image();
  this.ingame = false;
  this.npcPNG.onload = function(){this.npcReady = true;};
  
  if(color == "red")
    this.npcPNG.src = "entities/npc.png";
  else if(color == "pink")
    this.npcPNG.src = "entities/npc2.png";
  else if(color == "blue")
    this.npcPNG.src = "entities/npc3.png";
  else if(color == "orange")
    this.npcPNG.src = "entities/npc4.png";
  else if(color == "doppel")
    this.npcPNG.src = "items/Doppelganger.png";
  else if(color == "thief")
    this.npcPNG.src = "entities/robber.png";
  
  this.goNPC = function(){
    if(color == "red"){
      this.chaseSmart();
    }else if(color == "blue"){
      //this.wallTrace("left");
      this.chaseStupid();
    }else if(color == "pink"){
      if(mapType == "rooms")
        this.patrolSmart();
      else
        this.randomSmart();
    }else if(color == "orange"){
      if(mapType == "rooms")
        this.patrolStupid();
      else
        this.randomSmart();
    }else if(color == "doppel"){
      this.target = this.getClosest(enemiesInGame, this);
      if(enemiesInGame.length > 0){
        this.chaseSmart();
      }
    }else if(color == "thief"){
      if(cash.length > 0){
        this.target = this.getClosest(cash, this)
      }else if(!this.puddleDown()){
        this.target = player;
      }
      this.chaseSmart();
    }
  }
  this.puddleDown = function(){
    for(var c = 0; c < itemsPlaced.length;c++){
      if(itemsPlaced[c].name == "puddle")
        return true;
    }
    return false;
  }
  this.getClosest = function(group, entity){
    var dists = [];
    for(var a = 0; a < group.length; a++){
      var distX = Math.abs(entity.x - group[a].x);
      var distY = Math.abs(entity.y - group[a].y);
      var distTot = distX + distY;
      dists.push(distTot);
    }
    var smallest = 0;
    for(var b = 0; b < dists.length; b++){
      if(dists[smallest] > dists[b]){
        smallest = b;
      }
    }
    return group[smallest];
  }
  this.getClosestRoom = function(group, entity){
    var dists = [];
    for(var a = 0; a < group.length; a++){
      var distX = Math.abs(entity.x - group[a][0]);
      var distY = Math.abs(entity.y - group[a][1]);
      var distTot = distX + distY;
      dists.push(distTot);
    }
    var smallest = 0;
    for(var b = 0; b < dists.length; b++){
      if(dists[smallest] > dists[b]){
        smallest = b;
      }
    }
    return group[smallest];
  }
  
  this.chaseSmart = function(){
    var targetPos = [this.target.x, this.target.y];
    var npcPos = [this.x, this.y];
      
    this.resetFrontier();
    
    this.parents = [];
    while(this.index < this.frontier.length){
      this.findArea();
    }
    var enemyPath = this.findPath(npcPos, targetPos);
    if(!arrEq(enemyPath[0], [-1,-1]) && enemyPath.length != 0){
      this.x = enemyPath[enemyPath.length - 1][0];
      this.y = enemyPath[enemyPath.length - 1][1];
    }else{
      //console.log("Unreachable or already there");
    }
  }
  this.setPt = [this.target.x, this.target.y];
  this.chaseStupid = function(){
    var targetPos = [this.setPt[0], this.setPt[1]];
    var npcPos = [this.x, this.y];
      
    this.resetFrontier();
    
    this.parents = [];
    while(this.index < this.frontier.length){
      this.findArea();
    }
    var enemyPath = this.findPath(npcPos, targetPos);
    if(!arrEq(enemyPath[0], [-1,-1]) && enemyPath.length != 0){
      this.x = enemyPath[enemyPath.length - 1][0];
      this.y = enemyPath[enemyPath.length - 1][1];
      this.setPt = [this.target.x, this.target.y];
    }else{
      //console.log("Unreachable or already there");
      this.setPt = [this.target.x, this.target.y];
    }
  }
  this.patrolSmart = function(){
    var nextRoom = this.getClosestRoom(roomCenters, this.target);
    var targetPos = [nextRoom[0], nextRoom[1]];
    var npcPos = [this.x, this.y];
      
    this.resetFrontier();
    
    this.parents = [];
    while(this.index < this.frontier.length){
      this.findArea();
    }
    var enemyPath = this.findPath(npcPos, targetPos);
    if(!arrEq(enemyPath[0], [-1,-1]) && enemyPath.length != 0 && getDist(this, this.target) > 5){
      this.x = enemyPath[enemyPath.length - 1][0];
      this.y = enemyPath[enemyPath.length - 1][1];
    }else{
      //wait and sit
      this.chaseStupid();
    }
    
    //console.log(enemyPath[0]);
  }
  
  this.room = 0;
  this.patrolAverage = function(){
    var targetPos = [roomCenters[this.room][0], roomCenters[this.room][1]];
    var npcPos = [this.x, this.y];
      
    this.resetFrontier();
    
    this.parents = [];
    while(this.index < this.frontier.length){
      this.findArea();
    }
    var enemyPath = this.findPath(npcPos, targetPos);
    if(!arrEq(enemyPath[0], [-1,-1]) && enemyPath.length != 0){
      if(getDist(this, this.target) > 5){
        this.x = enemyPath[enemyPath.length - 1][0];
        this.y = enemyPath[enemyPath.length - 1][1];
      }
      else{
        this.chaseStupid();
      }
    }else{
      this.room = Math.floor(Math.random() * roomCenters.length);
    }
    
    //console.log(enemyPath[0]);
  }
  
  this.patrolStupid = function(){
    var targetPos = [roomCenters[this.room][0], roomCenters[this.room][1]];
    var npcPos = [this.x, this.y];
      
    this.resetFrontier();
    
    this.parents = [];
    while(this.index < this.frontier.length){
      this.findArea();
    }
    var enemyPath = this.findPath(npcPos, targetPos);
    if(!arrEq(enemyPath[0], [-1,-1]) && enemyPath.length != 0){
      this.x = enemyPath[enemyPath.length - 1][0];
      this.y = enemyPath[enemyPath.length - 1][1];
    }else{
      this.room = Math.floor(Math.random() * roomCenters.length);
    }
    
    //console.log(enemyPath[0]);
  }
  this.randomSmart = function(){
    if(this.dice == 0){
      this.dice = Math.floor(Math.random() * 4) + 3;
    }
    if(this.dice == 1)
      this.dir = "up";
    else if(this.dice == 2)
      this.dir = "right";
    else if(this.dice == 3)
      this.dir = "down"
    else if(this.dice == 4)
      this.dir = "left";
    
    
    if(this.curCount < this.count && moveNext(this, this.dir)){
      if(this.dir == "up"){
        this.y -= 1;
      }else if(this.dir == "down"){
        this.y += 1;
      }else if(this.dir == "left"){
        this.x -= 1;
      }else if(this.dir == "right"){
        this.x += 1;
      }
      this.curCount++;
    }else{
      this.count = Math.floor(Math.random() * 5) + 1;
      this.curCount = 0;
      this.dice = Math.floor(Math.random() * 4) + 1;
    }
  }
  this.randomStupid = function(){
    this.dice = Math.floor(Math.random() * 4) + 1;

    if(this.dice == 1)
      this.dir = "up";
    else if(this.dice == 2)
      this.dir = "right";
    else if(this.dice == 3)
      this.dir = "down"
    else if(this.dice == 4)
      this.dir = "left";
    
    
    if(this.dir == "up" && moveNext(this, this.dir)){
      this.y -= 1;
    }else if(this.dir == "down" && moveNext(this, this.dir)){
      this.y += 1;
    }else if(this.dir == "left" && moveNext(this, this.dir)){
      this.x -= 1;
    }else if(this.dir == "right" && moveNext(this, this.dir)){
      this.x += 1;
    }
  }
  
  this.findPath = function(start, end){
    var path = []
    if(this.inClosedCells(end)){
      while(!arrEq(end, start)){
        path.push(end);
        end = this.findParents(end);
      }
      return path;
    }
    return [[-1,-1]];
  }
  this.findParents = function(child){
    for(var y = 0; y < this.parents.length; y++){
      var dad = this.parents[y][0];
      var kid = this.parents[y][1];
      if(arrEq(kid, child)){
        return dad;
      }
    }
    return [-1,-1];
  }
  this.findArea = function(){
    if(this.index < this.frontier.length){
      var neighbors = this.getNeighbors(this.frontier[this.index]);
      if(neighbors.length < 1){
        this.index++;
        neighbors = getNeighbors(frontier[index]);
      }
      
      var prtOut = "";
      var pInd = 0;
      for(var t = 0; t < neighbors.length; t++){
        if(!this.inClosedCells(neighbors[t])){
          this.closedCells.push(neighbors[t]);
          this.frontier.push(neighbors[t]);
          prtOut += neighbors[t] + ", ";
          if(!this.inParents(neighbors[t])){
            var family = [this.frontier[this.index], neighbors[t]];     //parent then child
            this.parents.push(family);
            //console.log(parents[pInd][0] + ", " + parents[pInd][1]);
            pInd++;
          }
        }
        
      }
      //console.log(prtOut);
      
      this.index++;
    }
  }
  this.getNeighbors = function(pos){
    var neighbor = [];
    var north = [pos[0], pos[1]-1];
    var east = [pos[0]+1, pos[1]];
    var south = [pos[0], pos[1]+1];
    var west = [pos[0]-1, pos[1]];
    if(((pos[1] - 1) >= 0) && (map[pos[1] -1][pos[0]] != 1))
      neighbor.push(north);
    if(((pos[0] - 1) >= 0) && (map[pos[1]][pos[0] - 1] != 1))
      neighbor.push(west);
    if(((pos[1] + 1) < map.length) && (map[pos[1] +1][pos[0]] != 1))
      neighbor.push(south);
    if(((pos[0] + 1) < map[0].length) && (map[pos[1]][pos[0] + 1] != 1))
      neighbor.push(east);
    
    return neighbor;
  }
  this.inClosedCells = function(pos){
    for(var v = 0; v < this.closedCells.length; v++){
      if(arrEq(pos, this.closedCells[v]))
        return true;
    }
    return false;
  }
  this.inParents = function(pos){
    for(var v = 0; v < this.parents.length; v++){
      for(var o = 0; o < this.parents[v].length; o++){
        if(arrEq(pos, this.parents[v][o]))
          return true;
      }
    }
    return false;
  }
  this.resetFrontier = function(){
    this.frontier = [];
    this.start = [this.x, this.y];
    this.frontier.push(this.start);
    this.closedCells = [];
    this.closedCells.push(this.start);
    this.index = 0;
      
    this.parents = [];
  }
  this.newDir = function(dir){
    this.dir = dir;
    moved = true;
  }
  this.wallTrace = function(side){
    var moved = false;
    if(side == "left"){
      if(this.dir == "right" && !moved){
        if(moveNext(this, "up") && !moved){
          this.newDir("up");
        }else if(!moveNext(this, "right") && !moved){
          if(moveNext(this, "up") && !moved)
            this.newDir("up");
          else if(moveNext(this, "down") && !moved)
            this.newDir("down");
          else
            this.newDir("left");
        }
      }
      else if(this.dir == "down" && !moved){
        if(moveNext(this, "right") && !moved){
          this.newDir("right");
        }else if(!moveNext(this, "down") && !moved){
          if(moveNext(this, "right") && !moved)
            this.newDir("right");
          else if(moveNext(this, "left") && !moved)
            this.newDir("left");
          else
            this.newDir("up");
        }
      }
      else if(this.dir == "left" && !moved){
        if(moveNext(this, "down") && !moved){
          this.newDir("down");
        }else if(!moveNext(this, "left") && !moved){
          if(moveNext(this, "down") && !moved)
            this.newDir("down");
          else if(moveNext(this, "up") && !moved)
            this.newDir("up");
          else
            this.newDir("right");
        }
      }else if(this.dir == "up" && !moved){
        if(moveNext(this, "left")){
          this.newDir("left");
        }else if(!moveNext(this, "up") && !moved){
          if(moveNext(this, "left") && !moved)
            this.newDir("left");
          else if(moveNext(this, "right") && !moved)
            this.newDir("right");
          else
            this.newDir("down");
        }
      }
    }else if(side == "right"){
      if(this.dir == "right" && !moved){
        if(moveNext(this, "down") && !moved){
          this.newDir("down");
        }else if(!moveNext(this, "right") && !moved){
          if(moveNext(this, "down") && !moved)
            this.newDir("down");
          else if(moveNext(this, "up") && !moved)
            this.newDir("up");
          else
            this.newDir("left");
        }
      }
      else if(this.dir == "down" && !moved){
        if(moveNext(this, "left") && !moved){
          this.newDir("left");
        }else if(!moveNext(this, "down") && !moved){
          if(moveNext(this, "left") && !moved)
            this.newDir("left");
          else if(moveNext(this, "right") && !moved)
            this.newDir("right");
          else
            this.newDir("up");
        }
      }
      else if(this.dir == "left" && !moved){
        if(moveNext(this, "up") && !moved){
          this.newDir("up");
        }else if(!moveNext(this, "left") && !moved){
          if(moveNext(this, "up") && !moved)
            this.newDir("up");
          else if(moveNext(this, "down") && !moved)
            this.newDir("down");
          else
            this.newDir("right");
        }
      }else if(this.dir == "up" && !moved){
        if(moveNext(this, "right")){
          this.newDir("right");
        }else if(!moveNext(this, "up") && !moved){
          if(moveNext(this, "right") && !moved)
            this.newDir("right");
          else if(moveNext(this, "left") && !moved)
            this.newDir("left");
          else
            this.newDir("down");
        }
      }
    }
    
    
    if(this.dir == "up")
      this.y -= 1;
    else if(this.dir == "down")
      this.y += 1;
    else if(this.dir == "left")
      this.x -= 1;
    else if(this.dir == "right")
      this.x += 1;
  }
}

function npcKey(e){
  if((e.keyCode == upKey || e.keyCode == downKey || e.keyCode == leftKey || e.keyCode == rightKey) && !npcCanMove){
    npcCanMove = true;
    for(var a = 0; a < enemiesInGame.length; a++){
      enemiesInGame[a].goNPC();
    }
    if(doppel.ingame){
      doppel.goNPC();
    }
    
  }
}
function newGhost(){
  var pickGhost = Math.floor(Math.random() * 4);
  while(alreadyPlayed(enemies[pickGhost])){
    pickGhost = Math.floor(Math.random() * 4);
  }
  enemiesInGame.push(enemies[pickGhost]);
}
function addEnemies(area){
  enemiesInGame = [];
  var totalArea = map.length * map[0].length;
  var ratio = area/totalArea;
  
  if(mapType == "rooms"){
    if(ratio <= 0.25){
      newGhost();
    }else if(ratio > 0.25 && ratio <= 0.33){
      newGhost();
      newGhost();
    }else if(ratio > 0.33 && ratio <= 0.5){
      newGhost();
      newGhost();
      newGhost();
    }else if(ratio > 0.5){
      for(var g = 0; g < 4; g++){
        newGhost();
      }
    }
  }
  else{
    if(ratio <= 0.33){
      newGhost();
    }else if(ratio > 0.33 && ratio <= 0.5){
      newGhost();
      newGhost();
    }else{
      newGhost();
      newGhost();
      newGhost();
    }
  }
  for(var t = 0;t< enemiesInGame.length; t++){
    enemiesInGame[t].room = 0;
  }
  
}
function alreadyPlayed(ghost){
  if(enemiesInGame.length == 0)
    return false;
  else{
    for(var u = 0; u < enemiesInGame.length;u++){
      if(enemiesInGame[u] == ghost)
        return true;
    }
    return false;
  }
}

function arrEq(arr1, arr2){
  if(!Array.isArray(arr1))
    return false; 
    
  for(var p = 0; p < arr1.length; p++){
    if(arr1[p] !== arr2[p])
      return false
  }
  return true;
}
function getDist(ent1, ent2){
  var distX = Math.abs(ent1.x - ent2.x);
  var distY = Math.abs(ent1.y - ent2.y);
  return distX + distY;
}

////////////////////////////////////////     MAP FUNCTIONS   ////////////////////////////////////////////

//determine which type of room to make
var mapType = "rooms";
if(canvas.width < 600 || canvas.height < 300)
  mapType = "random";
else
  mapType = "rooms";
function newMap(type){
  if(type == "random"){
    mapType = "random";
  }else{
    mapType = "rooms";
  }
}
var gridOn = "true";
function createMap(){
  checkGameOver();
  if(mapType == "random")
    createRandom();
  else
    createRooms();
    
  if(localStorage.gridOn == "true")
    floorPNG.src = "tiles/floor2.png";
  else
    floorPNG.src = "tiles/floor.png";
    
  itemsInGame = [];
  itemsPlaced = [];
  rollPowerUp();
  artifact.ingame = false;
  rollArtifact();
  turns = 0;
  activeTurn = 0;
  for(var w = 0; w < itemList.length; w++){
    itemList[w].placed = false;
  }
  target = player;
  addMoneys();
  moneyMult = 1;
  radioactive = false;
  
  makeInventory();
  visitedBank = false;
  doppel.ingame = false;
  for(var t = 0; t < enemiesInGame.length; t++){
    enemiesInGame[t].target = player;
  }
  
}





/////////////////   PCG GENERATED  /////////////

var prevX;
var prevY;
var curX;
var curY;

function createRooms(){
  //reset everything
  map = [];
  roomCenters = [];
  mapSet = false;
  prevX = null;
  prevY = null;
  curX = null;
  curY = null;
  //set everything to a wall sprite for a blank canvas
  for(var v = 0; v < rows; v++){
    var row2 = [];
    for(var w = 0; w < cols; w++){
      row2.push(1);
    }
    map.push(row2);
  }
  mapSet = true;
  
  //pick random number of rooms to make
  var roomsTot = Math.floor(Math.random() * maxRooms) + 4;
  //console.log(roomsTot + " rooms generated");
  
  //pick random coordinates for each room to start in then make it
  for(var tot = 0; tot < roomsTot; tot++){
    var corX = Math.floor(Math.random() * (rows - 10)) + 1;
    var corY = Math.floor(Math.random() * (cols - 10)) + 1;
    for(var pp = 0; pp < 10; pp++){       //try 10 more times
      if(map[corX][corY] == 0){
        corX = Math.floor(Math.random() * (rows - 10)) + 1;
        corY = Math.floor(Math.random() * (cols - 10)) + 1;
      }
    }
    newRoom(corX, corY);
  }
  
  //set the outer walls
  setWalls();
  
  
  
  //reset player positions for new game
  resetPos(player);
  addEnemies(getMapArea());
  //enemiesInGame.push(red);
  
  for(var q = 0; q < enemiesInGame.length; q++){
    enemiesInGame[q].ingame = true;
    resetPos(enemiesInGame[q]);
  }
  resetPos(hole);
  
}
function makeSpareRoom(){
  var foundWhite = false;
  for(var a = 0; a < map.length; a++){
    for(var b = 0; b < map[a].length; b++){
      if(map[a][b] == 1){
        foundWhite = true;
      }
    }
  }
  if(!foundWhite)
    createRooms();
}
function newRoom(x, y){
  //make a random width and height
  var width = Math.floor(Math.random() * 7) + 3;
  var height = Math.floor(Math.random() * 7) + 3;
  
  //if those didn't work, try 10 more times until it does
  for(var p = 0; p < 10; p++){
    if(roomHere(width, height)){
      width = Math.floor(Math.random() * 7) + 3;
      height = Math.floor(Math.random() * 7) + 3;
    }
  }
  
  //if coords are ok then make a new room
  if(!roomHere(width, height)){
    //set the center for this room
    curX = x + Math.ceil(width / 2);
    curY = y + Math.ceil(height / 2);
    roomCenters.push([curY, curX]);
    
    //carve out the new room
    for(var v = 0; v < width; v++){
      for(var w = 0; w < height; w++){
        map[v + x][w + y] = 0;
      }
    }
    //make the corridor to connect to the previous room
    var VH = Math.floor(Math.random() * 2) + 1;
    VH == 1 ? newAlley("h") : newAlley("v");
    
    /*
    console.log(x + ", " + y);
    console.log("W: " + width + "\tH: " + height);
    if((prevX !== null) && (prevY !== null)){
      var dx = Math.abs(prevX - curX);
      var dy = Math.abs(prevY - curY);
      console.log("DX: " + dx + "\tDY: " + dy);
    }
    */
    
    //make the new center the old center for next branch
    prevX = x + Math.floor(width / 2);
    prevY = y + Math.floor(height / 2);
    
    //console.log(prevX + ", " + prevY);
    
  }else{
    return;
  }
}
//check if there is already a room placed there
function roomHere(w, h){
  for(var t = 0; t < w; t++){
    for(var u = 0; u < h; u++){
      if(map[t][u] == 0)
        return true;
    }
  }
  return false;
}
//make new corridors to connect the rooms together
function newAlley(type){
  if((prevX !== null) && (prevY !== null)){
    var xDist = Math.abs(prevX - curX);
    var yDist = Math.abs(prevY - curY);
    if(type == "h"){    //if horizontal first
      for(var a1 = 0; a1 <= xDist; a1++){
        if(curX > prevX){     //if last room is to the left of this room
            map[prevX + a1][prevY] = 0;
        }else {               //if last room is to the right of this room
            map[prevX - a1][prevY] = 0;
        }
      }
      for(var b1 = 0; b1 <= yDist; b1++){
        if(curY > prevY){     //if next room is below the current room
            map[curX][prevY + b1] = 0;
        }else{                //if next room is above current room
            map[curX][prevY - b1] = 0;
        }
      }
    }else if(type == "v"){    //if horizontal first
      for(var b2 = 0; b2 <= yDist; b2++){
        if(curY > prevY){     //if next room is below the current room
            map[curX][prevY + b2] = 0;
        }else{                //if next room is above current room
            map[curX][prevY - b2] = 0;
        }
      }
      for(var a2 = 0; a2 <= xDist; a2++){
        if(curX > prevX){     //if last room is to the left of this room
            map[prevX + a2][prevY] = 0;
        }else {               //if last room is to the right of this room
            map[prevX - a2][prevY] = 0;
        }
      }
    }
  }
  else
    return;
}


///////////    RANDOMLY GENERATED   ////////

function createRandom(){
  console.log("NEW MAP GENERATING!");
  //reset the map
  map = [];
  mapSet = false;
  //build new set
  for(var a = 0; a < rows; a++){
    var newRow = [];
    for(var b = 0; b < cols; b++){
      var dice = Math.floor(Math.random() * 10);
      if(dice >= 7){
        newRow.push(1);
      }else{
        newRow.push(0);
      }
    }
    map.push(newRow);
  }
  
  mapSet = true;
  //reset player positions for new game
  resetPos(player);
  addEnemies(getMapArea());
  //enemiesInGame.push(red);
  
  for(var q = 0; q < enemiesInGame.length; q++){
    enemiesInGame[q].ingame = true;
    resetPos(enemiesInGame[q]);
  }
  resetPos(hole);
  canReachEnd();
}
function canReachEnd(){
  var test = new enemy("red");
  test.x = hole.x;
  test.y = hole.y;
  test.target = player;
  
  test.resetFrontier();
  while(test.index < test.frontier.length){
    test.findArea();
  }
  var stairPath = test.findPath([test.x, test.y], [player.x, player.y]);
  if(arrEq(stairPath[0], [-1,-1])){
    console.log("no go");
    createRandom();
  }
}

////////////  side functions  //////////////

function setWalls(){
  for(var aa = 0; aa < cols; aa++){   //set top
    map[0][aa] = 1;
  }
  for(var bb = 0; bb < cols; bb++){   //set bottom
    map[rows - 1][bb] = 1;
  }
  for(var cc = 0; cc < rows; cc++){   // set left side
    map[cc][0] = 1;
  }
  for(var dd = 0; dd < rows; dd++){   //set right side
    map[dd][cols - 1] = 1;
  }
}
function resetPos(entity){
  var newX = Math.floor(Math.random() * cols);
  var newY = Math.floor(Math.random() * rows);
  while(map[newY][newX] == 1 || (newX == hole.x && newY == hole.y) || (newX == player.x && newY == player.y)){
    newX = Math.floor(Math.random() * cols);
    newY = Math.floor(Math.random() * rows);
  }
  entity.x = newX;
  entity.y = newY;
}


function drawMap(){
  if(mapSet){
    for(var z = 0; z < rows; z++){
      for(var y = 0; y < cols; y++){
        if(map[z][y] == 1){
          ctx.drawImage(wallPNG, y * 32, z * 32);
        }else if(map[z][y] == 0){
          ctx.drawImage(floorPNG, y * 32, z * 32);
        }
      }
    }
  }
}

function printMap(){
  for(var q = 0; q < rows; q++){
    console.log(map[q].toString());
  }
}




////////////////////////  SAVE DATA ///////////////////////
function load(){
  if(localStorage.handPos)
    handPos = localStorage.handPos;
  else
    localStorage.handPos = "Arrow";
    
  if(localStorage.gridOn)
    gridOn = localStorage.gridOn;
  else
    localStorage.gridOn = "false";
  
  //saved variables - bank money, high score, hats, power-ups, skins
  if(localStorage.highscore)
    highscore = localStorage.highscore;
  else
    localStorage.highScore = highscore;
  
  if(localStorage["myHats"])
    hats = JSON.parse(localStorage["myHats"]);
  else 
    localStorage["myHats"] = JSON.stringify(hats);
    
  if(localStorage["powerups"])
    powerups = JSON.parse(localStorage["myHats"]);
  else 
    localStorage["powerups"] = JSON.stringify(powerups);
    
  if(localStorage["skins"])
    skins = JSON.parse(localStorage["skins"]);
  else
    localStorage["skins"] = JSON.stringify(skins);
    
  if(localStorage.myHat)
    curHat = localStorage.myHat;
  else
    localStorage.myHat = curHat;
    
  if(localStorage.mySkin)
    curSkin = localStorage.mySkin;
  else
    localStorage.mySkin = curSkin;
    
  if(!localStorage.inStore){
    localStorage.inStore = "false";
  }
  if(!localStorage.myCash){
    wallet= 0;
    localStorage.myCash = 0;
  }
  
  if(localStorage.moneyMult)
    moneyMult = parseInt(localStorage.moneyMult);
  else
    localStorage.moneyMult = moneyMult;
  
  
  if(localStorage.bankCash){
    bankCash = parseInt(localStorage.bankCash);
  }else{
    bankCash = 0;
    localStorage.bankCash = bankCash;
  }
  
  if(localStorage.konami)
    konamiUsed = localStorage.konami;
  else
    localStorage.konami = konamiUsed;
}
function save(){
  localStorage.highScore = highscore;
  //localStorage.konami = konamiUsed;
  //localStorage.bankCash = parseInt(bankCash);
  if(localStorage.inStore == "false"){
    localStorage.myCash = Number(wallet);
    localStorage["inventory"] = JSON.stringify(inventory);
    localStorage.lives = lives;
    localStorage.moneyMult = moneyMult;
  }
  else{
    wallet = Number(localStorage.myCash);
    lives = Number(localStorage.lives);
    moneyMult = localStorage.moneyMult;
  }  
  localStorage["artifacts"] = JSON.stringify(artifacts);
}


////////////////////  POWER-UP and XTRAS FUNCTIONS ///////////////////
function item(x, y, name){
  this.x = x;
  this.y - y;
  this.name = name;
  this.ingame = false;
  this.placed = false;
  this.itemReady = true;
  this.itemPNG = new Image();
  this.itemPNG.onload = function(){this.itemReady = true;};
  
  if(name == "bomb")
    this.itemPNG.src = "items/ICE_arm1_red.png";
  else if(name == "puddle")
    this.itemPNG.src = "items/items2/Bucket_Water.png";
  else if(name == "radiowaste")
    this.itemPNG.src = "items/Radioactive Bucket.png";
  else if(name == "spoon")
    this.itemPNG.src = "items/spoon.png";
  else
    this.itemPNG.src = "items/key.png"
}
var itemsInGame = [];
var itemsPlaced = [];
var doppel = new enemy("doppel");
var radioactive = false;

var inventory = ["--", "--", "--"];
var inventoryImg = [];
var emptyCart = true;
var itemFull = false;
var itemList = ["bomb", "puddle", "radiowaste", "spoon"];

function updateItems(){
  for(var a = 0; a < itemsInGame.length; a++){
    itemsInGame[a].ingame = true;
  }
  for(var b = 0; b < itemsPlaced.length;b++){
    itemsPlaced[b].placed = true;
  }
  
  if(!doppel.ingame){
    doppel.x = player.x;
    doppel.y = player.y;
  }
}
function getOpenSpace(){
  for(var b = 0; b < inventory.length; b++){
    if(inventory[b] == "--")
      return b;
  }
}
function putAwayCart(){
  var cart = [];
  if(localStorage["cart"])
    cart = JSON.parse(localStorage["cart"]);
    
  if(cart.length > 0){
    //console.log("found items");
    var stInd = getOpenSpace();
    for(var y = 0; y < cart.length; y++){
      inventory[stInd] = cart[y];
      stInd++;
    }
    //console.log("Cart: " + cart + "\tInvent: "+ inventory);
  }
  cart = [];
  localStorage["cart"] = JSON.stringify(cart);
  emptyCart = true;
}
function convertInventory(){
  for(var i = 0; i < inventory.length; i++){
    if(typeof(inventory[i]) == "string" && inventory[i] != "--"){
      var changeItem = new item(0, 0, inventory[i]);
      inventory[i] = changeItem;
      //console.log(inventory[i].itemPNG.src);
    }
  }
}
function rollPowerUp(){
  var powerDice = Math.floor(Math.random() * 15) + 1;
  
  if(powerDice <= 2){
    var waste = new item(0, 0, "radiowaste");
    resetPos(waste);
    itemsInGame.push(waste);
  }
  
  if(powerDice < 7 && powerDice > 2){
    var puddle = new item(0,0, "puddle");
    resetPos(puddle);
    itemsInGame.push(puddle);
  }
  
  if(powerDice >= 7 && powerDice < 12){
    var bomb = new item(0,0,"bomb");
    resetPos(bomb);
    itemsInGame.push(bomb);
  }
  
  if(powerDice >= 12){
    var spoon = new item(0,0,"spoon");
    resetPos(spoon);
    itemsInGame.push(spoon);
  }
  
  var treasureDice = Math.floor(Math.random() * 5) + 1;
  if(treasureDice == 5){
    resetPos(treasureRoom);
    treasureRoom.ingame = true;
  }else{
    treasureRoom.ingame = false;
  }

  if((score % 5 == 0) && (score !== 0)){
    blackMarket.ingame = true;
    resetPos(blackMarket);
  }else{
    blackMarket.ingame = false;
  }
  
  var moneyDice = Math.floor(Math.random() * 4) + 1;
  if(moneyDice == 3){
    resetPos(bank);
    bank.ingame = true;
  }else{
    bank.ingame = false;
  }
  if(moneyDice == 2){
    resetPos(casino);
    while(casino.x == blackMarket.x && casino.y == blackMarket.y)
      resetPos(casino);
    casino.ingame = true;
  }else{
    casino.ingame = false;
  }
  
}
function rollArtifact(){
  var powerDice = Math.floor(Math.random() * 5) + 1;
  if(powerDice == 1)
    newArtifact("A");
  else if(powerDice == 2)
    newArtifact("B");
  else if(powerDice == 3)
    newArtifact("C");
  else if(powerDice == 4)
    newArtifact("D");
  else if(powerDice == 5)
    newArtifact("E");
}
function newArtifact(letter){
  if(!inArr(letter, artifacts)){
    artifact.ingame = true;
    artifactPNG.src = "puzzles/artifacts/" + letter + ".png";
    artifact.id = letter;
    resetPos(artifact);
  }else{
    artifact.ingame = false;
  }
}
function snatchTreasure(){
  if((player.x == artifact.x) && (player.y == artifact.y) && artifact.ingame){
    if(!inArt(artifact.id)){
      artifacts.push(artifact.id);
      artifact.ingame = false;
    }else{
      artifact.ingame = true;
    }
  }
}
function goCatgo(){
  if(breadCat.ingame){
    
  }
}


function inArt(art){
  for(var t = 0; t < artifacts.length; t++){
    if(art == artifacts[t])
      return true;
  }
  return false;
}
function inArr(item, list){
  for(var e = 0; e < list.length; e++){
    if(list[e] == item)
      return true;
  }
  return false;
}
function itemGet(){
  for(var i = 0; i < itemsInGame.length; i++){
    if((player.x == itemsInGame[i].x) && (player.y == itemsInGame[i].y) && !itemFull){
      newItem(itemsInGame[i]);
      itemsInGame.splice(i, 1);
    }
  }
}
function lootGet(){
  for(var i = 0; i < cash.length; i++){
    if((player.x == cash[i].x) && (player.y == cash[i].y)){
      wallet += (moneyMult * Number(cash[i].value));
      cash.splice(i, 1);
    }
    for(var p = 0; p < enemiesInGame.length; p++){
      if((enemiesInGame[p].color == "thief") && (cash.length > 0) && (enemiesInGame[p].x == cash[i].x) && (enemiesInGame[p].y == cash[i].y)){
        cash.splice(i, 1);
      }
    }
  }
}
function newItem(item){
  var placed  = false;
  for(var i = 0; i < inventory.length; i++){
    if(!placed && inventory[i] == "--"){
      inventory[i] = item;
      placed = true
    }
  }
}
function checkFull(){
  for(var i = 0; i < inventory.length; i++){
    if(inventory[i] == "--"){
      return false;
      
    }
  }
  return true;
}
function usePowerUp(e){
  var item1 = inventory[0];
  var item2 = inventory[1];
  var item3 = inventory[2];
  if((e.keyCode == 49) && ((item1 != "--" && item1.name != "bomb") || (item1.name == "bomb" && activeTurn <= 0))){
    item1.placed = true;
    itemsPlaced.push(item1);
    item1.x = player.x;
    item1.y = player.y;
    activeTurn = turns;
    inventory[0] = inventory[1];
    inventory[1] = inventory[2];
    inventory[2] = "--"
    itemFull = false;
  }else if((e.keyCode == 50) && ((item2 != "--" && item2.name != "bomb") || (item2.name == "bomb" && activeTurn <= 0))){
    item2.placed = true;
    itemsPlaced.push(item2);
    item2.x = player.x;
    item2.y = player.y;
    activeTurn = turns;
    inventory[1] = inventory[2];
    inventory[2] = "--"
    itemFull = false;
  }else if((e.keyCode == 51) && ((item3 != "--" && item3.name != "bomb") || (item3.name == "bomb" && activeTurn <= 0))){
    item3.placed = true;
    itemsPlaced.push(item3);
    item3.x = player.x;
    item3.y = player.y;
    activeTurn = turns;
    inventory[2] = "--";
    itemFull = false;
  }
}
function activatePowerUp(){
  for(var a = 0; a < itemsPlaced.length; a++){
    var curItem = itemsPlaced[a];
    if(curItem.name == "puddle"){
      curItem.itemPNG.src = "items/puddle2.png";
      if(activeTurn + 5 != turns){
        for(var t = 0; t < enemiesInGame.length; t++){
          enemiesInGame[t].target = curItem;
        }
      }else{
        itemsPlaced.splice(a, 1);
        for(var t = 0; t < enemiesInGame.length; t++){
          enemiesInGame[t].target = player;
        }
        activeTurn = -1;
      }
    }
    if(curItem.name == "bomb"){
      bombTime = turns - activeTurn + 1;
      if(bombTime != 5){ 
        curItem.itemPNG.src = "items/ICE_arm" + bombTime + "_red.png";
      }else{
        explode(3, curItem);
        itemsPlaced.splice(a, 1);
        activeTurn = -1;
      }
    }
    if(curItem.name == "radiowaste"){
      radioactive = true;
      itemsPlaced.splice(a, 1);
      playerPNG.src = "entities/glow.png";
    }
    if(curItem.name == "spoon" || doppel.ingame){
      doppel.ingame = true;
      itemsPlaced.splice(a, 1);
    }else{
      doppel.ingame = false;
      doppel.x = player.x;
      doppel.y = player.y;
    }
  }
}
function explode(radius, item){
  for(var x = -radius; x < radius; x++){
    for(var y = -radius; y < radius; y++){
      var hitX = item.x + x;
      var hitY = item.y + y;
      if(hitY >= 0 && hitX >= 0)
        map[hitY][hitX] = 0;
        
      for(var t = 0; t < enemiesInGame.length; t++){
        if(enemiesInGame[t].x == hitX && enemiesInGame[t].y == hitY)
          enemiesInGame[t].ingame = false;
      }
      
      if(bank.ingame && (hitX == bank.x) && (hitY == bank.y)){
        bank.ingame = false;
        var card = new money(bank.x, bank.y, 250, "Card");
        cash.push(card);
        var thiefDice = Math.floor(Math.random() * 3) + 1;
        for(var o = 0; o < thiefDice; o++){
          var thief = new enemy("thief");
          resetPos(thief);
          thief.ingame = true;
          enemiesInGame.push(thief);
        }
      }else if(casino.ingame && (hitX == casino.x) && (hitY == casino.y)){
        casino.ingame = false;
        var card = new money(casino.x, casino.y, 250, "Card");
        cash.push(card);
        var thiefDice = Math.floor(Math.random() * 3) + 1;
        for(var o = 0; o < thiefDice; o++){
          var thief = new enemy("thief");
          resetPos(thief);
          thief.ingame = true;
          enemiesInGame.push(thief);
        }
      }
    }
  }
}

var cash = [];
function addMoneys(){
  cash = [];
  var area = getMapArea();
  maxCash = Math.round(Math.random() * (area / 7)) + 1;
  for(var c = 0; c < maxCash; c++){
    cash.push(newMoneys());
  }
}
function newMoneys(){
  var value = moneyAlgorithm();
  var dollar = new money(0,0, value[0], value[1]);
  resetPos(dollar);
  return dollar;
}
function moneyAlgorithm(){
  var dice = Math.round(Math.random() * 99) + 1;
  var amt = [1,"Coin_Copper"];
  if(dice <= 50)
    amt = [1, "Coin_Copper"];
  else if(dice > 50 && dice <= 75)
    amt = [5, "Coin_Silver"];
  else if(dice > 75 && dice <= 90)
    amt = [10, "Coin_Gold"];
  else if(dice > 90 && dice <= 100)
    amt = [20, "Bill"];
  return amt;
}
function drawMoneys(){
  for(var f = 0; f < cash.length; f++){
    ctx.drawImage(cash[f].moneyPNG, cash[f].x * 32, cash[f].y * 32);
  }
}
function drawItems(){
  for(var q = 0; q < itemsInGame.length;q++){
    var curItem = itemsInGame[q];
    ctx.drawImage(curItem.itemPNG, curItem.x * 32, curItem.y * 32);
  }
  for(var q = 0; q < itemsPlaced.length;q++){
    var curItem = itemsPlaced[q];
    ctx.drawImage(curItem.itemPNG, curItem.x * 32, curItem.y * 32);
  }
}

function showInventoryandMoney(){
  var list = "";
  for(var e = 0; e < inventory.length; e++){
    if(inventory[e] != "--")
      list += inventory[e].name + ", ";
    else
      list += inventory[e] + ", ";
  }
  //document.getElementById('inventory').innerHTML = "Inventory: " + list;
  document.getElementById('wallet').innerHTML = "Wallet: $" + wallet;
}
var inventSet = false;
function makeInventory(){
  var invent = document.getElementById('inventory');
  invent.innerHTML = "Inventory: ";
  inventSet = false;
  for(var i = 0; i < inventory.length; i++){
    var img = document.createElement("img");
    img.src = "items/items2/Coin_Silver.png";
    img.width = img.height = 16;
    invent.appendChild(img);
    inventoryImg.push(img);
  }
  inventSet = true;
}
function updateInventory(){
  var invent = document.getElementById('inventory');
  for(var p = 0; p < inventory.length; p++){
    var img = invent.getElementsByTagName('img')[p];
    if(inventory[p] == "--" && inventSet){
      img.src = "items/none.png";
    }else if(inventory[p] != "--" && typeof(inventory[p] != "string")){
      img.src = inventory[p].itemPNG.src;
    }
  }
}

/////////////////  VISUAL FUNCTIONS   ///////////////////
//draw everything
function render(){
  if(localStorage.inStore == "true" ||!wallReady || !floorReady || !holeReady || !treasureReady || !artifactReady || !playerReady || !hatReady || !marketReady || !bankReady || !casinoReady){
    ctx.drawImage(loadingPNG, 0, 0, canvas.width, canvas.height);
  }
  else{
    if(wallReady){
      var pat = ctx.createPattern(wallPNG, 'repeat');
      ctx.fillStyle = pat;
      ctx.fillRect(0,0, canvas.width, canvas.height);
    }
    //fillAll();
    if(wallReady && floorReady){
      drawMap();
    }
    if(holeReady){
      ctx.drawImage(holePNG, hole.x * 32, hole.y * 32);
    }
    if(marketReady && blackMarket.ingame){
      ctx.drawImage(marketPNG, blackMarket.x * 32, blackMarket.y * 32);
    }
    if(treasureReady && treasureRoom.ingame){
      ctx.drawImage(treasurePNG, treasureRoom.x * 32, treasureRoom.y * 32);
    }
    if(bankReady && bank.ingame){
      ctx.drawImage(bankPNG, bank.x * 32, bank.y * 32);
    }
    if(casinoReady && casino.ingame){
      ctx.drawImage(casinoPNG, casino.x * 32, casino.y * 32, 32, 32);
    }
    drawItems();
    if(artifactReady && artifact.ingame){
      ctx.drawImage(artifactPNG, artifact.x * 32, artifact.y * 32);
    }
    drawMoneys();
    if(playerReady){
      ctx.drawImage(playerPNG, player.x * 32, player.y * 32);
    }
    if(doppel.ingame){
      ctx.drawImage(doppel.npcPNG, doppel.x * 32, doppel.y * 32);
    }
    for(var e = 0; e < enemiesInGame.length; e++){
      if(enemiesInGame[e].npcReady && enemiesInGame[e].ingame){
        ctx.drawImage(enemiesInGame[e].npcPNG, enemiesInGame[e].x * 32, enemiesInGame[e].y * 32);
      }
    }
    
    if(hatReady){
      ctx.drawImage(hatPNG, hat.x * 32, (hat.y * 32) - hatDisp);
    }
  }
}
function fillAll(){
  for(var i = 0; i < closedCells.length; i++){
    var cell = closedCells[i];
    if(fillReady){
      ctx.drawImage(fillPNG, cell[0] * 32, cell[1] * 32);
    }
  }
}


////////////////////// GAME OVER  /////////////////
function gameover(){
  ctx.fillStyle = "#000000";
  ctx.fillRect(0,0,canvas.width, canvas.height);
  drawn = false;
  var interval = setInterval(drawGameOver, 5);
}
function gameoverkey(e){
  if(e.keyCode == 13 && drawn && isgameover){
    lives = 1;
    createMap();
    isgameover = false;
  }
}
    
var gx = 0;
var gy = 3;
function drawGameOver(){
  if(!drawn){
    if(gameoverMap[gy][gx] == 0)
      ctx.drawImage(zeroPNG, gx * gscale + leftM, gy * gscale + topM, gscale, gscale);
    else if(gameoverMap[gy][gx] == 1)
      ctx.drawImage(onePNG, gx * gscale + leftM, gy * gscale + topM, gscale, gscale);
        
    if(gx == 31 && gy == 17)
      drawn = true;
    else if(gx == 31){
      gy++;
      gx = 0;
    }else{
      gx++;
    }
      
    if(gy == 8){
      gy = 12;
    }
  }
}


////////////////////////////////////////      MAIN GAME LOOP   //////////////////////////////////////////
function main(){
  var now = Date.now();
  var delta = now - then;
  //update(delta / 1000);
  if(!isgameover)
    render();
  then = now;
  //repeat again asap
  requestAnimationFrame(main);
  
  window.addEventListener("keydown", moveType, false);
  window.addEventListener("keydown", test, false);
  window.addEventListener("keydown", npcKey, false);
  window.addEventListener("keydown", usePowerUp, false);
  window.addEventListener("keyup", resetKey, false);
  window.addEventListener("keydown", debugDown, false);
  window.addEventListener("keypress", debug, false);
  window.addEventListener("keydown", gameoverkey, false);
  window.addEventListener("keydown", tryKonami, false);

  canvas.focus();
  newGame();
  showInventoryandMoney();
  itemGet();
  updateItems();
  lootGet();
  snatchTreasure();
  activatePowerUp();
  
  itemFull = checkFull();
  if(localStorage.inStore == "false" && !emptyCart)
    putAwayCart();
  else if(localStorage.inStore == "true")
    emptyCart = false;
  
  convertInventory();
  wearHat();
  if(!radioactive)
    wearSkin();
  else
    playerPNG.src = "entities/glow.png";
    
  save();
  winOpen();
  updateInventory();
  checkWindows();
  switchHands(localStorage.handPos);
}
function cheat(){
  radioactive = true;
  wallet= 1000;
  score = 4;
}

//cross browser support for updating animation frames
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//LETS PLAY!
var then = Date.now(); 
main();

function test(e){
  if(e.keyCode == 121){     //[Y]
    console.log('STRATGEY');
  }
}

//////////////////////////////////   OTHER FUNCTIONS  ///////////////////////////////
function newGame(){
  if(!isgameover){
    if((player.x == hole.x) && (player.y == hole.y)){
      score++;
      createMap();
      document.getElementById('score').innerHTML = "LEVEL: " + score;
    }else if((player.x == blackMarket.x) && (player.y == blackMarket.y) && blackMarket.ingame){
      console.log("ENTERING BLACK MARKET!");
      moveKey = null;
      score++;
      createMap();
      var setCash = localStorage.myCash;
      localStorage.setCash = Number(setCash);
      localStorage.inStore = "true";
      openWindow("blackMarket2.html", 1200, 600);
    }else if((player.x == treasureRoom.x) && (player.y == treasureRoom.y) && treasureRoom.ingame){
      console.log("ENTERING PUZZLE KEY ROOM!");
      moveKey = null;
      score++;
      createMap();
      //localStorage["artifacts"] = JSON.stringify(artifacts);
      localStorage.inStore = "true";
      openWindow("puzzleKey.html", 500, 400);
    }else if((player.x == casino.x) && (player.y == casino.y) && casino.ingame){
      console.log("ENTERING CASINO!");
      moveKey = null;
      score++;
      createMap();
      var setCash = localStorage.myCash;
      localStorage.setCash = Number(setCash);
      localStorage.inStore = "true";
      openWindow("casino.html", 750, 400);
    }else if((player.x == bank.x) && (player.y == bank.y) && bank.ingame && !visitedBank){
      console.log("ENTERING BANK!");
      moveKey = null;
      visitedBank = true;
      var setCash = localStorage.myCash;
      localStorage.setCash = Number(setCash);
      localStorage.inStore = "true";
      openWindow("bank2.html", 750, 400);
    }else if(enemiesInGame.length !== 0){
      for(var b = 0; b < enemiesInGame.length; b++){
        if((player.x == enemiesInGame[b].x) && (player.y == enemiesInGame[b].y) && enemiesInGame[b].ingame){
          if(!radioactive){
            lives--;
            localStorage.lives--;
            createMap();
          }else{
            enemiesInGame[b].ingame = false;
            enemiesInGame.splice(b, 1);
          }
        }
      }
    }
    
    if(enemiesInGame.length !== 0){
      for(var b = 0; b < enemiesInGame.length; b++){
        if((doppel.x == enemiesInGame[b].x) && (doppel.y == enemiesInGame[b].y) && enemiesInGame[b].ingame && doppel.ingame){
          enemiesInGame[b].ingame = false;
          enemiesInGame.splice(b, 1);
          doppel.ingame = false;
        }
      }
    }
  }
  
}
function checkGameOver(){
  if(lives <= 0){
    resetPos(player);
    if(score > highscore)
      highscore = score;
    wallet = 0;
    score = 0;
    inventory = ["--", "--", "--"];
    artifacts = [];
    blackMarket.ingame = false;
    document.getElementById('score').innerHTML = "LEVEL: " + 0;
    drawn = false;
    gameover();
    gx = 0;
    gy = 3;
    isgameover = true;
    itemFull = false;
    moveKey = null;
  }
}

function openWindow(url, width, height){
  if(maxWindow && !maxWindow.closed){
    maxWindow.close();
  }
  var winWidth = width;
  var winHeight = height;
  var winLeft = (screen.width-winWidth)/2;
  var winTop = (screen.height - winHeight)/2;
  var winOptions = ",width=" + winWidth;
  winOptions += ",height=" + winHeight;
  winOptions += ",left=" + winLeft;
  winOptions += ",top=" + winTop;
  winOptions += ",menubar=no,location=no,resizable=no,scrollbars=no, toolbar=no"
  maxWindow = window.open(url, "newWindow", winOptions);
  setTimeout(function(){
    if(!maxWindow || maxWindow.outerHeight === 0)
      alert("Please disable the pop up blocker to enter the store!");
  },10);
  moveKey = null;
}
function checkWindows(){
  if(maxWindow && !maxWindow.closed){
    playing = false;
  }else{
    playing = true;
  }
}
function checkData(){
  console.log("HighScore: " + localStorage.highscore);
  console.log("My Cash: " + localStorage.myCash);
  console.log("Bank Cash: " + localStorage.bankCash);
  console.log("Current Hat: " + localStorage.myHat);
  console.log("Current Skin: " + localStorage.mySkin);
}
function winOpen(){
  if(maxWindow){
    if(maxWindow.closed){
      localStorage.inStore = "false";
    }else{
      localStorage.inStore = "true";
    }
  }else{
    localStorage.inStore = "false";
  }
}
window.onunload = function(){
  maxWindow.close();
}

var keyInd = 0;
function tryKonami(e){
  if(e.keyCode == konamiCode[keyInd]){
    keyInd++;
  }else{
    keyInd = 0;
  }
  
  if(keyInd == konamiCode.length && konamiUsed == "false"){
    alert("KONAMI CODE ACTIVATED");
    wallet += 1000;
    konamiUsed = "true";
    localStorage.konami = "true"
  }
}

////////////////////////////////  DEBUGS  //////////////////////////////////////////
function debug(e){
  if(e.keyCode == 122){       //[Z]
    //console.log("X: " + player.x + "\tY: " + player.y);
  }
}

function debugDown(e){
  if(e.keyCode == 90){       //[Z]
    
  }
}

