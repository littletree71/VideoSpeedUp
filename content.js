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
mySpeedLabel.style.zIndex = "99999";

var timer = setTimeout(function() {}, 100);



autoAddIframe();
/*=========================================
 Global function
=========================================*/

// addIframe
function addIframe() {
    if(document.getElementsByTagName('video').length != 0){
    	if(document.getElementsByTagName('video')[0].parentElement.children.VSU_SpeedLabel != undefined){
    		document.getElementsByTagName('video')[0].parentElement.removeChild(mySpeedLabel);
    	}
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
}

// show up and fade out
function showUp(opacity) {
    //     mySpeedLabel.style.visibility = "visible";
    mySpeedLabel.style.transition = "";
    mySpeedLabel.style.opacity = opacity;
    mySpeedLabel.style.visibility = "visible";
}
function fadeOut(delayTime) {
    mySpeedLabel.style.transition = "opacity 0.5s linear";
    timer = setTimeout(function() {
        mySpeedLabel.style.opacity = "0";
        mySpeedLabel.style.visibility = "hidden";
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

// autoAddIframe
function autoAddIframe(){
    timer = setInterval(function(){
        if(document.getElementById("VSU_SpeedLabel") == null || mySpeedLabel.style.fontSize == "0px"){
            if(document.getElementsByTagName('video').length == 0){
                clearInterval(timer);
            }
            else{
            	addIframe();
            	showUp();
            	fadeOut(1000);
            }
        }
    }, 2000);
}

/*=========================================
 Event Listerner
=========================================*/

// Shortcuts, changeSpeed, showUp/fadeOut
document.body.addEventListener("keydown", function(event) {
    if(document.activeElement.tagName != "INPUT" && 
    	document.activeElement.tagName != "TEXTAREA" &&
     	document.hasFocus()){
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
