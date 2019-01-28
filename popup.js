/*=========================================
 Initial
=========================================*/
chrome.storage.sync.get('VSU_Speed', function(data) {
    var tmp = parseFloat(data.VSU_Speed);
    document.getElementById("Speed").value = (tmp).toFixed(1);
})
/*=========================================
 Change speed
=========================================*/
function speedDefault() {
    document.getElementById("Speed").value = "1.0";
    document.getElementById("Speed").dispatchEvent(new Event('change'));
}
function speedUp() {
    var tmp = parseFloat(document.getElementById("Speed").value);
    if (tmp < 20) {
        document.getElementById("Speed").value = (tmp + 0.1).toFixed(1);
        document.getElementById("Speed").dispatchEvent(new Event('change'));
    }
}
function speedDown() {
    var tmp = parseFloat(document.getElementById("Speed").value);
    if (tmp > 0.1) {
        document.getElementById("Speed").value = (tmp - 0.1).toFixed(1);
        document.getElementById("Speed").dispatchEvent(new Event('change'));
    }
}

/*=========================================
 EventListener
=========================================*/
var tms;
document.getElementById("Speed").onchange = function() {
    // Speed from 0.1~20
    if (parseFloat(this.value) <= 20 && parseFloat(this.value) >= 0.1) {
        // Send message to background, transfer to content
        chrome.runtime.sendMessage({
            name: "displayNumber",
            content: document.getElementById("Speed").value
        });
        // Send message to background, change speed
        clearTimeout(tms);
        tms = setTimeout(function() {
            chrome.runtime.sendMessage({
                name: "changeSpeed",
                content: document.getElementById("Speed").value
            });

        }, 1000);
    }
    // Out of speed range
    if (parseFloat(this.value) > 20) {
        this.value = "20.0";
    }
    if (parseFloat(this.value) < 0.1) {
        this.value = "0.1";
    }
}

document.getElementById("box_1").onclick = function(){
    chrome.runtime.sendMessage({
        name:"changeColor",
        content: "white"
    });
}
document.getElementById("box_2").onclick = function(){
    chrome.runtime.sendMessage({
        name:"changeColor",
        content: "black"
    });
}

// Set speed to default
document.getElementById("btn_Default").onclick = function() {
    speedDefault();
}
document.getElementById("btn_Insert").onclick = function() {
    chrome.runtime.sendMessage({
        name: "insertApp",
        content: "addAPP"
    });
}

// Get message from content then trigger speed function
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.from == "content") {
        switch (message.content) {
        case "speedDown":
            speedDown();
            break;
        case "speedDefault":
            speedDefault();
            break;
        case "speedUp":
            speedUp();
            break;
        }
    }
})
