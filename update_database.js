import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function updateDatabase() {
  console.log("🚀 Attempting to Import Expanded LeetCode Question Index...");
  const url = "https://raw.githubusercontent.com/Anish-Agnihotri/leetcode-questions-archive/master/leetcode-questions.json";
  
  try {
    const response = await fetch(url);
    const rawData = await response.json();
    
    // Transform to our internal format
    // This archive usually has IDs, Titles, and slugs.
    const transformed = rawData.map(q => ({
      id: q.question_id,
      topic: "Cloud Verified",
      difficulty: q.difficulty === 1 ? "Easy" : (q.difficulty === 2 ? "Medium" : "Hard"),
      statement: `[AI RECONSTRUCTED] Problem: ${q.question_title}\n\nLoading details from cloud repository...`,
      input: "Click Analyze to generate test cases",
      output: "Click Analyze to generate test cases",
      slug: q.question_title_slug
    }));

    const outputPath = path.join(__dirname, 'src/data/leetCodeData.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));
    
    console.log(`✅ Success! Indexed ${transformed.length} questions.`);
  } catch (err) {
    console.error("❌ Data Import Failed:", err.message);
  }
}

updateDatabase();
