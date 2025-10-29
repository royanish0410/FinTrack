import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IJWTPayload } from '../types';

/**
 * JWT Authentication Middleware
 * 
 * How JWT works in this application:
 * 
 * 1. USER REGISTERS/LOGS IN:
 *    - User provides email and password
 *    - Server validates credentials
 *    - Server generates a JWT token with user ID
 *    - Token is sent back to client
 * 
 * 2. CLIENT STORES TOKEN:
 *    - Frontend stores token in localStorage or memory
 *    - Token format: "Bearer <actual_token>"
 * 
 * 3. SUBSEQUENT REQUESTS:
 *    - Client includes token in Authorization header
 *    - This middleware extracts and verifies the token
 *    - If valid, user object is attached to request
 *    - Route handler can access user via req.user
 * 
 * 4. TOKEN STRUCTURE:
 *    {
 *      id: "user_id_from_database",
 *      iat: 1234567890,  // issued at
 *      exp: 1234567890   // expiration
 *    }
 */

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Extract token from Authorization header
    // Expected format: "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      // Split "Bearer token" and get the token part
      token = req.headers.authorization.split(' ')[1];
    }

    // Check if token exists
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Not authorized to access this route. Please login.'
      });
      return;
    }

    try {
      // Verify token with secret key
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as IJWTPayload;

      // Get user from database using ID from token
      // Exclude password from the result
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        res.status(401).json({
          success: false,
          message: 'User not found. Token may be invalid.'
        });
        return;
      }

      // Attach user to request object
      // Now all route handlers can access req.user
      req.user = user;

      next();
    } catch (error) {
      // Token verification failed
      if (error instanceof jwt.TokenExpiredError) {
        res.status(401).json({
          success: false,
          message: 'Token has expired. Please login again.'
        });
        return;
      }

      if (error instanceof jwt.JsonWebTokenError) {
        res.status(401).json({
          success: false,
          message: 'Invalid token. Please login again.'
        });
        return;
      }

      res.status(401).json({
        success: false,
        message: 'Token verification failed'
      });
      return;
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error in authentication'
    });
    return;
  }
};