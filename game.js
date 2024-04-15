
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var k = 0;

$(document).keydown(function () { 
            
            if(k==0){
              nextSequence();
              k += 1;   
            }   
});

 


$(".btn").click(function () { 
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkSequence(userClickedPattern.length-1);

});

function playSound(name){
    /*$("."+name).fadeOut(100).fadeIn(100);*/
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColour){

    $("."+currentColour).addClass("pressed")

    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");

    }, 100);


}

function nextSequence() {  
    userClickedPattern=[];
    level += 1;
    $("h1").text("Level " + level);
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("."+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

function checkSequence(currentLevel) {

    if (userClickedPattern[currentLevel]=== gamePattern[currentLevel]) {
        if(userClickedPattern.length=== gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);  
            
        }
    }
    else{
        $("h1").text("GAME OVER!");
        var over = new Audio("./sounds/wrong.mp3");
        over.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);   
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    k=0;   
    setTimeout(() => {
        $("h1").text("Press A Key to Start");
    }, 1000);   
}
