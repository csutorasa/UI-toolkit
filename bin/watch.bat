@set d=%cd%
@echo %d%
@echo Press any key to start watching the library
@start cmd /K "cd ..\wizyx && npm run watch"
@pause
@echo Press any key to start watching the showcase
@start cmd /K "cd .. && npm run watch"
@pause
@echo Press any key to start the webserver
@start cmd /K "cd .. && npm start"
