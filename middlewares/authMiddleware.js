import jwt from 'jsonwebtoken';
import { request } from '../services/userService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

export const verifyUser = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    try {
      // Verify user exists in user service
      const user = await request('GET', `/users/${req.user.id}`);
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      if (req.params.id_pengirim && req.params.id_pengirim !== req.user.id.toString()) {
        return res.status(403).json({ message: 'Unauthorized access' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

export const verifyAdmin = async (req, res, next) => {
  await verifyToken(req, res, async () => {
    try {
      // Verify user exists and is admin
      const user = await request('GET', `/users/${req.user.id}`);
      
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
      }

      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};