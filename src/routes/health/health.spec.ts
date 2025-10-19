import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('Health Check', () => {
  it('should return status code 200 OK', async () => {
    const response = await request(app.server).get('/health/check');
    expect(response.status).toBe(StatusCodes.OK);
  });
});
