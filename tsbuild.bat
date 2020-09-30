cd tsproject
echo Compiling...
call tsc 
if ERRORLEVEL 1 goto EXIT
echo Packing...
call npm run wp 
if ERRORLEVEL 1 goto EXIT
echo Uglifying and copying...
call uglifyjs .\build\main-bundle.js -o .\build\main-bundle.min.js --compress --mangle
copy /y .\build\main-bundle.* ..\wwwroot\scripts

if ERRORLEVEL 1 goto EXIT
echo Success
cd ..
goto :EOF

:EXIT
cd ..
echo Exit on error
