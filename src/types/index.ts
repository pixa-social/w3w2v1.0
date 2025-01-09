export interface FileData {
  cid: string;
  name: string;
  size: number;
  type: string;
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  storageUsed: number;
  storageLimit: number;
  xrpAddress?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
