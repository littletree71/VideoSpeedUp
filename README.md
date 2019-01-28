# VideoSpeedUp
## Intro
A google extension developed for speed up video on the web, ex: youtube...  

*VideoSpeedUp* execute js `playbackRate`(a property of video tag) to change playing speed of video.

On developing....
Readme: <https://hackmd.io/s/Skv-ZdZXN>

## Build up step
steps
1. Clone from github
2. Unzip `VideoSpeedUp`
3. Execute `Chrome`
4. Turn on `Developer mode` in extension
5. Click `Load unpacked` and choose the folder `VideoSpeedUp`

## Constitute

1. Popup
2. Background
3. Content
4. Optional

### Popup(html, js)
#### Popup contains 4 main methods
1. update input value
2. change speed
3. change color
4. add iframe
5. help

1~3 just send message to background to execute

#### There are 5 kinds of object and its event listener
1. color box(onclick)
2. speed input(onchange)
3. speed reset(onclick)
4. insert iframe(onclick)
5. help button(onclick)

#### Another special method and event listener 
When click the popup button, background.js send a message to update value of `input box of speed`

### Background(js)
#### Background contains 4 main methods
1. add iframe
2. change speed
3. change color
4. update storage(speed or color)
5. display number

1~2 send a message to content,(although can execute in background)

#### Message listener, background as a message listener according to situation execute methods
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


#### Trigger, background work when
1. onMessage, as above
2. onInstalltion, set storage
3. onWebUpdate, add iframe
4. popup.onClick, send message to popup about update value of speed input

### Content(js)
#### Content contains 3 main methods
1. add iframe
2. speed number show up and fade out
3. change speed
4. change color

#### Shortcuts
key|work
:--:|:--
a | speed down
s | reset speed
d | speed up
w | display/hidden speed

#### Trigger

#|eventListener| from |work
:--:|:--:|:--:|:---
1 | keydown | self | 4 shortcuts, send message to background, change speed
2 | onMessage | background | addIframe
3 | onMessage | background | displayNumber
4 | onMessage | background | changeColor

## Schedule
### Down
2019/01/28 build up background, content  
2019/01/28 Testing that 2 part, work

### Keep going
1. popup.js redefine all methods
2. popup.icon design
3. option page design

# Readme
 <https://hackmd.io/s/Skv-ZdZXN>