# VideoSpeedUp

<!-- ====================================== -->
<!--         Intro -->
<!-- ====================================== -->
## Intro
A google extension developed for speed up video on the web, ex: youtube...  

*VideoSpeedUp* execute js `playbackRate`(a property of video tag) to change playing speed of video. Deal with shortkeys and speed labels.

Second version....  


Preview:
<p>
   <img style="transform:translateX(50%)" src="https://github.com/littletree71/VideoSpeedUp/blob/thridVesion/Demo_01_SpeedLabel.PNG?raw=true" height=200px/>
    <img style="transform:translateX(60%)" src="https://github.com/littletree71/VideoSpeedUp/blob/thridVesion/Demo_02_Popup.PNG?raw=true"height=130px/>
</p>

Shortkeys:

shortkey|work
:--:|:--
a | speed down
s | reset speed
d | speed up
w | display/hidden speed

Readme: <https://hackmd.io/s/Skv-ZdZXN>

Github: <https://github.com/littletree71/VideoSpeedUp> 


<div id="FutureDirection">  </div>

<!-- ====================================== -->
<!--         Schedule -->
<!-- ====================================== -->

## Schedule
### Done
2019/01/28 build up background, content  
2019/01/28 Testing that 2 part, work  
2019/01/29 build up popup, manifest  
2019/01/29 update icon  
2019/01/29 version 2.0 done  

### Future direction and Keep going
#### Option page design
Option page for user setting with 4 methods
1. color setting
2. shortkeys setting
3. exceptional website list
4. save button
5. connect email

May face with   
1. local file setting
2. color icon redefine
3. shortkeys redefine

#### Multiple iframe in tabs
Current design only modify first video tags in active tab

May face with   
1. showUp/fadeOut with Class, addClass/removeClass
2. A fake id for videos, send to background


<!-- ====================================== -->
<!--         Build up steps -->
<!-- ====================================== -->

## Build up steps
steps
1. Clone from github
2. Unzip `VideoSpeedUp`
3. Execute `Chrome`
4. Turn on `Developer mode` in extension
5. Click `Load unpacked` and choose the folder `VideoSpeedUp`


<!-- ====================================== -->
<!--         Work Constitute -->
<!-- ====================================== -->

## Work Constitute
1. Popup
2. Background
3. Content
4. Optional


<!-- ++++++++++++++++++++++++++++++++++++++ -->
<!--         Popup(html/css/js) -->
<!-- ++++++++++++++++++++++++++++++++++++++ -->

## 1. Popup(html/css/js)
### Popup contains 4 main methods
1. change color
2. change speed
3. add iframe
4. get help
5. update input value

1~3 just send message to background to execute
4 popup an alert as help message
5 execute when popupicon onclick

### There are 5 kinds of object and its event listener

#|Object| Event| Method
:--:|:--|:--:|:---
1| color box|(onclick)| changeColor
2| speed input|(onchange)| changeSpeed
3| speed reset|(onclick)| changeSpeed
4| insert iframe|(onclick)| addIframe
5| help button|(onclick)| getHelp


<!-- ++++++++++++++++++++++++++++++++++++++ -->
<!--         Background(js) -->
<!-- ++++++++++++++++++++++++++++++++++++++ -->

## 2. Background(js)
### Background contains 4 main methods
1. add iframe
2. change color
3. display number
4. change speed
5. update storage(speed or color)

1~3 send a message to content,(although can execute in background)
4 execute in active tabs

### Message listener, background as a message listener according to situation execute methods
1. listen `speed change` 
2. listen `color change` 
3. listen `insert iframe` 
4. listen `speed change` 

#|from|work
:--|:--|:--
1|popup|update storage(speed), change speed, display number
2|popup|update storage(color), change color, display number
3|popup|add iframe, display number
4|content|update storage(speed), change speed, display number


### Trigger, background work when
1. onMessage, as above
2. onInstalltion, set storage
3. onWebUpdate, add iframe
4. popup.onClick, send message to popup about update value of speed input


<!-- ++++++++++++++++++++++++++++++++++++++ -->
<!--         Content(js) -->
<!-- ++++++++++++++++++++++++++++++++++++++ -->

## 3. Content(js)
### Content contains 3 main methods
1. add iframe
2. speed number show up and fade out
3. change speed
4. change color

### Shortcuts
key|work
:--:|:--
a | speed down
s | reset speed
d | speed up
w | display/hidden speed

### Trigger

#|eventListener| from |work
:--:|:--:|:--:|:---
1 | keydown | self | 4 shortcuts, send message to background, change speed
2 | onMessage | background | addIframe
3 | onMessage | background | displayNumber
4 | onMessage | background | changeColor

<!-- ++++++++++++++++++++++++++++++++++++++ -->
<!--         Option(js) -->
<!-- ++++++++++++++++++++++++++++++++++++++ -->
## 4. Option(html/css/js)
[See future direction](#FutureDirection)

<!-- ====================================== -->
<!--         Readme and Github -->
<!-- ====================================== -->

## Readme
<https://hackmd.io/s/Skv-ZdZXN>

## Github
<https://github.com/littletree71/VideoSpeedUp>  