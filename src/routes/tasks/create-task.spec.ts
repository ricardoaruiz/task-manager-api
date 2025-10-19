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
        expect(data).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            title: 'Task Title',
            description: 'Task description',
          })
        );
      });
  });

  it('should not create a task with a duplicate title', async () => {
    const taskData = {
      title: 'Unique Task Title',
      description: 'Task description',
    };

    // First creation should succeed
    await request(app.server)
      .post('/tasks/')
      .send(taskData)
      .expect(StatusCodes.CREATED);

    // Second creation with the same title should fail
    await request(app.server)
      .post('/tasks/')
      .send(taskData)
      .expect(StatusCodes.UNPROCESSABLE_ENTITY)
      .expect((res) => {
        expect(res.body).toHaveProperty('error', 'Service Error');
        expect(res.body).toHaveProperty(
          'message',
          'A task with the same title already exists'
        );
      });
  });
});
