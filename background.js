/*=========================================
 Global variable
=========================================*/
var running = false;

/*=========================================
 Global function
=========================================*/
// Send message to content
// Add App
function addAPP() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "start",
            from: "bg",
            content: true
        });
    });
    running = true;
}
// Send message to content
// Remove app
function removeAPP() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "start",
            from: "bg",
            content: false
        });
    });
    running = false;
}
// Send message to content
// Change speed
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
// updateIcon, trigger when icon be clicked
function updateIcon() {
    chrome.storage.sync.get('filename', function(data) {
        var current = data.filename;
        chrome.browserAction.setIcon({
            path: 'icon' + current + '.png'
        });
        // next
        if (running) {
            current = "stop";
        } else {
            current = "running";
        }
        chrome.storage.sync.set({
            filename: current
        }, function() {
            console.log('The file is set to use' + current + ".png");
        });
    });
}
/*=========================================
 Event Listerner
=========================================*/
// icon
chrome.browserAction.onClicked.addListener(function() {//     if (!running) {
//         addAPP();
//     } else {
//         removeAPP();
//     }
})
// install
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({
        filename: "stop",
        nowSpeed: "1.0"
    }, function() {
        console.log('The filename is set to stop.');
    });
});
// tabs update
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (running) {
        //         console.log(changeInfo.status);
        addAPP();
        chrome.storage.sync.get('nowSpeed', function(data) {
            console.log("speed in stroage:" + data.nowSpeed);
            changeSpeed(data.nowSpeed);
        })
    }
})
chrome.browserAction.onClicked.addListener(updateIcon);

function displayNumber(number) {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
            name: "display",
            from: "bg",
            content: String(number)
        });
    });
}

/*=========================================
 Message
=========================================*/
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.name) {
        // from inject to content
    case "changeSpeed":
        console.log(message.content)
        var speed = parseFloat(message.content);
        if (!isNaN(speed)) {
            chrome.storage.sync.set({
                nowSpeed: message.content
            })
            // send to content
            changeSpeed(message.content);
        }
        break;
        // from content to inject        
    case "displayNumber":
        displayNumber(message.content)
        break;
    case "insertApp":
        addAPP();
        break;
    case "speedUp":
        chrome.storage.sync.get('nowSpeed', function(data) {
            var current = data.nowSpeed;
            if (parseFloat(current) < 20) {
                current = String((parseFloat(current) + 0.1).toFixed(1));
                changeSpeed(current);
                displayNumber(current);
                chrome.storage.sync.set({
                    nowSpeed: current
                });
            }
        });
        break;
    case "speedDown":
        chrome.storage.sync.get('nowSpeed', function(data) {
            var current = data.nowSpeed;
            if (parseFloat(current) > 0.1) {
                current = String((parseFloat(current) - 0.1).toFixed(1));
                changeSpeed(current);
                displayNumber(current);
                chrome.storage.sync.set({
                    nowSpeed: current
                });
            }
        });
        break;
    case "speedDefault":
        chrome.storage.sync.set({
            nowSpeed: "1.0"
        });
        changeSpeed(1.0);
        displayNumber(1.0);
        break;
    case "changeColor":
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                name: "changeColor",
                from: "bg",
                content: message.content
            });
        });
        break;

    }

});

/*=========================================
 Init
=========================================*/
updateIcon();
