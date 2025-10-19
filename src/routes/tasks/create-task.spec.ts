import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('Create Task', () => {
  it('should not create a task with invalid title', async () => {
    await request(app.server)
      .post('/tasks/')
      .send({
        title: '',
        description: 'A valid description',
      })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it('should not create a task with invalid description', async () => {
    await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Task Title',
        description: '',
      })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it('should create a task successfully', async () => {
    await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Task Title',
        description: 'Task description',
      })
      .expect(StatusCodes.CREATED)
      .expect((res) => {
        const { data } = res.body;
        expect(data[0]).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: 'Task Title',
            description: 'Task description',
          })
        );
      });
  });
});
