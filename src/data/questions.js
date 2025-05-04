const questions = {
  "Containers & Deployment": {
    beginner: [
      {
        question: "What is Docker primarily used for?",
        options: ["Virtualization", "Containerization", "Encryption", "Data Storage"],
        answer: "Containerization",
      },
      {
        question: "Which command is used to run a Docker container?",
        options: ["docker create", "docker start", "docker run", "docker build"],
        answer: "docker run",
      },
    ],
    intermediate: [
      {
        question: "What file defines a Docker container's environment?",
        options: ["Dockerfile", "docker-compose.yml", ".dockerignore", "env.config"],
        answer: "Dockerfile",
      },
      {
        question: "Which command builds a Docker image?",
        options: ["docker start", "docker compose", "docker build", "docker init"],
        answer: "docker build",
      },
    ],
    advanced: [
      {
        question: "What is the main purpose of Kubernetes?",
        options: ["Data encryption", "Container orchestration", "Logging", "Monitoring"],
        answer: "Container orchestration",
      },
      {
        question: "Which tool is used to manage multi-container Docker applications?",
        options: ["Docker Compose", "Dockerfile", "Docker Engine", "Minikube"],
        answer: "Docker Compose",
      },
    ],
  },

  "General Programming": {
    beginner: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
        answer: "O(log n)",
      },
      {
        question: "Which language is commonly used for web development?",
        options: ["Python", "HTML", "C", "Java"],
        answer: "HTML",
      },
    ],
    intermediate: [
      {
        question: "What is the output of 3 + '3' in JavaScript?",
        options: ["6", "33", "Error", "NaN"],
        answer: "33",
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A function that remembers its outer scope",
          "A class method",
          "A loop control structure",
          "A database operation",
        ],
        answer: "A function that remembers its outer scope",
      },
    ],
    advanced: [
      {
        question: "What does SOLID stand for in object-oriented programming?",
        options: [
          "Simple, Object, Layered, Interface, Design",
          "Single-responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion",
          "Secure, Optimized, Lightweight, Integrated, Documented",
          "None of the above",
        ],
        answer: "Single-responsibility, Open-closed, Liskov, Interface segregation, Dependency inversion",
      },
      {
        question: "What is tail call optimization?",
        options: [
          "A performance feature in recursion",
          "An API design pattern",
          "A type of garbage collection",
          "A database indexing strategy",
        ],
        answer: "A performance feature in recursion",
      },
    ],
  },

  "DevOps & Security": {
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
      {
        question: "What is the main goal of DevOps?",
        options: [
          "Slower deployment cycles",
          "Separate development and operations",
          "Faster and more reliable software delivery",
          "Only security updates",
        ],
        answer: "Faster and more reliable software delivery",
      },
    ],
    intermediate: [
      {
        question: "Which tool is used for continuous integration?",
        options: ["GitHub", "Jenkins", "Nginx", "Ansible"],
        answer: "Jenkins",
      },
      {
        question: "What is a common port for HTTPS traffic?",
        options: ["21", "22", "80", "443"],
        answer: "443",
      },
    ],
    advanced: [
      {
        question: "What is infrastructure as code (IaC)?",
        options: [
          "Hardware configuration",
          "Manual deployment method",
          "Managing infrastructure using configuration files",
          "Code compiled into firmware",
        ],
        answer: "Managing infrastructure using configuration files",
      },
      {
        question: "Which tool is used for configuration management?",
        options: ["Kubernetes", "Terraform", "Ansible", "Docker"],
        answer: "Ansible",
      },
    ],
  },

  "Linux Essentials": {
    beginner: [
      {
        question: "What is the command to list files in a Linux terminal?",
        options: ["ls", "dir", "list", "show"],
        answer: "ls",
      },
      {
        question: "Which command is used to change file permissions?",
        options: ["chmod", "chperm", "perm", "chown"],
        answer: "chmod",
      },
    ],
    intermediate: [
      {
        question: "Which command shows disk usage in human-readable format?",
        options: ["df -h", "ls -l", "du -a", "pwd"],
        answer: "df -h",
      },
      {
        question: "Which file contains user account information?",
        options: ["/etc/users", "/etc/passwd", "/home/user", "/root"],
        answer: "/etc/passwd",
      },
    ],
    advanced: [
      {
        question: "Which command finds files modified in the last 24 hours?",
        options: ["find . -mtime -1", "ls -m", "grep recent", "touch -t"],
        answer: "find . -mtime -1",
      },
      {
        question: "What is the purpose of the /etc/fstab file?",
        options: [
          "Defines firewall rules",
          "Configures filesystem mount points",
          "Lists installed packages",
          "Stores shell aliases",
        ],
        answer: "Configures filesystem mount points",
      },
    ],
  },

  "JavaScript Frameworks": {
    beginner: [
      {
        question: "Which of the following is a JavaScript framework?",
        options: ["React", "Spring", "Django", "Ruby on Rails"],
        answer: "React",
      },
      {
        question: "What does JSX stand for?",
        options: [
          "Java Syntax Extension",
          "JavaScript XML",
          "Java Source eXchange",
          "JSON Extended",
        ],
        answer: "JavaScript XML",
      },
    ],
    intermediate: [
      {
        question: "Which hook is used for side effects in React?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        answer: "useEffect",
      },
      {
        question: "What is a prop in React?",
        options: [
          "A special state variable",
          "A way to style components",
          "A function that triggers UI",
          "A way to pass data to components",
        ],
        answer: "A way to pass data to components",
      },
    ],
    advanced: [
      {
        question: "What is tree shaking in JavaScript bundlers?",
        options: [
          "A memory leak cleanup",
          "A data structure optimization",
          "Dead-code elimination",
          "Component re-rendering",
        ],
        answer: "Dead-code elimination",
      },
      {
        question: "Which framework uses a virtual DOM?",
        options: ["Angular", "React", "Vue", "All of the above"],
        answer: "All of the above",
      },
    ],
  },
};

export default questions;
