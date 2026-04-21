import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const verifiedSeed = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    input: "[2,7,11,15], 9",
    output: "[0,1]"
  },
  {
    id: 2,
    title: "Add Two Numbers",
    topic: "Linked List",
    difficulty: "Medium",
    statement: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.",
    input: "[2,4,3], [5,6,4]",
    output: "[7,0,8]"
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    topic: "Strings",
    difficulty: "Medium",
    statement: "Given a string s, find the length of the longest substring without repeating characters.\n\nExample 1:\nInput: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
    input: "\"abcabcbb\"",
    output: "3"
  },
  {
    id: 4,
    title: "Median of Two Sorted Arrays",
    topic: "Arrays",
    difficulty: "Hard",
    statement: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).",
    input: "[1,3], [2]",
    output: "2.00000"
  },
  {
    id: 9,
    title: "Palindrome Number",
    topic: "Math",
    difficulty: "Easy",
    statement: "Given an integer x, return true if x is a palindrome, and false otherwise.\n\nExample 1:\nInput: x = 121\nOutput: true",
    input: "121",
    output: "true"
  },
  {
    id: 11,
    title: "Container With Most Water",
    topic: "Two Pointers",
    difficulty: "Medium",
    statement: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.",
    input: "[1,8,6,2,5,4,8,3,7]",
    output: "49"
  },
  {
    id: 13,
    title: "Roman to Integer",
    topic: "Math",
    difficulty: "Easy",
    statement: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M. Convert a roman numeral to an integer.",
    input: "\"LVIII\"",
    output: "58"
  },
  {
    id: 14,
    title: "Longest Common Prefix",
    topic: "Strings",
    difficulty: "Easy",
    statement: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
    input: "[\"flower\",\"flow\",\"flight\"]",
    output: "\"fl\""
  },
  {
    id: 20,
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    input: "\"()[]{}\"",
    output: "true"
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    statement: "Merge two sorted linked lists and return it as a new sorted list.",
    input: "[1,2,4], [1,3,4]",
    output: "[1,1,2,3,4,4]"
  },
  {
    id: 53,
    title: "Maximum Subarray",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    statement: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    input: "[-2,1,-3,4,-1,2,1,-5,4]",
    output: "6"
  },
  {
    id: 70,
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    statement: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    input: "3",
    output: "3"
  },
  {
    id: 104,
    title: "Maximum Depth of Binary Tree",
    topic: "Binary Tree",
    difficulty: "Easy",
    statement: "Given the root of a binary tree, return its maximum depth.",
    input: "[3,9,20,null,null,15,7]",
    output: "3"
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize your profit.",
    input: "[7,1,5,3,6,4]",
    output: "5"
  },
  {
    id: 141,
    title: "Linked List Cycle",
    topic: "Linked List",
    difficulty: "Easy",
    statement: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    input: "[3,2,0,-4], pos = 1",
    output: "true"
  },
  {
    id: 146,
    title: "LRU Cache",
    topic: "Hash Table",
    difficulty: "Medium",
    statement: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.",
    input: "[\"LRUCache\", \"put\", \"put\", \"get\", \"put\", \"get\", \"put\", \"get\", \"get\", \"get\"]",
    output: "[null, null, null, 1, null, -1, null, -1, 3, 4]"
  },
  {
    id: 200,
    title: "Number of Islands",
    topic: "Graph",
    difficulty: "Medium",
    statement: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    input: "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]",
    output: "1"
  },
  {
    id: 206,
    title: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    statement: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    input: "[1,2,3,4,5]",
    output: "[5,4,3,2,1]"
  },
  {
    id: 217,
    title: "Contains Duplicate",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    input: "[1,2,3,1]",
    output: "true"
  },
  {
    id: 235,
    title: "Lowest Common Ancestor of a Binary Search Tree",
    topic: "Binary Search Tree",
    difficulty: "Medium",
    statement: "Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.",
    input: "[6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8",
    output: "6"
  },
  {
    id: 238,
    title: "Product of Array Except Self",
    topic: "Arrays",
    difficulty: "Medium",
    statement: "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].",
    input: "[1,2,3,4]",
    output: "[24,12,8,6]"
  },
  {
    id: 242,
    title: "Valid Anagram",
    topic: "Hash Table",
    difficulty: "Easy",
    statement: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    input: "s = \"anagram\", t = \"nagaram\"",
    output: "true"
  },
  {
    id: 300,
    title: "Longest Increasing Subsequence",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    statement: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    input: "[10,9,2,5,3,7,101,18]",
    output: "4"
  },
  {
    id: 322,
    title: "Coin Change",
    topic: "Dynamic Programming",
    difficulty: "Medium",
    statement: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",
    input: "coins = [1,2,5], amount = 11",
    output: "3"
  },
  {
    id: 347,
    title: "Top K Frequent Elements",
    topic: "Heap",
    difficulty: "Medium",
    statement: "Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.",
    input: "nums = [1,1,1,2,2,3], k = 2",
    output: "[1,2]"
  }
];

function rebuildLibrary() {
    console.log("🧹 Cleaning library: Removing non-functioning placeholders...");
    
    // We only keep questions that are verified and offline-ready
    const finalLibrary = verifiedSeed.map(q => ({
        ...q,
        isCloudIndex: false // Guaranteed to work offline
    }));

    const outputPath = path.join(__dirname, 'src/data/leetCodeData.js');
    const fileContent = `export const LEETCODE_QUESTIONS = ${JSON.stringify(finalLibrary, null, 2)};`;
    
    fs.writeFileSync(outputPath, fileContent);
    console.log(`✅ Success! Library rebuilt with ${finalLibrary.length} high-quality, functioning questions.`);
}

rebuildLibrary();
