function item(name, price, src, sName, disp){
  this.name = name;
  this.price = price;
  this.src = src;
  this.screenName = sName;
  this.dispY = disp;
}


var gameHats = [
    new item("Afro", 0, "items/hats/afro.png", "Rainbow Afro",6),
    new item("Bandanna", 150, "items/hats/bandanna.png", "Thief Bandanna",0),
    new item("Batman", 0, "items/hats/batman.png", "Batman Mask",7),
    new item("Crown", 0, "items/hats/crown.png", "King's Crown",12),
    new item("Eyepatch", 50, "items/hats/eyepatch.png", "Eye Patch",0),
    new item("Headphones", 0, "items/hats/headphones.png", "HeadPhones",8),
    new item("Kris", 0, "items/hats/kris.png", "Kris Hat",0),
    new item("Loki", 0, "items/hats/loki.png", "Loki's Helmet",8),
    new item("Magic", 0, "items/hats/magic.png", "Magic Hat",20),
    new item("Finn Hat", 350, "items/hats/finn.png", "Finn Hat",0),
    new item("CheeseHead", 150, "items/hats/cheesehead.png", "CheeseHead",0),
    new item("Helmet 1", 250, "items/hats/helmet1.png", "Helmet 1",0),
    new item("Iron Man", 1000, "items/hats/iron man.png", "Iron Man Helmet",0),
    new item("Fez", 200, "items/hats/fez.png", "Fez Hat",0),
    new item("Viking", 450, "items/hats/viking.png", "Viking Helmet",0),
    new item("Pharoah", 600, "items/hats/pharoah.png", "Pharoah Crown",0),
    new item("Gentleman", 1000, "items/hats/gentleman.png", "Gentleman Attire",0),
    new item("Helmet 3", 350, "items/hats/helmet3.png", "Helmet 3",0),
    new item("Pirate", 500, "items/hats/pirate.png", "Pirate Hat",0),
    new item("None", 1, "items/hats/none.png", "None")
];
var gameSkins = [
    new item("Black Skin", 350, "entities/black.png", "Black Skin",0),
    new item("Blue Skin", 350, "entities/blue.png", "Blue Skin",0),
    new item("Cat Skin", 450, "entities/cat.png", "Cat Skin",0),
    new item("Chowder Skin", 0, "entities/chowder.png", "Chowder Skin",0),
    new item("Cow Skin", 450, "entities/cow.png", "Cow Skin",0),
    new item("Creeper Skin", 0, "entities/creeper.png", "Creeper Skin",0),
    new item("Green Skin", 350, "entities/green.png", "Green Skin",0),
    new item("Ghost Skin", 0, "entities/ghost.png", "Ghost Skin",0),
    new item("Missingno Skin", 750, "entities/missingno.png", "Missingno. Skin",0),
    new item("Orange Skin", 350, "entities/orange.png", "Orange Skin",0),
    new item("Robot Skin", 450, "entities/robot.png", "Robot Skin",0),
    new item("Panda Skin", 450, "entities/panda.png", "Panda Skin",0),
    new item("Ninja Skin", 450, "entities/ninja.png", "Ninja Skin",0),
    new item("Purple Skin", 350, "entities/purple.png", "Purple Skin",0),
    new item("Red Skin", 350, "entities/red.png", "Red Skin",0),
    new item("White Skin", 350, "entities/white.png", "White Skin",0),
    new item("Player Skin", 1, "entities/player.png", "Default")
];


function map(combo, letter){
  this.combo = combo;
  this.letter = letter;
}

var gameMaps = [
  new map(["A", "B", "C"], "A"),
  new map(["A", "B", "D"], "M"),
  new map(["A", "B", "E"], "C"),
  new map(["A", "C", "D"], "D"),
  new map(["A", "C", "E"], "E"),
  new map(["A", "D", "E"], "F"),
  new map(["B", "C", "D"], "L"),
  new map(["B", "C", "E"], "H"),
  new map(["B", "D", "E"], "I"),
  new map(["C", "D", "E"], "J")
];
