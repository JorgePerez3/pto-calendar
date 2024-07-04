// const { db } = require('@vercel/postgres');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'jorge',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 3456,
});

const {
  users,
  departments,
  employees,
  timeOffRequests,
  approvedRequests,
} = require('../app/lib/placeholder-data-pto.js');

const bcrypt = require('bcrypt');

async function seedUsers() {
  try {
    // Create extension and table if they don't exist
    // await pool.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    // await pool.query(`
    //   CREATE TABLE IF NOT EXISTS users (
    //     UserId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //     Username VARCHAR(255) NOT NULL,
    //     Role VARCHAR(50) NOT NULL,
    //     email TEXT NOT NULL UNIQUE,
    //     password TEXT NOT NULL
    //   );
    // `);

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(`
        INSERT INTO users (UserId, Username, Role, email, password)
        VALUES (gen_random_uuid(),$1, $2, $3, $4)
        ON CONFLICT (UserId) DO NOTHING;
      `, [user.username, user.role, user.email, hashedPassword]);
    }

    console.log("Seeded users");

  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  } finally {
    await pool.end(); // Close the pool connection
  }
}

// async function seedDepartments(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     const createTable = await client.sql`
//       CREATE TABLE IF NOT EXISTS Departments (
//         DepartmentId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//         DepartmentName VARCHAR(255) NOT NULL
//       );
//     `;

//     // Insert data into the "Departments" table
//     const insertedDepartments = await Promise.all(
//       departments.map(
//         (department) => client.sql`
//         INSERT INTO Departments (DepartmentName)
//         VALUES (${department.DepartmentName})
//         ON CONFLICT (DepartmentId) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedDepartments.length} departments`);

//     return {
//       createTable,
//       departments: insertedDepartments,
//     };
//   } catch (error) {
//     console.error('Error seeding departments:', error);
//     throw error;
//   }
// }


// async function seedEmployees(client) {
//   try {
//     await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//     // Create the "Employees" table if it doesn't exist
//     const createTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS employees (
//       EmployeeId UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       FirstName VARCHAR(255) NOT NULL,
//       LastName VARCHAR(255) NOT NULL,
//       Email VARCHAR(255) NOT NULL,
//       HireDate DATE,
//       DepartmentId UUID, -- Assuming DepartmentId is a UUID
//       FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
//     );
//     `;

//     console.log(`Created "Employees" table`);

//     // Insert data into the "employees" table
//     const insertedEmployees = await Promise.all(
//       employees.map(
//         (employee) => client.sql`
//         INSERT INTO employees (FirstName, LastName, Email, HireDate, DepartmentId)
//         VALUES (${employee.FirstName}, ${employee.LastName}, ${employee.Email}, ${employee.HireDate}, ${employee.DepartmentId})
//         ON CONFLICT (EmployeeId) DO NOTHING;
//       `,
//       ),
//     );

//     console.log(`Seeded ${insertedEmployees.length} employees`);

//     return {
//       createTable,
//       employees: insertedEmployees,
//     };
//   } catch (error) {
//     console.error('Error seeding employees:', error);
//     throw error;
//   }
// }

// async function seedTimeOffRequests(client) {
// try {
//   // Create the "TimeOffRequests" table if it doesn't exist
//   const createTimeOffRequestsTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS TimeOffRequests (
//       RequestID SERIAL PRIMARY KEY,
//       EmployeeID INT,
//       RequestDate DATE NOT NULL,
//       StartDate DATE NOT NULL,
//       EndDate DATE NOT NULL,
//       RequestType VARCHAR(50) NOT NULL,
//       Status VARCHAR(50) NOT NULL,
//       FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
//     );
//   `;

//   console.log(`Created "TimeOffRequests" table`);

//   // Insert data into the "TimeOffRequests" table
//   const insertedTimeOffRequests = await Promise.all(
//     timeOffRequests.map(
//       (request) => client.sql`
//       INSERT INTO TimeOffRequests (EmployeeID, RequestDate, StartDate, EndDate, RequestType, Status)
//       VALUES (${request.EmployeeID}, ${request.RequestDate}, ${request.StartDate}, ${request.EndDate}, ${request.RequestType}, ${request.Status})
//       RETURNING RequestID;
//     `,
//     ),
//   );

//   console.log(`Seeded ${insertedTimeOffRequests.length} time off requests`);

//   return {
//     createTimeOffRequestsTable,
//     timeOffRequests: insertedTimeOffRequests,
//   };
// } catch (error) {
//   console.error('Error seeding time off requests:', error);
//   throw error;
// }
// }

// async function seedApprovedRequests(client) {
// try {
//   // Create the "ApprovedRequests" table if it doesn't exist
//   const createApprovedRequestsTable = await client.sql`
//     CREATE TABLE IF NOT EXISTS ApprovedRequests (
//       RequestID INT PRIMARY KEY,
//       DepartmentID INT,
//       ApprovedDate DATE NOT NULL,
//       FOREIGN KEY (RequestID) REFERENCES TimeOffRequests(RequestID),
//       FOREIGN KEY (DepartmentID) REFERENCES Departments(DepartmentID)
//     );
//   `;

//   console.log(`Created "ApprovedRequests" table`);

//   // Insert data into the "ApprovedRequests" table
//   const insertedApprovedRequests = await Promise.all(
//     approvedRequests.map(
//       (request) => client.sql`
//       INSERT INTO ApprovedRequests (RequestID, DepartmentID, ApprovedDate)
//       VALUES (${request.RequestID}, ${request.DepartmentID}, ${request.ApprovedDate})
//       ON CONFLICT (RequestID) DO NOTHING;
//     `,
//     ),
//   );

//   console.log(`Seeded ${insertedApprovedRequests.length} approved requests`);

//   return {
//     createApprovedRequestsTable,
//     approvedRequests: insertedApprovedRequests,
//   };
// } catch (error) {
//   console.error('Error seeding approved requests:', error);
//   throw error;
// }
// }

async function main() {
  // const client = await db.connect();

  await seedUsers();
  // await seedDepartments(client);
  // await seedEmployees(client);
  // await seedTimeOffRequests(client);
  // await seedApprovedRequests(client);

}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
