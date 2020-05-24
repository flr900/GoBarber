// eslint-disable-next-line no-unused-vars
import { Request, Response, NextFunction } from 'express'

import { verify } from 'jsonwebtoken'
import authConfig from '../config/auth'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated (request: Request, response: Response, next:NextFunction) : void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error('JWT token is missing')
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secretKey)

    const { sub } = decoded as TokenPayload

    request.User = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new Error('Invalid JWT token!')
  }
}
