/**
 * Generates a large dataset of 10,000 users for search demonstration
 * This creates intentionally large data to showcase performance issues
 * with unoptimized React components
 *
 * @returns {Array<Object>} Array of 10,000 user objects with various properties
 */
export const generateLargeDataset = () => {
  const data = [];
  const domains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "company.com",
    "example.org",
  ];
  const departments = [
    "Engineering",
    "Marketing",
    "Sales",
    "HR",
    "Finance",
    "Product",
    "Design",
    "Operations",
  ];

  for (let i = 1; i <= 10000; i++) {
    const firstName = `FirstName${i}`;
    const lastName = `LastName${i % 100}`; // Create some duplicated last names
    const domainIndex = i % domains.length;
    const deptIndex = i % departments.length;

    data.push({
      id: i,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${
        domains[domainIndex]
      }`,
      department: departments[deptIndex],
      salary: 50000 + Math.floor(Math.random() * 100000),
      joinDate: new Date(
        Date.now() - Math.floor(Math.random() * 5 * 365 * 24 * 60 * 60 * 1000)
      )
        .toISOString()
        .split("T")[0],
    });
  }

  return data;
};
