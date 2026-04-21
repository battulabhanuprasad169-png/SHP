import { spawn } from 'child_process';
import os from 'os';
import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'server_status.log');
const logStream = fs.createWriteStream(logFile, { flags: 'a' });

function safeLog(msg) {
    const timestamp = new Date().toISOString();
    const formatted = `[${timestamp}] ${msg}\n`;
    process.stdout.write(formatted);
    logStream.write(formatted);
}

const npmCmd = os.platform() === 'win32' ? 'npm.cmd' : 'npm';

safeLog('--- STARTING SMART HIRING PORTAL ---');

/**
 * Spawning processes with detached: true and stdio: 'ignore' 
 * helps them live independently of the parent process on Windows.
 * We include '--host' in 'vite preview' to ensure the site is reachable over the network.
 */

const frontendParams = ['run', 'preview', '--', '--host', '0.0.0.0', '--port', '5173', '--strictPort'];
safeLog(`Frontend Command: ${npmCmd} ${frontendParams.join(' ')}`);

const frontend = spawn(npmCmd, frontendParams, { 
    shell: true, 
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    windowsHide: true,
    cwd: process.cwd()
});

const backend = spawn('node', ['server.js'], { 
    shell: true, 
    stdio: ['ignore', 'pipe', 'pipe'],
    detached: true,
    windowsHide: true,
    cwd: process.cwd(),
    env: { ...process.env, PORT: 5000 }
});

// We unref to allow this parent process to exit if needed, 
// though typically it stays alive to manage the logs.
frontend.unref();
backend.unref();

frontend.stdout.on('data', (data) => logStream.write(`[FRONTEND] ${data}`));
frontend.stderr.on('data', (data) => logStream.write(`[FRONTEND_ERR] ${data}`));

backend.stdout.on('data', (data) => logStream.write(`[BACKEND] ${data}`));
backend.stderr.on('data', (data) => logStream.write(`[BACKEND_ERR] ${data}`));

frontend.on('close', (code) => {
    safeLog(`Frontend process exited with code ${code}`);
    if (code !== 0) {
        backend.kill();
    }
});

backend.on('close', (code) => {
    safeLog(`Backend process exited with code ${code}`);
    if (code !== 0) {
        frontend.kill();
    }
});

safeLog('Frontend: http://localhost:5173');
safeLog('Backend:  http://localhost:5000');
safeLog('Reachability: Site is now listening on all interfaces (0.0.0.0).');
