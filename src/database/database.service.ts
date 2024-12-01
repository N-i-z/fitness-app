// // src/database/database.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';

// @Injectable()
// export class DatabaseService {
//   private tenantDatabases: { [key: string]: PrismaClient } = {};

//   getTenantDatabase(tenantName?: string): PrismaClient {
//     const effectiveTenantName = tenantName || 'Default Tenant';
//     const dbName = `${effectiveTenantName.replace(/\s+/g, '_').toLowerCase()}_db`;
//     console.log(`Attempting to connect to database: ${dbName}`);

//     if (!this.tenantDatabases[dbName]) {
//       this.tenantDatabases[dbName] = new PrismaClient({
//         datasources: {
//           db: {
//             url: `postgresql://postgres:postgrespassword@localhost:5432/${dbName}`,
//           },
//         },
//       });
//     }
//     return this.tenantDatabases[dbName];
//   }
// }
