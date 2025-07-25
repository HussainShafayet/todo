const initialTodos = [
  { id: 1, title: "Admin Panel Test Cases", description: "Description for Admin Panel Test Cases", status: 'New', attachments: 1, tags: 8 },
  { id: 2, title: "Seller Panel Test Cases", description: "Description for Seller Panel Test Cases", status: 'New', attachments: 0, tags: 40 },
  { id: 3, title: "Sales Manager Panel", description: "Description for Sales Manager Panel", status: 'New', attachments: 1, tags: 41 },
  { id: 4, title: "Customer Support & Operations", description: "Description for Customer Support & Operations", status: 'New', attachments: 0, tags: 43 },
  { id: 5, title: "Shop Panel Test Cases", description: "Description for Shop Panel Test Cases", status: 'New', attachments: 1, tags: 13 },
  { id: 6, title: "Questions", description: "Description for Questions", status: 'Ongoing', attachments: 0, tags: 1115, dueDate: new Date(Date.now() + 86400000) }
];

export default initialTodos;
