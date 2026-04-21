@echo off
title Smart Hiring Portal - Launcher
echo --- STARTING SMART HIRING PORTAL ---
echo Please wait while the servers are starting...
echo.
cd /d "%~dp0"
node start_both.js
echo.
echo If the window closes unexpectedly, check server_status.log
pause
