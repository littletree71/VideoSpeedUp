updateInputValue();

/*=========================================
 Global Function
=========================================*/
// Change Color, send message to background transfer to content
//  (string) color
function changeColor(color) {
    chrome.runtime.sendMessage({
        name: "changeColor",
        from: "popup",
        value: color
    })
}

// Change speed, send message to background
//  (string) speed
function changeSpeed(speed) {
    chrome.runtime.sendMessage({
        name: "changeSpeed",
        from: "popup",
        value: speed
    })
}

// Add iframe, send message to background transfer to content
//  (string) addIframe
function addIframe() {
    chrome.runtime.sendMessage({
        name: "addIframe",
        from: "popup",
        value: true
    })
}
// Get help, use alert show shortkey and other information
function getHelp() {
    var help = "Change show-up speed color by button\n" + "Shortkeys: \n" + "\t w\t| Show/Fade speed\n" + "\t a\t| Speed up\n" + "\t s\t| Reset speed\n" + "\t d\t| Speed down\n";
    alert(help);
}

// Update InputValue, when js execute
function updateInputValue() {
    chrome.storage.sync.get('VSU_Speed', function(data) {
        console.log("The speed in stroage:" + data.VSU_Speed);
        document.getElementById("Speed").value = data.VSU_Speed;
    })
}

/*=========================================
 EventListener for object
=========================================*/

// Color box onclick
document.getElementById("box_1").onclick = function() {
    changeColor("white");
}
document.getElementById("box_2").onclick = function() {
    changeColor("black");
}
document.getElementById("box_3").onclick = function() {
    changeColor("#333");
}

// speed inputbox onchange
var tms;
document.getElementById("Speed").onchange = function() {
    // Speed from 0.1~20
    speed = document.getElementById('Speed').value;
    if (parseFloat(speed) <= 10 && parseFloat(speed) >= 0.1) {
        // Send message to background, change speed
        clearTimeout(tms);
        tms = setTimeout(function() {
            changeSpeed(String(parseFloat(document.getElementById('Speed').value).toFixed(1)));
        }, 500);
    }
    // Out of speed range
    if (parseFloat(speed) > 10) {
        speed = "10.0";
    }
    if (parseFloat(speed) < 0.1) {
        speed = "0.1";
    }
}

// speed reset button onclick
document.getElementById("btn_Default").onclick = function() {
    document.getElementById('Speed').value = "1.0";
    changeSpeed("1.0");
}

// add Iframe button onclick
document.getElementById("btn_Insert").onclick = function() {
    addIframe();
}

// help button onclick
document.getElementById("btn_Help").onclick = function() {
    getHelp();
}
