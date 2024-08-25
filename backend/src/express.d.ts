import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      fields: any; // Adjust this type as needed, e.g., use a specific interface for your fields
    }
  }
}
