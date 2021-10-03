var expInfo = {
	experimentName: "Absences_empty_spaces, exp02bis - 2 - preregistered-closer-to-stim-probs",
    expCode: "Absences_empty_spaces_exp02bis_preregistered-2",
    prolificExpId: "49948C98"
}
var urlProlific = "https://app.prolific.co/submissions/complete?cc=" + expInfo.prolificExpId;

var numCells = 4; // number of cells in the grid
var drawingTypes  = ["bicycle","butterfly","jacket","pants"];
var trialsDemo = [];
var trialsPractice = [];
var emptyPosition = randomBinaryNumber() + 1; // determine whether this subject gets empty1 or empty2
var keyAssignment = randomBinaryNumber(); // 0: A=object L=empty; 1: A=empty L=object

var feedbackCorrect = "darkgreen"; // green
var feedbackIncorrect = "darkred"; // red

var iti = 250; //ms
var stimulusDuration = 750; //ms
var maxResponseDuration = 1250; //ms
var feedbackDuration = 750; //ms
var rtEstimate = 600; //ms

var stimulusDurationDemo = 2500; //ms
var probeDurationDemo = 2500; //ms
var maxResponseDurationDemo = 2500; //ms
var feedbackDurationDemo = 2500; //ms

var stimuliTextDemo  = 'Object appears';
var probeTextDemo	 = 'Circle appears';
var responseTextDemo = 'You respond';
var feedbackTextDemo = 'Feedback (green=correct / red=wrong)';
var expData;

var trial;
var currentTrial = -1;
var currentTrialPractice = -1;
var currentTrialDemo = -1;
var demoOn = true;

var rt;
var checkResponse;
var presentNextTrialFun = "";
var presentStimuliFun = "";
var waitBeforeProbeFun = "";
var presentProbeFun = "";
var presentResponseFun = "";
var presentFeedbackFun = "";
var startStudyTime;
var startTrialsTime;

var initialCountDownOn = true;
var pause = "on";
var initialCountDownClock = 5;
var finalCountDownClock = 5;
var redirectTimer;

$(document).ready(function() {
	startStudyTime = new Date().getTime();
	$('#showInstructionsButton').hide();
	$('#experiment').hide();
	trials = generateTrials(true); //shuffle trials
    sampleTrials = generateTrials(false); //do not shuffle trials
    trialsDemo.push(sampleTrials[0], sampleTrials[43],  sampleTrials[85], sampleTrials[124]);
    trialsPractice.push(sampleTrials[85],  sampleTrials[127], sampleTrials[1], sampleTrials[44]);
    numTrials = trials.length;
    numTrialsDemo = trialsDemo.length;
    numTrialsPractice = trialsPractice.length;

    if (keyAssignment==0) {
        $('#keyInstructions').text("[A]=object\xa0\xa0\xa0\xa0\xa0[L]=empty");
        $('#keyForA').text("on the object, press 'A'");
        $('#keyForL').text("on empty space, press 'L'");
    } else {
        $('#keyInstructions').text("[A]=empty\xa0\xa0\xa0\xa0\xa0[L]=object");
        $('#keyForA').text("on empty space, press 'A'");
        $('#keyForL').text("on the object, press 'L'");
    }

	expDuration();
	// load all images before allowing subjects to continue
	$(window).load(function() {
		$('#waitLoadImages').hide();
		$('#showInstructionsButton').show();
	});

	// warn subjects before closing tab
	window.onbeforeunload = function (e) {
		e = e || window.event;

		// For IE and Firefox prior to version 4
		if (e) {
			e.returnValue = 'Are you sure you want to close this tab?';
    	}
		return 'Are you sure you want to close this tab?';
	};

});

function expDuration () {
    var expDuration = ((iti+stimulusDuration+rtEstimate+feedbackDuration) * (numTrials+numTrialsPractice))/60000; // estimate
    expDuration = expDuration.toFixed(2);
    $('#expDuration').text(expDuration);
    var minutes = Math.trunc(expDuration);
    var seconds = Math.ceil((expDuration % 1) * 60);
    console.log('expected duration (after reading instructions): ' + minutes + " minutes and " +  seconds + " seconds");
    expInfo.expectedDuration = expDuration;
    return
}

function generateTrials(shuffle) {

    var presentSides         = ["Left", "Right"];
    var probePositions       = ["NonEmpty", "Empty"];
    var probeSides           = ["Left", "Right"];
    var targetPositions      = [1,2,3,4]; // position in the 2x2 grid. Starting upper left cell and going clockwise
    var trials               = [];

    for (h = 0; h < drawingTypes.length; h++) {
        for (i = 0; i < targetPositions.length; i++) {
            for (j = 0; j < presentSides.length; j++) {
                for (k = 0; k < probePositions.length; k++) {
                    for (l = 0; l < probeSides.length; l++) {


                        if (k==1 & l==1) {
                            // force just 1 empty trial per stimulus type per location
                        } else {


                            var trial = {};

                            trial.targetStimulusType = drawingTypes[h];                                                         trial.targetPosition = targetPositions[i];
                            trial.targetPresentSide = presentSides[j];
                            trial.targetStimulus = trial.targetStimulusType + trial.targetPresentSide;

                            if (k == 0) {
                                // ensure if probe is on or absent object, both present and missing sides are probed
                                trial.probePosition = probePositions[k];
                                trial.probeSide = probeSides[l];

                            } else {
                                // if it's definitely on empty space, pick randomly Empty1 or Empty2 for each subject
                                trial.probePosition = probePositions[k]+emptyPosition;
                                trial.probeSide = "N/A";

                            }

                            if ((trial.targetPresentSide == trial.probeSide) && trial.probePosition == "NonEmpty") {
                                trial.probeType = "object";
                            } else if (((trial.targetPresentSide != trial.probeSide)) && trial.probePosition == "NonEmpty") {
                                trial.probeType = "absent";
                            } else {
                                trial.probeType = "empty";
                            }

                            trial.probeColor = "Red";
                            trial.correct = "";
                            trial.response = "";
                            trial.rt = "";

                            if (trial.probeType == "object") { // add an extra "on object" trial to balance things out and have 4 on object trials and 4 "empty" trials (half of which are on a "missing" part)
                                trials.push(trial);
                                let newTrial = JSON.parse(JSON.stringify(trial));
                                trials.push(newTrial);
                            } else {
                                trials.push(trial);
                            }
                        }
                    }
                }
            }
        }
    }

    if (shuffle == true) {
        Shuffle(trials)
    }

    for (i=0;i<trials.length;i++) {
        trials[i].trialNum = i + 1;
    }

    return trials;
}

function placeStimulus (position) {
    switch (position) {
        case 1:
            margin_left = "0px";
            margin_top = "0px";
            break;
        case 2:
            margin_left = "300px";
            margin_top = "0px";
            break;
        case 3:
            margin_left = "0px";
            margin_top = "300px";
            break;
        case 4:
            margin_left = "300px";
            margin_top = "300px";
            break;
    }

    var parameters = {
        margin_left: margin_left,
        margin_top: margin_top
    }

    return parameters
}

function placeProbe (position, stimulus, probePosition, probeSide, targetPresentSide) {

    switch (stimulus) {
        case "bicycle":
            switch (position) {
                case 1:
                    switch (probeSide){
                        case "Left":
                            margin_left = "34px";
                            margin_top = "192px";
                            break;
                        case "Right":
                            margin_left = "237px";
                            margin_top = "195px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "83px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "229px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 2:
                    switch (probeSide){
                        case "Left":
                            margin_left = "334px";
                            margin_top = "192px";
                            break;
                        case "Right":
                            margin_left = "537px";
                            margin_top = "195px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "83px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "229px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 3:
                    switch (probeSide){
                        case "Left":
                            margin_left = "34px";
                            margin_top = "492px";
                            break;
                        case "Right":
                            margin_left = "237px";
                            margin_top = "495px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "383px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "529px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 4:
                    switch (probeSide){
                        case "Left":
                            margin_left = "334px";
                            margin_top = "492px";
                            break;
                        case "Right":
                            margin_left = "537px";
                            margin_top = "495px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "383px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "529px";
                                    break;
                            }
                            break;
                    }
                    break;
            }
            break;
        case "butterfly":
            switch (position) {
                case 1:
                    switch (probeSide){
                        case "Left":
                            margin_left = "90px";
                            margin_top = "138px";
                            break;
                        case "Right":
                            margin_left = "184px";
                            margin_top = "138px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "58px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "248px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 2:
                    switch (probeSide){
                        case "Left":
                            margin_left = "390px";
                            margin_top = "138px";
                            break;
                        case "Right":
                            margin_left = "484px";
                            margin_top = "138px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "58px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "248px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 3:
                    switch (probeSide){
                        case "Left":
                            margin_left = "90px";
                            margin_top = "438px";
                            break;
                        case "Right":
                            margin_left = "184px";
                            margin_top = "438px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "358px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "548px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 4:
                    switch (probeSide){
                        case "Left":
                            margin_left = "390px";
                            margin_top = "438px";
                            break;
                        case "Right":
                            margin_left = "484px";
                            margin_top = "438px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "358px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "548px";
                                    break;
                            }
                            break;
                    }
                    break;
            }
            break;
        case "jacket":
            switch (position) {
                case 1:
                    switch (probeSide){
                        case "Left":
                            margin_left = "72px";
                            margin_top = "108px";
                            break;
                        case "Right":
                            margin_left = "203px";
                            margin_top = "108px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "25px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "249px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 2:
                    switch (probeSide){
                        case "Left":
                            margin_left = "372px";
                            margin_top = "108px";
                            break;
                        case "Right":
                            margin_left = "503px";
                            margin_top = "108px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "25px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "249px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 3:
                    switch (probeSide){
                        case "Left":
                            margin_left = "72px";
                            margin_top = "408px";
                            break;
                        case "Right":
                            margin_left = "203px";
                            margin_top = "408px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "138px";
                                    margin_top = "325px";
                                    break;
                                case "Empty2":
                                    margin_left = "138px";
                                    margin_top = "549px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 4:
                    switch (probeSide){
                        case "Left":
                            margin_left = "372px";
                            margin_top = "408px";
                            break;
                        case "Right":
                            margin_left = "503px";
                            margin_top = "408px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "438px";
                                    margin_top = "325px";
                                    break;
                                case "Empty2":
                                    margin_left = "438px";
                                    margin_top = "549px";
                                    break;
                            }
                            break;
                    }
                    break;
            }
            break;
        case "pants":
            switch (position) {
                case 1:
                    switch (probeSide){
                        case "Left":
                            margin_left = "108px";
                            margin_top = "153px";
                            break;
                        case "Right":
                            margin_left = "167px";
                            margin_top = "153px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "60px";
                                    margin_top = "110px";
                                    break;
                                case "Empty2":
                                    margin_left = "215px";
                                    margin_top = "110px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 2:
                    switch (probeSide){
                        case "Left":
                            margin_left = "408px";
                            margin_top = "153px";
                            break;
                        case "Right":
                            margin_left = "467px";
                            margin_top = "153px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "360px";
                                    margin_top = "110px";
                                    break;
                                case "Empty2":
                                    margin_left = "515px";
                                    margin_top = "110px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 3:
                    switch (probeSide){
                        case "Left":
                            margin_left = "108px";
                            margin_top = "453px";
                            break;
                        case "Right":
                            margin_left = "167px";
                            margin_top = "453px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "60px";
                                    margin_top = "410px";
                                    break;
                                case "Empty2":
                                    margin_left = "215px";
                                    margin_top = "410px";
                                    break;
                            }
                            break;
                    }
                    break;
                case 4:
                    switch (probeSide){
                        case "Left":
                            margin_left = "408px";
                            margin_top = "453px";
                            break;
                        case "Right":
                            margin_left = "467px";
                            margin_top = "453px";
                            break;
                        case "N/A":
                            switch (probePosition) {
                                case "Empty1":
                                    margin_left = "360px";
                                    margin_top = "410px";
                                    break;
                                case "Empty2":
                                    margin_left = "515px";
                                    margin_top = "410px";
                                    break;
                            }
                            break;
                    }
                    break;

            }
            break;
    }

    var parameters = {

        margin_left: margin_left,
        margin_top: margin_top
    }

    return parameters
}

function showInstructions() {

	openFullscreen();
	$('#showInstructionsButton').hide(); // hide fullScreen button
	$('#firstPage').hide(); // hide landing page
	$('#instructions1').show();
	$('#demoInstructions').show();
    $('#keyInstructions').show();
    $('#startDemoButton').show();
    $(".stimulus").hide();
}

function startDemo() {
	$('#startDemoButton').hide();
    $('#tooSlow').css('color','lightgray');
    $('#stimContainer').show();
	$('#instructions2').show();
	$('#demoTitle').show();
	$('#demoText').show();
	$('html,body').animate({
        scrollTop: $("#demoTitle").offset().top});
	setTimeout(nextTrial, 1000);
}

function clearAllTimeOuts () {
  clearTimeout(presentNextTrialFun);
	clearTimeout(presentStimuliFun);
  clearTimeout(waitBeforeProbeFun);
	clearTimeout(presentProbeFun);
	clearTimeout(presentResponseFun);
	clearTimeout(presentFeedbackFun);
}

function startPractice () {
	clearAllTimeOuts();
    demoOn = false;
    clearAllTimeOuts();
    startTrialsTime = new Date().getTime();
	$('.instructions').hide();
	$('#experiment').show();
	$('.practiceTrials').show();
	$('#practiceEnd').hide();
	$('html,body').scrollTop(0);
	$(".stimulus").hide();
	$(".keys").hide();
    $("#circleProbe").hide();
	$('#tooSlow').css('color','lightgray');
	$("#stimBox").css('border-color', 'black');
	$('#demoText').text(".");
	$('#demoText').css("color",'lightgray');
	currentTrialPractice = -1;
    clearAllTimeOuts();
    $("#initialCountDown").show();
    startTimer = setInterval(initialCountDown, 1000);
}

function initialCountDown () {
    initialCountDownClock--;

    if (initialCountDownClock == 0) {
        $("#initialCountDown").hide();
        initialCountDownOn = false;
        clearInterval(startTimer);
        setTimeout(nextTrial, 1500);
    } else {
        $('#initialCountDown').text((initialCountDownClock).toString());
    }
}

function startExperimentalTrials () {
    $('.practiceTrials').hide();
    $('.experimentalTrials').show();
    $('.feedbackLegends').show();
    $('.progress').show();
    $("#stimBox").show();
    setTimeout(nextTrial, 3000);
}

function nextTrial(){
    clearAllTimeOuts();
	$('#stimContainer').show();
	$(".stimulus").hide();
	$(".keys").hide();
	$('#tooSlow').css('color','lightgray');
	$("#stimBox").css('border-color', 'black');
	$('#demoText').text(".");
	$('#demoText').css("color",'lightgray');

  if (currentTrialPractice == (numTrialsPractice - 1)) {
		currentTrialPractice++;
		$("#practiceEnd").show();
		$("#stimBox").hide();
        $('#practiceText').hide();
        $('.feedbackLegends').hide();
	} else if ((currentTrial == numTrials/2 - 1) & (pause == "on")){
        $("#stimContainer").hide();
        $("#pause").show();
        pause = "off";
        document.addEventListener('keyup', listenKeyUp);
    } else if (currentTrial < numTrials - 1){
		$('#progressBar').css('width', (Math.ceil(((currentTrial+1)/(numTrials))*100)) + 'px');
        presentStimuliFun = setTimeout(presentStimuli,iti);

	} else if (currentTrial == (numTrials - 1)) {
		$('#main').hide();
		doneExperiment();
	}
}

function presentStimuli() {

    if (demoOn == true) {
		currentTrialDemo++

        if (currentTrialDemo == numTrialsDemo){
            currentTrialDemo = 0;
        }
        trial = trialsDemo[currentTrialDemo];

	} else if (currentTrialPractice < (numTrialsPractice - 1)) { // choose whether to present experimental or practice trials
	  currentTrialPractice++;
	  trial = trialsPractice[currentTrialPractice];
	} else {
	  currentTrial++;
	  trial = trials[currentTrial];
	}

    trial.targetParameters = placeStimulus (trial.targetPosition);

    $("#" + trial.targetStimulus).show();

    $("#" + trial.targetStimulus).css("margin-left", trial.targetParameters.margin_left);
    $("#" + trial.targetStimulus).css("margin-top", trial.targetParameters.margin_top);

    startStimulus = new Date().getTime();

    if (demoOn == true) {
        $('#demoText').text(stimuliTextDemo);
        $('#demoText').css('color', 'darkblue');
        presentProbeFun = setTimeout(presentProbe, stimulusDurationDemo);
    } else {
        presentProbeFun = setTimeout(presentProbe, stimulusDuration);
    }
}

function presentProbe() {

    trial.probeParameters = placeProbe (trial.targetPosition, trial.targetStimulusType, trial.probePosition, trial.probeSide, trial.targetPresentSide);
    $('#circleProbe').show();
    $('#circleProbe').css("margin-left", trial.probeParameters.margin_left);
    $('#circleProbe').css("margin-top", trial.probeParameters.margin_top);

	startProbe = new Date().getTime();
	if (demoOn == true) {
		$('#demoText').text(probeTextDemo);
		setTimeout(allowResponse,probeDurationDemo);
	} else {
		allowResponse();
	}
}

function allowResponse() {

//	trial.probePresentedTime = new Date().getTime() - startProbe;
	rt = new Date().getTime();
	if (demoOn == true) {

        $('.stimulus').hide();
        $('#circleProbe').hide();

		if (trial.probeType == 'object') {
            $('#demoText').text(responseTextDemo + " 'on object'");
            if (keyAssignment == 0) {
                $('#a-key').css('display','block');
            } else {
                $('#l-key').css('display','block');
            }
		} else  {
            $('#demoText').text(responseTextDemo + " 'empty'");
            if (keyAssignment == 0) {
                $('#l-key').css('display','block');
            } else {
                $('#a-key').css('display','block');
            }
		}

		presentFeedbackFun = setTimeout(feedback, maxResponseDurationDemo);
	} else {
		document.addEventListener('keydown', listenKeyDown);
    	checkResponse = setTimeout(waitForResponse, maxResponseDuration);
	}
}

function waitForResponse () {
    clearTimeout(checkResponse);
	if (trial.rt == "") {
		trial.rt = new Date().getTime() - rt;
		document.removeEventListener('keydown', listenKeyDown);
		responded('');
	}
}

function listenKeyDown (e){
	if (e.keyCode == 65 /* A */ || e.keyCode == 76 /* L */){
		trial.rt = new Date().getTime() - rt;
		document.removeEventListener('keydown', listenKeyDown);
		clearTimeout(checkResponse);
		responded(e.keyCode);
	}
}

function responded(resp){

    $('.stimulus').hide();
    $('#circleProbe').hide();

    // 0: A=object L=empty; 1: A=empty L=object
	if (resp === 65) { // A
        $('#a-key').css('display','block');
		if (keyAssignment == 0) {
            trial.response = 'object';
        } else {
            trial.response = 'empty';
        }

	} else if (resp === 76) { // L
        $('#l-key').css('display','block');
        if (keyAssignment == 0) {
            trial.response = 'empty';
        } else {
            trial.response = 'object';
        }

	} else {
		trial.response = 'slow';
	}

    console.log('trial: ' + trial.trialNum);
	console.log('rt: ' + trial.rt);
    console.log('response: ' + trial.response);
    console.log('probe on: ' + trial.probeType);

	if (trial.response == "object" && trial.probeType == "object") {
        trial.correct = true;
		console.log("correct response");
	} else if (trial.response == "empty" && trial.probeType != "object") { // not-object includes empty and absent probes
        trial.correct = true;
		console.log("correct response");
    } else {
        trial.correct = false;
		console.log("incorrect response");
	}

	feedback();
}

function feedback() {

	if (demoOn == true) {
		trial.correct = true;
        $(".keys").hide();
		$('#demoText').text(feedbackTextDemo);
        var demoText = document.getElementById("demoText"),
        keys = ["green", "correct", "red", "wrong"];
        demoText.innerHTML = demoText.innerHTML.replace( new RegExp("\\b"+keys[0]+"\\b","g"),"<span style='color:darkgreen'>" + keys[0] + "</span>")
        demoText.innerHTML = demoText.innerHTML.replace( new RegExp("\\b"+keys[1]+"\\b","g"),"<span style='color:darkgreen'>" + keys[1] + "</span>")
        demoText.innerHTML = demoText.innerHTML.replace( new RegExp("\\b"+keys[2]+"\\b","g"),"<span style='color:darkred'>" + keys[2] + "</span>")
        demoText.innerHTML = demoText.innerHTML.replace( new RegExp("\\b"+keys[3]+"\\b","g"),"<span style='color:darkred'>" + keys[3] + "</span>")
	}

    if (trial.correct) {
        $("#stimBox").css('border-color', feedbackCorrect);
	} else { // if incorrect response
		$("#stimBox").css('border-color', feedbackIncorrect);
		if (trial.response === 'slow') { // no response
			$('#tooSlow').css('color', feedbackIncorrect);
		}
	}

	if (demoOn == true) {
		presentNextTrialFun = setTimeout(nextTrial, feedbackDurationDemo);
	} else {
		document.addEventListener('keyup', listenKeyUp);
	}
}

function listenKeyUp(e){

	if (trial.trialNum == numTrials/2 & pause == "off") {

        if (e.keyCode == 32 /*spacebar*/){
			document.removeEventListener('keyup', listenKeyUp);
            $(".stimulus").hide();
            $("#circleProbe").hide();
            $("#pause").hide();
            $("#stimContainer").show();
            presentNextTrialFun = setTimeout(nextTrial, feedbackDuration);
		}
    } else if (trial.response === 'slow') {
		if (e.keyCode == 32 /*spacebar*/){
			document.removeEventListener('keyup', listenKeyUp);
            presentNextTrialFun = setTimeout(nextTrial, feedbackDuration);
		}
	} else {
		document.removeEventListener('keyup', listenKeyUp);
		presentNextTrialFun = setTimeout(nextTrial, feedbackDuration);
	}
}

function assignExperimentInfo() {
//record things like the name of the experiment, the browser information, etc.
    [expInfo.prolificPID, expInfo.studyID, expInfo.sessionID] = getProlificInfo();

	//browserInfo
	var browserInfo = getBrowser();
	expInfo.browserName = browserInfo[0];
	expInfo.browserVersion = browserInfo[1];

	//displayInfo
	expInfo.windowHeight = $(window).height();
	expInfo.windowWidth = $(window).width();
	expInfo.screenHeight = screen.height;
	expInfo.screenWidth = screen.width;
	expInfo.allTrialsDuration = new Date().getTime() - startTrialsTime;
	expInfo.studyDuration = new Date().getTime() - startStudyTime;

    //conditions
    if (keyAssignment == 0) { //0: A=object L=empty; 1: A=empty L=object
        expInfo.keyAssignment = "A=object L=empty";
    } else {
        expInfo.keyAssignment = "A=empty L=object";
    }
    //timings
    expInfo.iti = iti;
    expInfo.stimulusDuration = stimulusDuration;
    expInfo.maxResponseDuration = maxResponseDuration;
    expInfo.feedbackDuration = feedbackDuration;
    expInfo.rtEstimate = rtEstimate;
}

function doneExperiment() {
    $('#main').hide();
	$('#doneText').show();
}

function submit() {
    expInfo.comments = $("#commentBox").val();
    assignExperimentInfo();
    var expData = [trials, expInfo];

    // This lines if code actually save data in the server, which is disabled in

   /*  setTimeout(function(){ // wait to save to prevent losing data
        $.post("log_trials_prolific.py", {
		prolificPID: expInfo.prolificPID,
        studyID: expInfo.studyID,
        sessionID: expInfo.sessionID,
		expData: JSON.stringify(expData)});
        }, 100);

    setTimeout(function(){ // overwrite just to be super sure data is saved; might result in duplicate files
        $.post("log_trials_prolific.py", {
		prolificPID: expInfo.prolificPID,
        studyID: expInfo.studyID,
        sessionID: expInfo.sessionID,
		expData: JSON.stringify(expData)});
        }, 1); */

    $('#urlProlific').text(urlProlific);
    $('#doneText').hide();
    $('#submitPage').show();
    window.onbeforeunload = null;
    redirectTimer = setInterval(finalCountDown, 1000);

}

function finalCountDown () {
    finalCountDownClock--;

    if (finalCountDownClock < 0) {
        clearInterval(redirectTimer);
        window.location = urlProlific;
    } else {
        $('#finalCountDown').text((finalCountDownClock).toString());
    }

}
