// create global variables for each trial
var targetSide;
var distractorColor;
var rt;
var response;
var correct;

// create global variables for all trials
var iti = 500; //ms
var currentTrial = -1;
var targetSides = [];
var distractorColors = [];
var rts = [];
var responses = [];
var corrects = [];
var trials = [];
var expData = {};


$(document).ready(function() {
    createTrials();   
    setTimeout(nextTrial,iti); 
});

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function createTrials () {
    targetSide = ["left","right"];
    distractorColor = ["green", "red"];
    var newTrial;
    var numRep = 2; // number of repetitions required for the minimum number of combinations

    // Create the minimum number of combinations
    for (i=0; i<targetSide.length; i++) { 
        for (j=0; j<distractorColor.length; j++) {
            for (k=0; k<numRep; k++) {
                newTrial = [targetSide[i], distractorColor[j]];
                trials.push(newTrial);
            }
        }
    }
    
    shuffle(trials)
     
    return trials;
}

function nextTrial () {
    $(".square").hide();
    $("#tooSlow").hide();
    currentTrial += 1;
    if (currentTrial < trials.length) {        
        setTimeout(presentStimuli,iti);
    } else {
        saveAllData();
    }
}

function presentStimuli() {
    targetSide = trials[currentTrial][0]; // take the first item in the trial to define the side of the target white square
    distractorColor = trials[currentTrial][1]; // take the second item in the trial to define the side of the target white square
    if (targetSide == "left") {
        distractorSide = "right";
    } else if (targetSide == "right") {
        distractorSide = "left";
    }
    
    $("#" + targetSide + "Square").css("background-color","white");
    $("#" + distractorSide + "Square").css("background-color",distractorColor);
    $("#" + targetSide + "Square").show();    
    $("#" + distractorSide + "Square").show();    
    recordResponse();
    setTimeout(function(){
        $("#" + targetSide + "Square").hide();    
        $("#" + distractorSide + "Square").hide();    
    }, 250);
}

function recordResponse() {
    var startRTclock = performance.now(); 
    document.addEventListener('keydown', function recordKeyDown(event) {
        if (event.code == "KeyL" || event.code == "KeyR") {
            rt = performance.now() - startRTclock;
            document.removeEventListener('keydown', recordKeyDown);            
            response = event.code[3];
            if (response.toLowerCase() == targetSide[0].toLowerCase()) {
                correct = true;
            } else {
                correct = false;
            }
            // console.log(event.code + " was pressed");
            saveTrial ();
        }
    })    
}

function saveTrial() {
    targetSides.push(targetSide);
    distractorColors.push(distractorColor);
    responses.push(response);
    rts.push(rt);
    corrects.push(correct);
    nextTrial();
}

function saveAllData() {
    expData.targetSide = targetSides;
    expData.distractorColor = distractorColors;
    expData.response = responses;
    expData.rt = rts;
    expData.correct = corrects;
}


