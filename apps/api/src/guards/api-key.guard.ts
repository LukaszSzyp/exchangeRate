import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly apiKey = process.env.API_KEY;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const incomingKey = request.headers['x-api-key'];

    if (incomingKey !== this.apiKey) {
      throw new UnauthorizedException('Invalid API Key');
    }

    return true;
  }
}
