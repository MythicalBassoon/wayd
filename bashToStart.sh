#!/bin/bash
createdb wayd
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down'
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to activate' -e 'tell application "System Events" to tell process "Terminal" to keystroke "t" using command down' 
osascript -e 'tell application "Terminal" to do script "redis-server shutdown" in tab 2 of window 1'
osascript -e 'tell application "Terminal" to do script "redis-server" in tab 2 of window 1'
osascript -e 'tell application "Terminal" to do script "nodemon Desktop/HR/final/wayd/Server/server.js" in tab 3 of window 1'
osascript -e 'tell application "Terminal" to do script "nodemon Desktop/HR/final/wayd/Server/Workers/jobserver.js" in tab 4 of window 1'
osascript -e 'tell application "Terminal" to do script "node Desktop/HR/final/wayd/Server/Workers/jobqueue.js" in tab 5 of window 1'
osascript -e 'tell application "Terminal" to do script "open Desktop/HR/final/wayd/wayd.xcworkspace" in tab 6 of window 1'