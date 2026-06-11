@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

title Women Safety Project
color 0A

echo.
echo  ==========================================
echo   WOMEN SAFETY ^& WELFARE SYSTEM
echo  ==========================================
echo.

echo  [1/3] Starting MongoDB...
net start MongoDB >nul 2>&1
echo  MongoDB Ready!

echo.
echo  [2/3] Opening Firewall for Mobile...
netsh advfirewall firewall delete rule name="Node 3000" >nul 2>&1
netsh advfirewall firewall add rule name="Node 3000" protocol=TCP dir=in localport=3000 action=allow >nul 2>&1
echo  Firewall Ready!

echo.
echo  [3/3] Starting Server...
cd /d "C:\xampp\htdocs\women_safety"
start "Women Safety Server" cmd /k ""C:\Program Files\nodejs\node.exe" server.js"

echo.
echo  Waiting for server to start...
timeout /t 3 /nobreak >nul

echo.
echo  Opening project in browser...
start "" http://localhost:3000

echo.
echo  ==========================================
echo   PROJECT IS RUNNING!
echo.
echo   PC URL    : http://localhost:3000
echo   Admin     : admin / admin123
echo  ==========================================
echo.
echo  NOTE: Keep this window open while using!
echo  Press any key to close this window...
pause >nul
