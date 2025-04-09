const questions = {
    "Data Structures": {
      beginner: [
        {
          question: "What is the time complexity of accessing an element in an array?",
          options: ["O(n)", "O(log n)", "O(1)", "O(n log n)"],
          answer: "O(1)",
        },
        {
          question: "Which data structure uses FIFO?",
          options: ["Stack", "Queue", "Tree", "Graph"],
          answer: "Queue",
        },
      ],
      intermediate: [
        {
          question: "Which data structure is used in BFS traversal?",
          options: ["Stack", "Queue", "Linked List", "Heap"],
          answer: "Queue",
        },
      ],
      advanced: [
        {
          question: "Which data structure is used in a memory-efficient way to implement recursion?",
          options: ["Stack", "Queue", "Heap", "Deque"],
          answer: "Stack",
        },
      ],
    },
  
    "Algorithms": {
      beginner: [
        {
          question: "What is the time complexity of binary search?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
          answer: "O(log n)",
        },
      ],
      intermediate: [],
      advanced: [],
    },
  
    "Cybersecurity": {
      beginner: [
        {
          question: "What does HTTPS stand for?",
          options: [
            "Hypertext Transfer Protocol Secure",
            "High Transfer Text Protocol",
            "Hyperlink Secure Protocol",
            "None of the above",
          ],
          answer: "Hypertext Transfer Protocol Secure",
        },
      ],
      intermediate: [],
      advanced: [],
    },
  
    "Database": {
      beginner: [
        {
          question: "What does SQL stand for?",
          options: [
            "Structured Query Language",
            "Structured Queue Language",
            "Simple Query Logic",
            "None of the above",
          ],
          answer: "Structured Query Language",
        },
      ],
      intermediate: [],
      advanced: [],
    },
  
    "Artificial Intelligence": {
      beginner: [
        {
          question: "Which of the following is a branch of AI?",
          options: ["Machine Learning", "Blockchain", "Web Dev", "IoT"],
          answer: "Machine Learning",
        },
      ],
      intermediate: [],
      advanced: [],
    },
  };
  
  export default questions;
  