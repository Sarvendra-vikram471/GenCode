
export type GeneratedCode = {
  [filePath: string]: string;
};

export interface ChatFile {
  name: string;
  type: string; // MIME type
  data: string; // base64 encoded data
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  files?: ChatFile[];
  isCode?: boolean; // To know if the model message contains code to render
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}