import type { LoginCredentials, SignupCredentials, AuthResponse, User } from '../types';

// Professional JWT Authentication Service
class AuthService {
  private readonly STORAGE_KEY = 'zerocode_auth';
  private readonly TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry
  private readonly MOCK_USERS = [
    {
      id: '1',
      email: 'demo@zerocode.com',
      password: 'demo123',
      name: 'Demo User',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      createdAt: new Date().toISOString()
    }
  ];

  // Simulate API delay for realistic UX
  private async delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Professional JWT token generation
  private generateJWT(user: any): string {
    const payload = {
      userId: user.id,
      email: user.email,
      name: user.name,
      iat: Math.floor(Date.now() / 1000), // Issued at
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours expiry
      iss: 'zerocode-app', // Issuer
      aud: 'zerocode-users' // Audience
    };
    
    // In production, this would use a proper JWT library with secret signing
    return btoa(JSON.stringify(payload));
  }

  // Professional token verification
  verifyToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token));
      
      // Check if token is expired
      if (payload.exp < Math.floor(Date.now() / 1000)) {
        console.log('Token expired');
        return null;
      }
      
      // Find user
      const user = this.MOCK_USERS.find(u => u.id === payload.userId);
      if (!user) {
        console.log('User not found');
        return null;
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      console.error('Token verification failed:', error);
      return null;
    }
  }

  // Check if token needs refresh
  shouldRefreshToken(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token));
      const timeUntilExpiry = (payload.exp * 1000) - Date.now();
      return timeUntilExpiry < this.TOKEN_REFRESH_THRESHOLD;
    } catch {
      return true;
    }
  }

  // Professional login with validation
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.delay(1000); // Simulate API call

    // Validate input
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    // Find user
    const user = this.MOCK_USERS.find(u => 
      u.email.toLowerCase() === credentials.email.toLowerCase() && 
      u.password === credentials.password
    );

    if (!user) {
      throw new Error('Invalid email or password');
    }

    // Generate JWT token
    const token = this.generateJWT(user);
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    };
  }

  // Professional signup with validation
  async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    await this.delay(1500); // Simulate API call

    // Validate input
    if (!credentials.name || !credentials.email || !credentials.password) {
      throw new Error('All fields are required');
    }

    if (credentials.password !== credentials.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (credentials.password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    // Check if user already exists
    const existingUser = this.MOCK_USERS.find(u => 
      u.email.toLowerCase() === credentials.email.toLowerCase()
    );

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const newUser = {
      id: String(this.MOCK_USERS.length + 1),
      email: credentials.email,
      password: credentials.password,
      name: credentials.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`,
      createdAt: new Date().toISOString()
    };

    this.MOCK_USERS.push(newUser);

    // Generate JWT token
    const token = this.generateJWT(newUser);
    const { password, ...userWithoutPassword } = newUser;

    return {
      user: userWithoutPassword,
      token,
      message: 'Account created successfully'
    };
  }

  // Professional auth data management
  saveAuthData(authData: AuthResponse): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(authData));
    } catch (error) {
      console.error('Failed to save auth data:', error);
    }
  }

  getAuthData(): AuthResponse | null {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return null;

      const authData = JSON.parse(data);
      
      // Verify token is still valid
      if (!this.verifyToken(authData.token)) {
        this.logout();
        return null;
      }

      // Check if token needs refresh
      if (this.shouldRefreshToken(authData.token)) {
        console.log('Token refresh needed');
        // In production, this would call the backend to refresh
        // For now, we'll just regenerate the token
        const newToken = this.generateJWT(authData.user);
        authData.token = newToken;
        this.saveAuthData(authData);
      }

      return authData;
    } catch (error) {
      console.error('Failed to get auth data:', error);
      this.logout();
      return null;
    }
  }

  // Professional logout with cleanup
  logout(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      // In production, you might also call the backend to invalidate the token
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  }

  // Check authentication status
  isAuthenticated(): boolean {
    return this.getAuthData() !== null;
  }

  // Get current user
  getCurrentUser(): User | null {
    const authData = this.getAuthData();
    return authData?.user || null;
  }

  // Update user profile
  updateUserProfile(updates: Partial<User>): void {
    const authData = this.getAuthData();
    if (authData) {
      const updatedUser = { ...authData.user, ...updates };
      const updatedAuthData = { ...authData, user: updatedUser };
      this.saveAuthData(updatedAuthData);
    }
  }
}

export const authService = new AuthService();
