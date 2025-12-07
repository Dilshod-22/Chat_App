import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  CheckServerStatus(): string {
    return 'Server is running!';
  }
}
