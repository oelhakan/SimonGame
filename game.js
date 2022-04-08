var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickPattern = [];
var started = false;
var level = 0;

$(document).keydown(function(event){
  if(!started){
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickPattern.length-1);
});

function playSound(name){
  switch(name){
    case "blue":
      var blueSound = new Audio("sounds/blue.mp3");
      blueSound.play();
      break;
    case "green":
      var greenSound = new Audio("sounds/green.mp3");
      greenSound.play();
      break;
    case "red":
      var redSound = new Audio("sounds/red.mp3");
      redSound.play();
      break;
    case "yellow":
      var yellowSound = new Audio("sounds/yellow.mp3");
      yellowSound.play();
      break;
    default:
      var wrongSound = new Audio("sounds/wrong.mp3");
      wrongSound.play();
  }
}

function checkAnswer(currentLevel){
  if(userClickPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");
    if(userClickPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

function animatePress(currentColor){
  $("." + currentColor)[0].classList.add("pressed");
  setTimeout(function(){
    $("." + currentColor)[0].classList.remove("pressed");
  }, 100);
}

function nextSequence(){
  userClickPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor((Math.random() * 4));
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
