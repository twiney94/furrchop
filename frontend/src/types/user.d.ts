export interface User {
  id: any;
  '@id': string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}