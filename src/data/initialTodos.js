const initialTodos = [
  {
    id: 1,
    title: "Admin Panel Test Cases",
    description: "Write and review all test cases for the Admin Dashboard.",
    status: "New",
    attachments: 1,
    tags: 8
  },
  {
    id: 2,
    title: "Seller Panel Test Cases",
    description: "Verify all seller panel workflows for onboarding.",
    status: "New",
    attachments: 0,
    tags: 40
  },
  {
    id: 3,
    title: "Sales Manager Panel UI Fixes",
    description: "Fix and test all UI inconsistencies reported by QA.",
    status: "Ongoing",
    attachments: 2,
    tags: 12,
    dueDate: new Date(Date.now() + 3 * 86400000) // 3 days from now
  },
  {
    id: 4,
    title: "Customer Support Automation",
    description: "Integrate chatbot and ticket routing automation.",
    status: "Ongoing",
    attachments: 1,
    tags: 24,
    dueDate: new Date(Date.now() + 1 * 86400000) // 1 day from now
  },
  {
    id: 5,
    title: "Shop Panel Test Cases",
    description: "Ensure edge case scenarios are covered in the Shop Panel.",
    status: "Done",
    attachments: 1,
    tags: 13
  },
  {
    id: 6,
    title: "Knowledge Base Article Review",
    description: "Review content and grammar for all help center articles.",
    status: "Done",
    attachments: 0,
    tags: 7
  },
  {
    id: 7,
    title: "Questions Component Refactor",
    description: "Refactor the Questions module into reusable components.",
    status: "Ongoing",
    attachments: 0,
    tags: 1115,
    dueDate: new Date(Date.now() + 86400000) // 1 day from now
  },
  {
    id: 8,
    title: "Team Meeting Notes",
    description: "Summarize points discussed in the weekly engineering sync.",
    status: "New",
    attachments: 1,
    tags: 2
  },
  {
    id: 9,
    title: "Performance Benchmarking",
    description: "Run Lighthouse and GTmetrix for performance optimization.",
    status: "New",
    attachments: 0,
    tags: 5
  }
];

export default initialTodos;
