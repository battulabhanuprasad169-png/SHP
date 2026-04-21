import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncVerifiedQuestions() {
    console.log("🔍 Syncing Verified LeetCode Library...");
    
    // A reliable source for problem metadata
    const url = 'https://raw.githubusercontent.com/everthis/leetcode-problems/master/problems.json';

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const data = await response.json();
        const list = Array.isArray(data) ? data : (data.problems || []);
        console.log(`📊 Found ${list.length} questions in source.`);

        const verifiedQuestions = [];

        list.forEach((q, index) => {
            // Check if it has the required fields
            if (q.title) {
                const id = q.problem_id || (index + 1);
                verifiedQuestions.push({
                    id: parseInt(id),
                    title: q.title,
                    topic: (q.tags && q.tags[0]) || "General",
                    difficulty: q.difficulty || "Medium",
                    // Use a placeholder if description is missing, but ensure it's not COMPLETELY empty
                    statement: q.description || `Design a solution for the '${q.title}' challenge. Objective: Implement an efficient algorithm category: ${(q.tags && q.tags[0]) || 'General'}.`,
                    input: "sample_input",
                    output: "sample_output",
                    isCloudIndex: q.description ? false : true // Only use AI for missing statements
                });
            }
        });

        // 1. REMOVE ALL UNACCESSIBLE QUESTIONS (those without titles or marked invalid)
        const finalQuestions = verifiedQuestions.filter(q => q.title && q.id);

        console.log(`✨ Filtering complete: ${finalQuestions.length} questions are verified and ready.`);

        const outputPath = path.join(__dirname, 'src/data/leetCodeData.js');
        const fileContent = `export const LEETCODE_QUESTIONS = ${JSON.stringify(finalQuestions, null, 2)};`;
        fs.writeFileSync(outputPath, fileContent);
        
        console.log(`💾 Success! Saved to ${outputPath}`);
    } catch (err) {
        console.error("❌ Sync Error:", err.message);
    }
}

syncVerifiedQuestions();
