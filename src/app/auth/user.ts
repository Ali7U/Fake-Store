export interface User {
  email: string;
  name: string;
  password: string;
  avatar: string;
}

export interface login {
  email: string;
  password: string;
}

export interface UserProfile {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin';
  avatar: string;
  creationAt?: string;
  updatedAt?: string;
}
