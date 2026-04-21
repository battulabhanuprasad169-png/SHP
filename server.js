import express from 'express';
import cors from 'cors';
import { spawn, exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini
// For this to work accurately, you'll need a GEMINI_API_KEY in a .env file
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AI_KEY_MISSING");

/**
 * Robust Compiler Engine
 * Handles multiple languages and provides accurate output capture
 */
app.post('/api/execute', (req, res) => {
    const { language, code, input } = req.body;
    
    // Create random isolated folder
    const uniqueId = Math.random().toString(36).substring(7);
    const workDir = path.join(process.cwd(), 'temp_' + uniqueId);
    
    fs.mkdirSync(workDir, { recursive: true });
    
    let cmd = '';
    let args = [];
    let fileName = '';
    let isCompileRequired = false;
    let compileCmd = '';
    let compileArgs = [];
    let binName = os.platform() === 'win32' ? 'main.exe' : './main';
    
    try {
        if (language === 'javascript') {
            fileName = 'main.js';
            fs.writeFileSync(path.join(workDir, fileName), code);
            cmd = 'node';
            args = [fileName];
        } else if (language === 'python') {
            fileName = 'main.py';
            fs.writeFileSync(path.join(workDir, fileName), code);
            cmd = 'python';
            args = [fileName];
            // Fallback check will happen at spawn time if python command fails
        } else if (language === 'java') {
            fileName = 'Main.java';
            fs.writeFileSync(path.join(workDir, fileName), code);
            isCompileRequired = true;
            compileCmd = 'javac';
            compileArgs = [fileName];
            cmd = 'java';
            args = ['Main'];
        } else if (language === 'cpp') {
            fileName = 'main.cpp';
            fs.writeFileSync(path.join(workDir, fileName), code);
            isCompileRequired = true;
            compileCmd = 'g++';
            compileArgs = [fileName, '-o', binName];
            cmd = os.platform() === 'win32' ? path.join(workDir, binName) : './' + binName;
            args = [];
        } else if (language === 'c') {
            fileName = 'main.c';
            fs.writeFileSync(path.join(workDir, fileName), code);
            isCompileRequired = true;
            compileCmd = 'gcc';
            compileArgs = [fileName, '-o', binName];
            cmd = os.platform() === 'win32' ? path.join(workDir, binName) : './' + binName;
            args = [];
        } else if (language === 'csharp') {
            fileName = 'Program.cs';
            fs.writeFileSync(path.join(workDir, fileName), code);
            isCompileRequired = true;
            compileCmd = 'csc';
            compileArgs = [fileName];
            cmd = os.platform() === 'win32' ? path.join(workDir, 'Program.exe') : './Program.exe';
            args = [];
        } else if (language === 'ruby') {
            fileName = 'main.rb';
            fs.writeFileSync(path.join(workDir, fileName), code);
            cmd = 'ruby';
            args = [fileName];
        } else if (language === 'go') {
            fileName = 'main.go';
            fs.writeFileSync(path.join(workDir, fileName), code);
            cmd = 'go';
            args = ['run', fileName];
        } else {
            return res.status(400).json({ success: false, output: `Language '${language}' is not supported.` });
        }
        
        const execute = () => {
            const process = spawn(cmd, args, { cwd: workDir });
            let stdout = '';
            let stderr = '';
            
            // Pipe standard input
            if (input) {
                process.stdin.write(input);
                process.stdin.end();
            } else {
                process.stdin.end();
            }

            process.stdout.on('data', (data) => { stdout += data.toString(); });
            process.stderr.on('data', (data) => { stderr += data.toString(); });

            const timeout = setTimeout(() => {
                process.kill();
                res.json({ success: false, output: "Time Limit Exceeded (TLE) - 7s timeout reached." });
            }, 7000);

            process.on('close', (code) => {
                clearTimeout(timeout);
                // Cleanup
                try { fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) {}

                if (code === 0 || code === null) {
                    res.json({ success: true, output: stdout });
                } else {
                    res.json({ success: false, output: stderr || stdout || `Process exited with code ${code}` });
                }
            });

            process.on('error', (err) => {
                clearTimeout(timeout);
                try { fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) {}
                
                let msg = err.message;
                if (msg.includes('ENOENT')) {
                    msg = `Environment Error: The '${cmd}' tool is not installed or not in the system PATH.`;
                }
                res.json({ success: false, output: msg });
            });
        };

        if (isCompileRequired) {
            const compile = spawn(compileCmd, compileArgs, { cwd: workDir });
            let compileStderr = '';
            
            compile.stderr.on('data', (data) => { compileStderr += data.toString(); });
            compile.on('close', (code) => {
                if (code === 0) {
                    execute();
                } else {
                    try { fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) {}
                    res.json({ success: false, output: "Compilation Error:\n" + compileStderr });
                }
            });
            compile.on('error', (err) => {
                try { fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) {}
                res.json({ success: false, output: `Environment Error: Compiler '${compileCmd}' not found.` });
            });
        } else {
            execute();
        }

    } catch (err) {
        try { if (fs.existsSync(workDir)) fs.rmSync(workDir, { recursive: true, force: true }); } catch (e) {}
        res.json({ success: false, output: "Internal Compiler Error: " + err.message });
    }
});

/**
 * Intelligent AI Analysis Engine
 * Uses Gemini for deep logic verification
 */
/**
 * Just-In-Time Question Generator
 * Reconstructs LeetCode problems on the fly using AI
 */
app.post('/api/generate-question', async (req, res) => {
    const { id, title } = req.body;
    
    // Check if Gemini Key is available and valid
    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "AI_KEY_MISSING") {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
            Act as a LeetCode Database API. Return only valid JSON for Problem ID: ${id}.
            
            JSON Schema:
            {
                "topic": "Specific Topic",
                "difficulty": "Easy/Medium/Hard",
                "statement": "Detailed description with constraints and examples.",
                "input": "Sample test case input string",
                "output": "Expected output string"
            }
            
            IMPORTANT: Do not include any markdown, triple backticks, or explanatory text. Return ONLY the JSON object. 
            The Problem ID ${id} corresponds to: ${title || 'a standard LeetCode challenge'}.
            `;
            
            const result = await model.generateContent(prompt);
            const response = await result.response;
            let text = response.text().trim();
            
            // Cleanup in case AI still adds markdown
            if (text.startsWith('```')) {
                text = text.replace(/```json/g, '').replace(/```/g, '').trim();
            }
            
            const qData = JSON.parse(text);
            return res.json({ 
                success: true, 
                question: { 
                    ...qData, 
                    id: parseInt(id), 
                    title: title || `LeetCode #${id}`,
                    isCloudIndex: false 
                } 
            });
        } catch (err) {
            console.error("Gemini sync error for ID " + id + ":", err.message);
        }
    }
    
    // BACKEND HARD-FAIL FALLBACK (Better than generic simulation)
    const topics = ["Arrays", "Strings", "Sorting", "DP", "Graph"];
    const topic = topics[id % topics.length];
    res.json({ 
        success: true, 
        question: {
            id: parseInt(id),
            title: title || `LeetCode Problem #${id}`,
            topic: topic,
            difficulty: id % 3 === 0 ? "Hard" : "Medium",
            statement: `[OFFLINE SYNC] Challenge: Solve for Problem #${id}.\n\nDevelop an optimized solution for the ${topic} category. Capture the edge cases and verify against the sample output provided.\n\nNote: For official descriptions, provide a GEMINI_API_KEY in the server .env.`,
            input: topic === 'Arrays' ? "[1, 2, 3, 4]" : "default_val",
            output: topic === 'Arrays' ? "[4, 3, 2, 1]" : "success",
            isCloudIndex: false
        }
    });
});

app.get('/api/questions', (req, res) => {
    try {
        const questionsPath = path.join(process.cwd(), 'src/data/leetCodeData.json');
        if (fs.existsSync(questionsPath)) {
            const data = JSON.parse(fs.readFileSync(questionsPath, 'utf8'));
            res.json(data);
        } else {
            res.json([]);
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// --- PRODUCTION DEPLOYMENT: SERVE FRONTEND ---
// Serve the Vite built dist folder
const distPath = path.join(process.cwd(), 'dist');
if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
} else {
    console.warn("WARNING: 'dist' folder not found. Run 'npm run build' before deploying.");
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Advanced High-Performance Server running at http://0.0.0.0:${PORT}`);
});
