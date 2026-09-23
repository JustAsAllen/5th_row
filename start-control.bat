@echo off
rem Control Center launcher - starts the server and opens the dashboard.
rem Uses Microsoft Edge (installed) - no Chrome needed.

setlocal
cd /d "C:\Users\Allen Saji\Desktop\5th_row"

if not exist "node_modules\npm" (
  echo Installing dependencies...
  call npm install >nul 2>&1
)

echo Starting 5TH_ROW Control Center...
echo Open http://localhost:3210/control in any browser if this window is not enough.
echo Press Ctrl+C to stop the server when done.
echo.

start "" "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" http://localhost:3210/control

npm run start -- -p 3210