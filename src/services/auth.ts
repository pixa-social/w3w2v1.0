// Add admin authentication logic
export const AdminAuth = {
  async login(username: string, password: string): Promise<string> {
    if (username !== import.meta.env.VITE_ADMIN_USERNAME || 
        password !== import.meta.env.VITE_ADMIN_PASSWORD) {
      throw new Error('Invalid credentials');
    }

    return jwt.sign(
      { role: 'admin' },
      import.meta.env.VITE_JWT_SECRET,
      { expiresIn: '1h' }
    );
  },

  async verifyToken(token: string): Promise<{ role: string }> {
    try {
      return jwt.verify(token, import.meta.env.VITE_JWT_SECRET);
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};
