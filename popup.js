updateInputValue();

/*=========================================
 Global Function
=========================================*/
// Change Color, send message to background transfer to content
//  (string) color
function changeColor(color){
    chrome.runtime.sendMessage({
        name: "changeColor",
        from: "popup",
        value: color
    })
}

// Change speed, send message to background
//  (string) speed
function changeSpeed(speed){
    chrome.runtime.sendMessage({
        name: "changeSpeed",
        from: "popup",
        value: speed
    })
}

// Add iframe, send message to background transfer to content
//  (string) addIframe
function addIframe(){
    chrome.runtime.sendMessage({
        name: "addIframe",
        from: "popup",
        value: true
    })
}
// Get help, use alert show shortkey and other information
function getHelp(){
    var help = "Change show-up speed color by button\n" +
        "Shortkeys: \n" +
        "\t w\t| Show/Fade speed\n" +
        "\t a\t| Speed up\n" +
        "\t s\t| Reset speed\n" +
        "\t d\t| Speed down\n";
    alert(help);
}

// Update InputValue, when js execute
function updateInputValue(){
    chrome.storage.sync.get('VSU_Speed', function(data) {
        console.log("The speed in stroage:" + data.VSU_Speed);
        document.getElementById("Speed").value = data.VSU_Speed;
    })
}



/*=========================================
 EventListener for object
=========================================*/

// Color box onclick
document.getElementById("box_1").onclick = function(){
    changeColor("white");
}
document.getElementById("box_2").onclick = function(){
    changeColor("black");
}
document.getElementById("box_3").onclick = function(){
    changeColor("#333");
}

// speed inputbox onchange
var tms;
document.getElementById("Speed").onchange = function() {
    // Speed from 0.1~20
    speed = document.getElementById('Speed').value;
    if (parseFloat(speed) <= 20 && parseFloat(speed) >= 0.1) {
        // Send message to background, change speed
        clearTimeout(tms);
        tms = setTimeout(function() {
            changeSpeed(document.getElementById('Speed').value);
        }, 500);
    }
    // Out of speed range
    if (parseFloat(speed) > 20) {
        speed = "20.0";
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
document.getElementById("btn_Help").onclick = function(){
    getHelp();
}



// /*=========================================
//  Initial
// =========================================*/
// chrome.storage.sync.get('VSU_Speed', function(data) {
//     var tmp = parseFloat(data.VSU_Speed);
//     document.getElementById("Speed").value = (tmp).toFixed(1);
// })
// /*=========================================
//  Change speed
// =========================================*/
// function speedDefault() {
//     document.getElementById("Speed").value = "1.0";
//     document.getElementById("Speed").dispatchEvent(new Event('change'));
// }
// function speedUp() {
//     var tmp = parseFloat(document.getElementById("Speed").value);
//     if (tmp < 20) {
//         document.getElementById("Speed").value = (tmp + 0.1).toFixed(1);
//         document.getElementById("Speed").dispatchEvent(new Event('change'));
//     }
// }
// function speedDown() {
//     var tmp = parseFloat(document.getElementById("Speed").value);
//     if (tmp > 0.1) {
//         document.getElementById("Speed").value = (tmp - 0.1).toFixed(1);
//         document.getElementById("Speed").dispatchEvent(new Event('change'));
//     }
// }

// /*=========================================
//  EventListener
// =========================================*/
// var tms;
// document.getElementById("Speed").onchange = function() {
//     // Speed from 0.1~20
//     if (parseFloat(this.value) <= 20 && parseFloat(this.value) >= 0.1) {
//         // Send message to background, transfer to content
//         chrome.runtime.sendMessage({
//             name: "displayNumber",
//             content: document.getElementById("Speed").value
//         });
//         // Send message to background, change speed
//         clearTimeout(tms);
//         tms = setTimeout(function() {
//             chrome.runtime.sendMessage({
//                 name: "changeSpeed",
//                 content: document.getElementById("Speed").value
//             });

//         }, 1000);
//     }
//     // Out of speed range
//     if (parseFloat(this.value) > 20) {
//         this.value = "20.0";
//     }
//     if (parseFloat(this.value) < 0.1) {
//         this.value = "0.1";
//     }
// }

// document.getElementById("box_1").onclick = function(){
//     chrome.runtime.sendMessage({
//         name:"changeColor",
//         content: "white"
//     });
// }
// document.getElementById("box_2").onclick = function(){
//     chrome.runtime.sendMessage({
//         name:"changeColor",
//         content: "black"
//     });
// }

// // Set speed to default
// document.getElementById("btn_Default").onclick = function() {
//     speedDefault();
// }
// document.getElementById("btn_Insert").onclick = function() {
//     chrome.runtime.sendMessage({
//         name: "insertApp",
//         content: "addAPP"
//     });
// }

// // Get message from content then trigger speed function
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     if (message.from == "content") {
//         switch (message.content) {
//         case "speedDown":
//             speedDown();
//             break;
//         case "speedDefault":
//             speedDefault();
//             break;
//         case "speedUp":
//             speedUp();
//             break;
//         }
//     }
// })
