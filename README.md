# 🚀 TerraLink: Advanced Smart Hiring & Coding Portal

TerraLink is a premium, full-stack recruitment and learning ecosystem designed to bridge the gap between candidates and companies. It features a robust online compiler, AI-powered question generation, automated assessments, and personalized learning roadmaps.

---

## ✨ Key Features

### 💻 Advanced Coding Engine
- **Multi-Language Support**: Execute code in 8+ languages including JavaScript, Python, Java, C++, C, C#, Ruby, and Go.
- **Isolated Execution**: Robust backend using `spawn` processes in temporary directories for security and performance.
- **Time-Limit Protection**: Automatic TLE (Time Limit Exceeded) detection at 7 seconds to prevent infinite loops.
- **Monaco Editor Integration**: A professional-grade coding experience with syntax highlighting and autocompletion.

### 🤖 AI-Powered Intelligence
- **JIT Question Generation**: Uses **Google Gemini AI** to reconstruct LeetCode problems on-the-fly based on Problem IDs.
- **Smart Feedback**: Future-ready integration for deep logic verification and code critique.

### 📊 Assessment & Learning
- **MCQ & Practice Modules**: Focused MCQs for various domains with real-time feedback.
- **Live Contests**: Infrastructure for hosting timed competitive programming challenges.
- **Learning Roadmaps**: Visual, phase-based roadmaps to guide users through complex technologies.
- **Resume Builder**: Integrated tool to help candidates build professional resumes.

### 🛡️ Admin & Student Ecosystems
- **Admin Dashboard**: Comprehensive control panel for managing coding questions, MCQs, and user performance.
- **Student Dashboard**: Personalized view of progress, statistics, and upcoming assessments.
- **Profile Management**: Detailed user profiles with skill graphs and activity tracking.

### 🎨 Premium UI/UX
- **Modern Aesthetics**: Glassmorphism-inspired design with vibrant gradients and smooth transitions.
- **Responsive Layout**: Seamless experience across Desktop, Tablet, and Mobile.
- **Interactive Components**: Including small mini-games like TicTacToe for engagement.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, React Router 7, Monaco Editor, Lucide Icons, Chessboard.js |
| **Backend** | Node.js, Express 5, Google Generative AI (Gemini) |
| **Styling** | Vanilla CSS (Modern Design Tokens, Glassmorphism) |
| **Environment** | Dotenv, Child Process (System-level Compilers) |

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following compilers installed in your system PATH for the local engine:
- `node` (JavaScript)
- `python` (Python)
- `javac/java` (Java)
- `g++/gcc` (C++/C)
- `go` (Go)

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=5000
```

### 3. Installation
```bash
npm install
```

### 4. Running the Portal
**The Easy Way (Windows):**
Simply double-click `RunPortal.bat`. This will start both the frontend and backend servers simultaneously.

**The Manual Way:**
```bash
# Start both servers (using start_both.js)
npm start

# Or start them individually
npm run dev    # Frontend (Port 5173)
node server.js # Backend (Port 5000)
```

---

## 📂 Project Structure

- `/src/pages`: Main application modules (Admin, Coding, Roadmaps, etc.)
- `/src/components`: Reusable UI components and route protection.
- `/src/data`: Static datasets for MCQs and coding challenges.
- `server.js`: Express server with complex compiler logic and AI integration.
- `sync_mcqs.js`: Utility for synchronizing MCQ data.
- `generate_index.js`: Custom script for indexing or static assets.

---

## 📝 License
This project is for educational and recruitment modernization purposes. Enjoy building!
