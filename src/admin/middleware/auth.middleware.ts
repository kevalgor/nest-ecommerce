import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { messageConstants } from '../../constants/message.constants';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private jwtService: JwtService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req.headers.authorization) {
      const adminToken = req.headers.authorization.split('Bearer ')[1];
      try {
        const payload = await this.jwtService.verifyAsync(adminToken, {
          secret: process.env.JWT_ADMIN_SECRET_KEY,
        });
        // We're assigning the payload to the request object here so that we can access it in our route handlers
        req['user'] = payload;
        next();
      } catch (err) {
        throw new UnauthorizedException(messageConstants.UNAUTHORIZED);
      }
    } else {
      throw new UnauthorizedException(messageConstants.UNAUTHORIZED);
    }
  }
}

export class AdminMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (req['user']) {
      const user = req['user'];
      if (user.role === 'admin') {
        next();
      } else {
        throw new ForbiddenException(messageConstants.FORBIDDEN);
      }
    } else {
      throw new ForbiddenException(messageConstants.FORBIDDEN);
    }
  }
}
