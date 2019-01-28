/*=========================================
 Global variable
=========================================*/

var mySpeedLabel = document.createElement("div");
mySpeedLabel.id = "VSU_SpeedLabel";
mySpeedLabel.innerText = "1.0";
mySpeedLabel.style.position = "absolute";
mySpeedLabel.style.left = "50%";
mySpeedLabel.style.color = "white";
mySpeedLabel.style.opacity = 0;
mySpeedLabel.style.transform = "translateX(-50%) translateY(-50%)";
mySpeedLabel.style.visibility = "visible";
// mySpeedLabel.style.visibility = "hidden";
// mySpeedLabel.style.transition = "opacity 0.5s linear"

var timer = setTimeout(function() {}, 100);
var runningflag = false;

/*=========================================
 Global function
=========================================*/

// addIframe
function addIframe() {
    height = document.getElementsByTagName('video')[0].style.height;
    width = document.getElementsByTagName('video')[0].style.width;
    // if there is not height, width get parent's 
    if (height == "") {
        height = document.getElementsByTagName('video')[0].offsetHeight;
    }
    if (width == "") {
        width = document.getElementsByTagName('video')[0].offsetWidth;
    }

    // Add mySpeedLabel
    mySpeedLabel.style.top = String(parseFloat(height) / 2) + "px";
    mySpeedLabel.style.fontSize = String(parseFloat(height) / 3) + "px";
    document.getElementsByTagName('video')[0].parentElement.appendChild(mySpeedLabel);
}

// show up and fade out
function showUp(opacity) {
    //     mySpeedLabel.style.visibility = "visible";
    mySpeedLabel.style.transition = "";
    mySpeedLabel.style.opacity = opacity;

}
function fadeOut(delayTime) {
    mySpeedLabel.style.transition = "opacity 0.5s linear";
    timer = setTimeout(function() {
        mySpeedLabel.style.opacity = "0";
    }, delayTime);
}

// changeSpeed, send message to background
// value
function changeSpeed(value) {
    chrome.runtime.sendMessage({
        name: "changeSpeed",
        from: "content",
        value: value
    })
}

function changeNumber(number) {
    mySpeedLabel.innerText = number + "x";
}

// ChangeColor
function changeColor(color) {
    mySpeedLabel.style.color = color;
}

/*=========================================
 Event Listerner
=========================================*/

// Shortcuts, changeSpeed, showUp/fadeOut
document.body.addEventListener("keydown", function(event) {
    // a: speedDown
    // s: speedDefault
    // d: speedUp
    // w: display/ hidden speed
    if (event.key == "a") {
        changeSpeed("Down");
    }
    if (event.key == "s") {
        changeSpeed("Reset");
    }
    if (event.key == "d") {
        changeSpeed("Up");
    }
    if (event.key == "w") {
        if (mySpeedLabel.style.opacity > 0) {
            fadeOut(200);
        } else {
            showUp("0.8");
        }
    }
});


// OnMessage
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "background") {
        console.log(message.name);
        switch (message.name) {
        case "addIframe":
            if(mySpeedLabel.parentElement == null){
                addIframe();    
            }
            showUp("0.8");
            fadeOut(2000);
            break;
        case "displayNumber":
            number = message.value;
            changeNumber(number);
            showUp("0.8");
            fadeOut(2000);
            break;
        case "changeColor":
            color = message.value;
            changeColor(color);
            showUp("0.8");
            fadeOut(2000);
            break;
        }
    }
})

// document.body.addEventListener("keydown", function(event) {
//     // z:speedDown
//     // x:speedDefault
//     // c:speedUp
//     if (event.key == "z") {
//         chrome.runtime.sendMessage({
//             name: "speedDown",
//             from: "content",
//             content: "speedDown"
//         });
//     }
//     if (event.key == "x") {
//         chrome.runtime.sendMessage({
//             name: "speedDefault",
//             from: "content",
//             content: "speedDefault"
//         });
//     }
//     if (event.key == "c") {
//         chrome.runtime.sendMessage({
//             name: "speedUp",
//             from: "content",
//             content: "speedUp"
//         });
//     }
// });

// Message
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     // Get message from background
//     switch (message.name) {
//     case "start":
//         // Init, add iframe or remove
//         if (message.content) {
//             height = document.getElementsByTagName('video')[0].style.height;
//             if (height == "") {
//                 height = document.getElementsByTagName('video')[0].offsetHeight;
//             }
//             width = document.getElementsByTagName('video')[0].style.width;
//             if (width == "") {
//                 width = document.getElementsByTagName('video')[0].offsetWidth;
//             }

//             // Add mySpeedLabel
//             mySpeedLabel.style.top = String(parseFloat(height) / 2) + "px";
//             mySpeedLabel.style.fontSize = String(parseFloat(height) / 3) + "px";
//             document.getElementsByTagName('video')[0].parentElement.appendChild(mySpeedLabel);
//         } else {
//             // Remove myIframe and mySpeedLabel
//             if (document.getElementById('mylabel') != null) {
//                 setTimeout(function() {
//                     document.getElementById('mylabel').remove();
//                 }, 400);
//             }
//         }
//         break;
//     case "changeSpeed":
//         // Set Video Tag playbackRate
//         //         console.log(message.from);
//         if (message.from == "bg") {
//             var speed = parseFloat(message.content);
//             // Bug, message can't be discriminated from where. Have to re-organize message
//             if (!isNaN(speed)) {
//                 document.getElementsByTagName('video')[0].playbackRate = speed;
//             }
//             setTimeout(myIframe.style.opacity = "0", 500);
//         }
//         break;
//     case "display":
//         // Get message from inject, which transfer at background
//         // Display the Label when use shortkey
//         mySpeedLabel.style.visibility = "visible";
//         mySpeedLabel.style.opacity = "1";
//         var speed = parseFloat(message.content).toFixed(1);
//         // Bug
//         if (!isNaN(speed)) {
//             mySpeedLabel.innerText = String(speed) + "x";
//         }
//         // Delay label be hidden
//         timer = setTimeout(function() {
//             mySpeedLabel.style.opacity = "0";
//         }, 2000);
//         break;
//     case "changeColor":
//         mySpeedLabel.style.visibility = "visible";
//         mySpeedLabel.style.opacity = "1";
//         mySpeedLabel.style.color = message.content;
//         timer = setTimeout(function() {
//             mySpeedLabel.style.opacity = "0";
//         }, 2000);
//         break;
//     }

// });
