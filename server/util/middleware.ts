import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

declare module 'express-serve-static-core' {
  interface Request {
    decodedToken: jwt.JwtPayload
  }
}

export const tokenExtractor = (req: Request, res: Response, next: NextFunction): void | Response => {
  const authorization = req.get('authorization')
  console.log('extractor: ', authorization);

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      if (typeof process.env.JWT_SECRET === 'string')
        req.decodedToken = jwt.verify(authorization.substring(7), process.env.JWT_SECRET) as jwt.JwtPayload
    } catch {
      return res.status(401).json({ error: 'token invalid' })
    }
  } else {
    return res.status(401).json({ error: 'token missing' })
  }
  next()
}