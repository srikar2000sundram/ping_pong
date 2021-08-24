var buttonColours = ["red", "blue", "green", "yellow"];
var backgroundMapping = {"red":"all3.jpg","blue":"all1.jpg","green":"all2.jpg","yellow":"icon1.png"};
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function buttonClick() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  changeBackground(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
  resetBackground();
});

function changeBackground(userChosenColour){
  console.log(buttonColours[0]);
  if (buttonColours[0] === userChosenColour){

    setTimeout(function(){
        $("body").css('background-image','url(images/dumb.jpg)')
    }, 200);

  }
  else if (buttonColours[1] === userChosenColour) {
    setTimeout(function(){
      $("body").css('background-image','url(images/luna.jpg)')
    },200);
  }
  else if (buttonColours[2] === userChosenColour) {
    setTimeout(function(){
      $("body").css('background-image','url(images/lord1.jpg)')
    },200);

  }
  else {

    setTimeout(function(){
      $("body").css('background-image','url(images/newt.jpg)')
    },200);

  }
}

// function changeBackground(elementId){
//   console.log(elementId);
//   console.log(backgroundMapping);
//   var imagePath = backgroundMapping[elementId];
//
//   console.log(imagePath);
//   $('body').css('background-image', "url(images/"+imagePath+")");
// }
function resetBackground(){
  setTimeout(function () {
    $('body').css('background-image', 'url(images/all.png)');
  }, 2000);

}
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 2000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      // $("body").css("background-image",'url(images/gel1.jpg)')

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed")
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
