import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let message: string | string[];

    switch (exception.constructor) {
      case HttpException:
        status = exception.getStatus();
        message = exception.message;
        break;

      case QueryFailedError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = 'dataSource Error';
        break;

      default:
        message = exception['response']['message'];
    }

    response.status(status).json({
      statusCode: status,
      path: request.url,
      message: message,
    });
  }
}
