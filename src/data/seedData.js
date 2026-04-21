export const TOP_QUESTIONS = [
  {
    id: 1,
    title: "Two Sum",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    input: "[2,7,11,15], 9",
    output: "[0,1]"
  },
  {
    id: 13,
    title: "Roman to Integer",
    topic: "Math",
    difficulty: "Easy",
    statement: "Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.\n\nGiven a roman numeral, convert it to an integer.\n\nExample 1:\nInput: s = \"III\"\nOutput: 3\nExplanation: III = 3.",
    input: "\"III\"",
    output: "3"
  },
  {
    id: 20,
    title: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    statement: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nExample 1:\nInput: s = \"()\"\nOutput: true",
    input: "\"()\"",
    output: "true"
  },
  {
    id: 21,
    title: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    statement: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists in a single sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.",
    input: "[1,2,4], [1,3,4]",
    output: "[1,1,2,3,4,4]"
  },
  {
    id: 70,
    title: "Climbing Stairs",
    topic: "Dynamic Programming",
    difficulty: "Easy",
    statement: "You are climbing a staircase. It takes n steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nExample 1:\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps",
    input: "2",
    output: "2"
  },
  {
    id: 121,
    title: "Best Time to Buy and Sell Stock",
    topic: "Arrays",
    difficulty: "Easy",
    statement: "You are given an array prices where prices[i] is the price of a given stock on the ith day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    input: "[7,1,5,3,6,4]",
    output: "5"
  }
];
