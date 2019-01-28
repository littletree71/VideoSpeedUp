/*=========================================
 Global variable
=========================================*/
var running = false;

/*=========================================
 Global function
=========================================*/

// Add Iframe, send message to current tab to add Iframe
function addIframe() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "addIframe",
            from: "background",
            value: true
        });
    });
}


// Change speed, execute script to current tab
//      change its playbackRate
// (string) speed
function changeSpeed(speed) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(avtiveTabs) {
        chrome.tabs.executeScript(avtiveTabs[0].id, {
            code: "document.getElementsByTagName('video')[0].playbackRate = " + String(speed)
        });
    });
}

// Change color, send message to current tab to change color
// (string) color
function changeColor(color) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "changeColor",
            from: "background",
            value: color
        });
    });
}

// Update stroage, according to attribute update the value
// (string) attr, (string) value
function updateStorage(attr, value) {
    if (attr == "Color") {
        chrome.storage.sync.get('VSU_Color', function(data) {
            var color = data.VSU_Color;
            console.log('The color in storage: ' + color);
            chrome.storage.sync.set({
                VSU_Color: value
            }, function() {
                console.log('The color in storage updated: ' + value);
            });
        })
    }
    if (attr == "Speed") {
        chrome.storage.sync.get('VSU_Speed', function(data) {
            var speed = data.VSU_Speed;
            console.log('The speed in storage: ' + speed);
            chrome.storage.sync.set({
                VSU_Speed: value
            }, function() {
                console.log('The speed in storage updated: ' + value);
            });
        })
    }
}

// Display number, send message to 
// (string) number
function displayNumber(number) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "displayNumber",
            from: "background",
            value: number
        });
    });
}

//

// Add App
// function addAPP() {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {
//             name: "start",
//             from: "bg",
//             content: true
//         });
//     });
//     running = true;
// }
// Send message to content
// Remove app
// function removeAPP() {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {
//             name: "start",
//             from: "bg",
//             content: false
//         });
//     });
//     running = false;
// }

// Send message to content
// Change speed
// function changeSpeed(speed) {
//     chrome.tabs.query({
//         active: true,
//         currentWindow: true
//     }, function(avtiveTabs) {
//         chrome.tabs.executeScript(avtiveTabs[0].id, {
//             code: "document.getElementsByTagName('video')[0].playbackRate = " + String(speed)
//         });
//     });
// }

// updateIcon, trigger when icon be clicked
// function updateIcon() {
//     chrome.storage.sync.get('filename', function(data) {
//         var current = data.filename;
//         chrome.browserAction.setIcon({
//             path: 'icon' + current + '.png'
//         });
//         // next
//         if (running) {
//             current = "stop";
//         } else {
//             current = "running";
//         }
//         chrome.storage.sync.set({
//             filename: current
//         }, function() {
//             console.log('The file is set to use' + current + ".png");
//         });
//     });
// }

/*=========================================
 Event Listerner
=========================================*/

// onInstalled, set storage
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        VSU_Color: "white",
        VSU_Speed: "1.0"
    }, function() {
        console.log('Set VSU_Speed: white, Set VSU_Color: 1.0');
    });
});

// onUpdated, addIframe and changeSpeed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    // add iframe
    addIframe();
    // chagne speed
    chrome.storage.sync.get('VSU_Speed', function(data) {
        console.log("The speed in stroage:" + data.VSU_Speed);
        changeSpeed(data.VSU_Speed);
        displayNumber(data.VSU_Speed);
    })
})

// onMessage, insert iframe, speed change, color change
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log("message from " + message.from + ", name " + message.name + ",value " + message.value);
    if (message.from == "popup") {
        if (message.name == "changeSpeed") {
            speed = message.value;
            changeSpeed(speed);
            updateStorage("Speed", speed);
            displayNumber(speed);
        }
        if (message.name == "changeColor") {
            color = message.value;
            updateStorage("Color", color);
            changeColor(color)
            chrome.storage.sync.get('VSU_Speed', function(data) {
                displayNumber(data.VSU_Speed);
            })
        }
        if (message.name == "addIframe") {
            addIframe();
        }
    }
    if (message.from == "content") {
        if (message.name == "changeSpeed") {
            chrome.storage.sync.get('VSU_Speed', function(data) {
                speed = data.VSU_Speed;
                speed = parseFloat(speed);
                value = message.value;
                switch (value) {
                case "Up":
                    if (!isNaN(speed)) {
                        if (speed < 20) {
                            speed = String((speed + 0.1).toFixed(1));
                            updateStorage("Speed", speed);
                            changeSpeed(speed);
                            displayNumber(speed);
                        }
                    }
                    break;
                case "Down":
                    if (!isNaN(speed)) {
                        if (speed > 0.1) {
                            speed = String((speed - 0.1).toFixed(1));
                            updateStorage("Speed", speed);
                            changeSpeed(speed);
                            displayNumber(speed);
                        }
                    }
                    break;
                case "Reset":
                    if (!isNaN(speed)) {
                        speed = "1.0";
                        updateStorage("Speed", speed);
                        changeSpeed(speed);
                        displayNumber(speed);
                    }
                    break;
                }
            })
        }
    }

});

// icon
// chrome.browserAction.onClicked.addListener(function() {//     if (!running) {
// //         addAPP();
// //     } else {
// //         removeAPP();
// //     }
// })

// install
// chrome.runtime.onInstalled.addListener(function() {
//     chrome.storage.sync.set({
//         filename: "stop",
//         nowSpeed: "1.0"
//     }, function() {
//         console.log('The filename is set to stop.');
//     });
// });
// tabs update
// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//     if (running) {
//         //         console.log(changeInfo.status);
//         addAPP();
//         chrome.storage.sync.get('nowSpeed', function(data) {
//             console.log("speed in stroage:" + data.nowSpeed);
//             changeSpeed(data.nowSpeed);
//         })
//     }
// })

// chrome.browserAction.onClicked.addListener(updateIcon);

/*=========================================
 Message
=========================================*/
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     switch (message.name) {
//         // from inject to content
//     case "changeSpeed":
//         console.log(message.content)
//         var speed = parseFloat(message.content);
//         if (!isNaN(speed)) {
//             chrome.storage.sync.set({
//                 nowSpeed: message.content
//             })
//             // send to content
//             changeSpeed(message.content);
//         }
//         break;
//         // from content to inject        
//     case "displayNumber":
//         displayNumber(message.content)
//         break;
//     case "insertApp":
//         addAPP();
//         break;
//     case "speedUp":
//         chrome.storage.sync.get('nowSpeed', function(data) {
//             var current = data.nowSpeed;
//             if (parseFloat(current) < 20) {
//                 current = String((parseFloat(current) + 0.1).toFixed(1));
//                 changeSpeed(current);
//                 displayNumber(current);
//                 chrome.storage.sync.set({
//                     nowSpeed: current
//                 });
//             }
//         });
//         break;
//     case "speedDown":
//         chrome.storage.sync.get('nowSpeed', function(data) {
//             var current = data.nowSpeed;
//             if (parseFloat(current) > 0.1) {
//                 current = String((parseFloat(current) - 0.1).toFixed(1));
//                 changeSpeed(current);
//                 displayNumber(current);
//                 chrome.storage.sync.set({
//                     nowSpeed: current
//                 });
//             }
//         });
//         break;
//     case "speedDefault":
//         chrome.storage.sync.set({
//             nowSpeed: "1.0"
//         });
//         changeSpeed(1.0);
//         displayNumber(1.0);
//         break;
//     case "changeColor":
//         chrome.tabs.query({
//             active: true,
//             currentWindow: true
//         }, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {
//                 name: "changeColor",
//                 from: "bg",
//                 content: message.content
//             });
//         });
//         break;

//     }

// });

/*=========================================
 Init
=========================================*/
// updateIcon();
