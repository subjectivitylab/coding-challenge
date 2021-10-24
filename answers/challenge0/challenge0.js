$(document).ready(function() {
    
    var dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());

});

function addCity() {
    var city = $("#cityBox").val();    
    $("#citySentence").html("Jorge was born in " + city + ". ");

    dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
}

var nightModeStatus = false; // false = off true = on
function nightMode() {
    if (nightModeStatus == false) {
        $("#nightModeButton").css("background-color","white");
        $("#nightModeButton").css("color","black");
        $("#nightModeButton").html("Day mode");
        $("body").css("background-color","black");
        $("body").css("color","white");
        nightModeStatus = true;
    } else if (nightModeStatus == true) {
        $("#nightModeButton").css("background-color", "white");
        $("#nightModeButton").css("color","black");
        $("#nightModeButton").html("Night mode");
        $("body").css("background-color","white");
        $("body").css("color","black");
        nightModeStatus = false;
    }
    
    dt = new Date();
    $("#currentDateTime").html(dt.toLocaleDateString() + " " + dt.toLocaleTimeString());
}
