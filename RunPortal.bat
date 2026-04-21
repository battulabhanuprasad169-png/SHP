@echo off
setlocal
echo ==========================================
echo       SMART HIRING PORTAL - LAUNCHER
echo ==========================================
echo.
echo Starting both Frontend (Vite) and Backend (Node)...
echo.

cd /d "%~dp0"

:: Check if node is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH.
    echo Please install Node from https://nodejs.org/
    pause
    exit /b
)

:: Run the startup script
node start_both.js

if %errorlevel% neq 0 (
    echo.
    echo [TIP] If it fails with 'npm scripts disabled', try running:
    echo Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    echo in a PowerShell window as Administrator.
)

echo.
echo Portal stopped.
pause
