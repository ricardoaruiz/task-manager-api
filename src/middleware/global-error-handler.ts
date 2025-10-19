/** biome-ignore-all lint/suspicious/useAwait: ignored here */
import type { FastifyReply, FastifyRequest } from 'fastify';
import {
  hasZodFastifySchemaValidationErrors,
  isResponseSerializationError,
} from 'fastify-type-provider-zod';
import { StatusCodes } from 'http-status-codes';

export async function globalErrorHandler(
  error: Error,
  _request: FastifyRequest,
  reply: FastifyReply
) {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.code(StatusCodes.BAD_REQUEST).send({
      error: 'Validation Error',
      errors: error.validation.map((issue) => ({
        field: issue.instancePath,
        message: issue.message,
      })),
    });
  }

  if (isResponseSerializationError(error)) {
    return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: 'Internal Server Error',
      errors: error.cause.issues.map((issue) => ({
        field: issue.input,
        message: issue.message,
      })),
    });
  }

  return reply.code(StatusCodes.INTERNAL_SERVER_ERROR).send({
    error: 'Internal Server Error',
    message: error.message,
  });
}
