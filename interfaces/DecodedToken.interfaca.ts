import jwt from 'jsonwebtoken';

export default interface DecodedToken extends jwt.DecodeOptions {
    userId: string;
    email: string;
    iat: number;
  }
  