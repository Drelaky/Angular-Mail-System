import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';
export declare class EntityNotFoundExceptionFilter<T> implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): void;
}
