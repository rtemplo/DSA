// Sample user data for practicing filtering
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  isActive: boolean;
  role: 'admin' | 'user' | 'guest';
  joinDate: Date;
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', age: 28, isActive: true, role: 'admin', joinDate: new Date('2020-01-15') },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', age: 34, isActive: true, role: 'user', joinDate: new Date('2021-06-20') },
  { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', age: 22, isActive: false, role: 'guest', joinDate: new Date('2023-03-10') },
  { id: 4, name: 'Diana Prince', email: 'diana@example.com', age: 31, isActive: true, role: 'user', joinDate: new Date('2020-11-05') },
  { id: 5, name: 'Eve Wilson', email: 'eve@example.com', age: 26, isActive: false, role: 'user', joinDate: new Date('2022-09-12') },
  { id: 6, name: 'Frank Miller', email: 'frank@example.com', age: 45, isActive: true, role: 'admin', joinDate: new Date('2019-02-28') },
  { id: 7, name: 'Grace Lee', email: 'grace@example.com', age: 29, isActive: true, role: 'user', joinDate: new Date('2021-12-01') },
];

// Practice filtering tasks:
// 1. Filter active users
// const activeUsers = users.filter(user => user.isActive);

// 2. Filter users by role
// const admins = users.filter(user => user.role === 'admin');

// 3. Filter users older than 30
// const olderUsers = users.filter(user => user.age > 30);

// 4. Filter users joined after 2020
// const recentUsers = users.filter(user => user.joinDate.getFullYear() > 2020);

// 5. Filter active users with 'user' role
// const activeNormalUsers = users.filter(user => user.isActive && user.role === 'user');

// 6. Filter and map to get only names of active users
// const activeUserNames = users.filter(user => user.isActive).map(user => user.name);
