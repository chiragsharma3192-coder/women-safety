@echo off
net session >nul 2>&1
if %errorlevel% neq 0 (
    powershell -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

echo ================================
echo   Women Safety Project Starting
echo ================================

echo [1/4] Starting MongoDB...
net start MongoDB >nul 2>&1
echo  MongoDB Ready!

echo [2/4] Opening Firewall...
netsh advfirewall firewall delete rule name="Node 3000" >nul 2>&1
netsh advfirewall firewall add rule name="Node 3000" protocol=TCP dir=in localport=3000 action=allow >nul 2>&1
echo  Firewall Ready!

echo [3/4] Starting Node.js Server...
cd /d "C:\xampp\htdocs\women_safety"
start "Women Safety Server" cmd /k ""C:\Program Files\nodejs\node.exe" server.js"

echo [4/4] Starting HTTPS Tunnel for Mobile GPS...
timeout /t 3 /nobreak >nul
start "HTTPS Tunnel" cmd /k ""C:\Program Files\nodejs\node.exe" tunnel.js"

timeout /t 2 /nobreak >nul
start "" http://localhost:3000

echo.
echo ================================
echo  PC:     http://localhost:3000
echo  Mobile: Check the TUNNEL window
echo  Admin:  admin / admin123
echo ================================
pause
