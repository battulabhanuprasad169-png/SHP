import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function syncMCQs() {
    console.log("🔍 Syncing Verified Professional MCQ Library...");
    
    let allQuestions = [];

    // 1. Fetch Technical/CS Questions (OpenTDB category 18)
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=50&category=18&type=multiple');
        const data = await response.json();
        if (data.results) {
            allQuestions = data.results.map((item, index) => ({
                id: `tech-${index}`,
                topic: "Technical Core",
                question: item.question.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">"),
                options: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5).map(o => o.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&")),
                answer: item.correct_answer.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&amp;/g, "&"),
                difficulty: item.difficulty || "Medium"
            }));
            console.log(`📊 Fetched 50 Technical questions.`);
        }
    } catch (err) {
        console.warn("⚠️ Technical API throttled or failed.");
    }

    // 2. High-Quality Aptitude Seeds (Quantitative)
    const aptitudeSeeds = [
        { id: 201, topic: "Aptitude", question: "If a person sells an article for $650 and gains 30%, what is the cost price?", options: ["$500", "$450", "$600", "$550"], answer: "$500", difficulty: "Medium" },
        { id: 202, topic: "Aptitude", question: "A train 150m long is running at 72 km/hr. How long will it take to pass a telegraph post?", options: ["7.5 sec", "8 sec", "9.2 sec", "12 sec"], answer: "7.5 sec", difficulty: "Easy" },
        { id: 203, topic: "Aptitude", question: "The average of first five multiples of 3 is:", options: ["9", "12", "15", "18"], answer: "9", difficulty: "Easy" },
        { id: 204, topic: "Aptitude", question: "Two numbers are in ratio 3:5. If 9 is subtracted from each, they are in ratio 12:23. The numbers are:", options: ["33, 55", "30, 50", "27, 45", "24, 40"], answer: "33, 55", difficulty: "Hard" },
        { id: 205, topic: "Aptitude", question: "Find the surface area of a cube whose volume is 216 cm³.", options: ["216 cm²", "144 cm²", "196 cm²", "256 cm²"], answer: "216 cm²", difficulty: "Medium" },
        { id: 206, topic: "Aptitude", question: "A sum of money at compound interest amounts to thrice itself in 3 years. In how many years will it be 9 times itself?", options: ["6 years", "9 years", "12 years", "15 years"], answer: "6 years", difficulty: "Medium" },
        { id: 207, topic: "Aptitude", question: "If 15 men can do a piece of work in 20 days, how many men can do it in 12 days?", options: ["25", "30", "20", "22"], answer: "25", difficulty: "Easy" },
        { id: 208, topic: "Aptitude", question: "What is the probability of getting a sum 9 from two throws of a dice?", options: ["1/9", "1/8", "1/6", "1/12"], answer: "1/9", difficulty: "Medium" },
        { id: 209, topic: "Aptitude", question: "The ratio of ages of A and B is 4:5. After 5 years, the ratio becomes 5:6. What is A's current age?", options: ["20", "25", "30", "15"], answer: "20", difficulty: "Easy" },
        { id: 210, topic: "Aptitude", question: "A dealer marking his goods 20% above cost price and allows a discount of 10%. His gain percent is:", options: ["8%", "10%", "12%", "6%"], answer: "8%", difficulty: "Easy" }
    ];

    // 3. High-Quality Logical Reasoning Seeds
    const reasoningSeeds = [
        { id: 301, topic: "Logical Reasoning", question: "CUP : LIP :: BIRD : ?", options: ["BEAK", "BUSH", "GRASS", "FOREST"], answer: "BEAK", difficulty: "Easy" },
        { id: 302, topic: "Logical Reasoning", question: "In a certain code 'TIGER' is written as 'SUHJFHDFQS'. How is 'HORSE' written?", options: ["GINPQRRTDF", "GINPQRRTDF", "GIPRSQRDF", "GINPQRTDF"], answer: "GINPQRRTDF", difficulty: "Hard" },
        { id: 303, topic: "Logical Reasoning", question: "Pointing to a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?", options: ["Mother", "Sister", "Grandmother", "Aunt"], answer: "Mother", difficulty: "Medium" },
        { id: 304, topic: "Logical Reasoning", question: "Which word does not belong with the others?", options: ["Tyre", "Steering wheel", "Engine", "Car"], answer: "Car", difficulty: "Easy" },
        { id: 305, topic: "Logical Reasoning", question: "A, B, C, D and E are sitting on a bench. A is next to B, C is next to D, C is not sitting with E. If A is on the second position from the left, and A and C are together, what is the position of C?", options: ["Third", "Fourth", "Second", "First"], answer: "Third", difficulty: "Medium" },
        { id: 306, topic: "Logical Reasoning", question: "SCD, TEF, UGH, ____, WKL", options: ["VIJ", "VJI", "UJI", "IJT"], answer: "VIJ", difficulty: "Easy" },
        { id: 307, topic: "Logical Reasoning", question: "Look at this series: 7, 10, 8, 11, 9, 12, ... What number should come next?", options: ["10", "13", "7", "11"], answer: "10", difficulty: "Easy" },
        { id: 308, topic: "Logical Reasoning", question: "Statement: Some kings are queens. All queens are beautiful. Conclusion I: All kings are beautiful. Conclusion II: Some kings are beautiful.", options: ["Only II follows", "Only I follows", "Both follow", "Neither follows"], answer: "Only II follows", difficulty: "Medium" },
        { id: 309, topic: "Logical Reasoning", question: "If South-East becomes North, North-East becomes West and so on. What will West become?", options: ["South-East", "North-East", "South-West", "North-West"], answer: "South-East", difficulty: "Hard" },
        { id: 310, topic: "Logical Reasoning", question: "In a row of 40 boys, Satish was shifted 10 places to the right of Rohan and Kewal was shifted 10 places to the left of Satish. If Kewal is 26th from the left, what is Rohan's position?", options: ["26th", "27th", "25th", "None"], answer: "26th", difficulty: "Hard" }
    ];

    // 4. Verbal Ability Seeds
    const verbalSeeds = [
        { id: 401, topic: "Verbal Ability", question: "Find the synonym of 'ABANDON':", options: ["Forsake", "Keep", "Cherish", "Adopt"], answer: "Forsake", difficulty: "Easy" },
        { id: 402, topic: "Verbal Ability", question: "Antonym of 'ENORMOUS':", options: ["Tiny", "Soft", "Average", "Weak"], answer: "Tiny", difficulty: "Easy" },
        { id: 403, topic: "Verbal Ability", question: "Choose the correctly spelt word:", options: ["Maintenance", "Maintanence", "Maintenence", "Maintainance"], answer: "Maintenance", difficulty: "Medium" },
        { id: 404, topic: "Verbal Ability", question: "Identify the error: 'Each of the students (A) / are required (B) / to submit (C) / their assignment (D).'", options: ["B", "A", "C", "D"], answer: "B", difficulty: "Medium" }
    ];

    allQuestions = [...allQuestions, ...aptitudeSeeds, ...reasoningSeeds, ...verbalSeeds];

    const outputPath = path.join(__dirname, 'src/data/mcqData.js');
    const fileContent = `export const MCQ_DATA = ${JSON.stringify(allQuestions, null, 2)};`;
    fs.writeFileSync(outputPath, fileContent);
    
    console.log(`✅ Success! Unified Library saved with ${allQuestions.length} professional questions.`);
}

syncMCQs();
