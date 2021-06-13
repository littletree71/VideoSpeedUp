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
            code: ` if(document.getElementsByTagName('video').length != 0){
                        document.getElementsByTagName('video')[0].playbackRate = ${speed};
                    }`
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
    //addIframe();
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
                        if (speed < 10) {
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
