import { StatusCodes } from 'http-status-codes'
import request from 'supertest'
import { describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Health Check Route', () => {
  it('should be able to get working message', async () => {
    await expect(
      request(app.server).get('/health/check'),
    ).resolves.toMatchObject({
      status: StatusCodes.OK,
      body: {
        status: 'ok',
      },
    })
  })
})
