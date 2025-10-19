import { ServiceException } from './ServiceException.js';

export class DuplicateTaskException extends ServiceException {
  constructor(message: string) {
    super(message);
    this.name = 'DuplicateTaskException';
  }
}
