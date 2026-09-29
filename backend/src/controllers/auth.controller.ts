import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { CONFIG } from '../config/config';

export async function loginHandler(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required.' });
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    if (
      cleanEmail === CONFIG.DEFAULT_ADMIN.email.toLowerCase() &&
      password === CONFIG.DEFAULT_ADMIN.password
    ) {
      const payload = {
        userId: CONFIG.DEFAULT_ADMIN.id,
        email: CONFIG.DEFAULT_ADMIN.email,
        name: CONFIG.DEFAULT_ADMIN.name,
        role: CONFIG.DEFAULT_ADMIN.role,
      };

      const token = jwt.sign(payload, CONFIG.JWT_SECRET, { expiresIn: '7d' });

      res.json({
        success: true,
        message: 'Authentication successful.',
        token,
        user: {
          id: CONFIG.DEFAULT_ADMIN.id,
          email: CONFIG.DEFAULT_ADMIN.email,
          name: CONFIG.DEFAULT_ADMIN.name,
          role: CONFIG.DEFAULT_ADMIN.role,
        }
      });
      return;
    }

    res.status(401).json({
      success: false,
      error: 'Invalid credentials. Please verify your administrative email and password.'
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Authentication service error.' });
  }
}

export async function verifySessionHandler(req: Request, res: Response): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ authenticated: false });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET) as {
      userId: string;
      email: string;
      name: string;
      role: string;
    };

    res.json({
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
      }
    });
  } catch (error) {
    res.status(401).json({ authenticated: false, error: 'Expired or invalid session.' });
  }
}
