import { Request, Response, NextFunction } from "express";
import jwt, { SignOptions } from "jsonwebtoken";
import User from "../models/User";
import { AuthResponse, ApiResponse } from "../types";

/**
 * Generate JWT Token
 *
 * Creates a signed JWT token containing the user's ID.
 * The token is used for authentication in subsequent requests.
 *
 * @param id - User's database ID
 * @returns Signed JWT token string
 */
const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const expiresIn: SignOptions["expiresIn"] =
  (process.env.JWT_EXPIRE as jwt.SignOptions["expiresIn"]) || "7d";

const options: SignOptions = { expiresIn };

return jwt.sign({ id }, secret, options);
};

export default generateToken;
/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
      return;
    }

    // Create user (password auto-hashed in User model)
    const user = await User.create({ name, email, password });

    // Generate JWT token
    const token = generateToken(user._id.toString());

    // Send response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    } as ApiResponse<AuthResponse>);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user and include password
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Compare password
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
      return;
    }

    // Generate token
    const token = generateToken(user._id.toString());

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    } as ApiResponse<AuthResponse>);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get current logged-in user
 * @route   GET /api/auth/me
 * @access  Private (requires valid JWT token)
 */
export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // req.user is available due to protect middleware
    const user = await User.findById(req.user?.id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 *
 * NOTE: JWT is stateless — logout just confirms success,
 * frontend should delete the token locally.
 */
export const logout = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully. Please remove token from client.",
  });
};
