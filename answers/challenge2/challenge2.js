// create global variables for each trial
var colorWord;
var fontColor;
var startRTclock;
var finalRT;
var partialRT = [];
var response;
var partialResponse = [];
var numberError;
var congruency;
var circleColors;
var colors = ["red","green", "blue", "yellow"];
var red = "rgb(255, 0, 0)";
var green = "rgb(127, 255, 0)";
var blue = "rgb(28, 191, 255)";
var yellow = "rgb(255, 255, 0)";


// create global variables for all trials
var iti = 100; //ms
var startDelay = 2000; //ms
var currentTrial = -1;
var colorWords = [];
var fontColors = [];
var finalRTs = [];
var finalResponses = [];
var partialRTs = [];
var partialResponses = [];
var numberErrors = [];
var congruencies = [];
var trials = [];
var expData = {};

$(document).ready(function() {
    createTrials();
    determinecircleColors();    
});

function determinecircleColors () {
    circleColors = shuffle(colors);
    for (i=0;i<circleColors.length;i++) {
        $("#circle" + (i + 1)).css("background-color",eval(circleColors[i])) 
    }
}
function showDemo() {
    $("#instructions").hide();
    $("#demoBox").show();        
}

function beginExperiment() {    
    $("#demoBox").hide();    
    setTimeout(nextTrial, startDelay); 
}
 
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
    let possibleColorWords = colors;
    let possibleFontColors = colors;
    var newTrial;

    // Create trials
    for (i=0; i<possibleColorWords.length; i++) { 
        for (j=0; j<possibleFontColors.length; j++) {   
            
            // Create congruent trials
            if (possibleColorWords[i] == possibleFontColors[j]) {
                newTrial = [possibleColorWords[i], possibleFontColors[j], "congruent"];
                // Compensate for larger number of incongruate trial combinations
                for (k=0; k<possibleFontColors.length-1; k++) {
                    trials.push(newTrial);                     
                }
            // Create incongruent trials
            } else {
                newTrial = [possibleColorWords[i], possibleFontColors[j], "incongruent"];
                trials.push(newTrial);                
            }        
            
        }
    }
    
    shuffle(trials);
     
    return trials;
}

function nextTrial () {
    if (currentTrial==-1) {$("#experimentBox").show()};
    $("#word").css("color","black");
    currentTrial += 1;
    if (currentTrial < trials.length) {
        // clear partial response and RT array
        partialResponse = [];
        partialRT = [];        
        setTimeout(presentStimuli,iti);
    } else {
        $("#experimentBox").hide();
        $("#endMessage").show();        
        saveAllData();
    }
}

function presentStimuli() {    
    colorWord = trials[currentTrial][0]; // take the first item in the trial array to define the color word
    fontColor = trials[currentTrial][1]; // take the second item in the trial array to define the font color        
    congruency = trials[currentTrial][2]; // take the third item in the trial array to determin congruency
    $("#word").text(colorWord);
    $("#word").css("color", eval(fontColor));
    $("#word").show();   
    if (currentTrial==0) {$("#colorSamples").css("display","grid")};   
    startRTclock = performance.now();   
}

function evaluateResponse(circleNumber) {
    if ($("#" + circleNumber).css("background-color")== eval(fontColor)) {
        finalRT = performance.now() - startRTclock;   
        finalResponse = fontColor;    
        numberError = partialResponse.length;    
        saveTrial ();     
    } else {
        partialRT.push(performance.now() - startRTclock);
        for (i=0;i<colors.length;i++) {
            if ($("#" + circleNumber).css("background-color")== eval(colors[i])) {
                partialResponse.push(colors[i]);
            }
        }        
    }
}

function saveTrial() {
    colorWords.push(colorWord);
    fontColors.push(fontColor);
    finalResponses.push(response);
    finalRTs.push(finalRT);
    partialResponses.push(partialResponse);
    partialRTs.push(partialRT);
    numberErrors.push(numberError);
    congruencies.push(congruency);
    nextTrial();
}

function saveAllData() {
    expData.colorWord = colorWords;
    expData.fontColor = fontColors;
    expData.finalResponse = finalResponses;
    expData.finalRT = finalRTs;
    expData.partialResponse = partialResponses;
    expData.partialRT = partialRTs;
    expData.numberError = numberErrors;
    expData.congruency = congruencies;
}