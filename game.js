var gamePattern=[];
var userClickedPattern=[];

var buttonColors=["red", "blue", "green", "yellow" ];

var level=0;
var started=false;

$(document).keypress(function(){
    if(!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function(){

    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor+".mp3");
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*4)
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" +  randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor+".mp3")
}

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
    {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
        }
    }else
    {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart")
        startOver();
    }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
}

function playSound(name)
{
    var audio=new Audio("sounds/"+name)
    audio.play()
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed")
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed")
    }, 100);
}
