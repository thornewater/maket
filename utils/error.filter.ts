import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let message: string | string[] = exception['response']['message'];

    switch (exception.constructor) {
      case HttpException:
        message = exception.message;
        break;
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: message,
    });
  }
}
