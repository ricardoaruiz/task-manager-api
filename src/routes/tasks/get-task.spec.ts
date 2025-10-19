import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('Get Task', () => {
  it('should not retrieve a task with invalid id', async () => {
    await request(app.server)
      .get('/tasks/invalid-uuid')
      .expect(StatusCodes.BAD_REQUEST);
  });

  it('should retrieve a task successfully', async () => {
    // First, create a task to retrieve later
    const createResponse = await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Task to Retrieve',
        description: 'Description of task to retrieve',
      })
      .expect(StatusCodes.CREATED);

    const createdTask = createResponse.body.data;

    // Now, retrieve the created task
    await request(app.server)
      .get(`/tasks/${createdTask.id}`)
      .expect(StatusCodes.OK)
      .expect((res) => {
        const { data } = res.body;
        expect(data).toEqual(
          expect.objectContaining({
            id: createdTask.id,
            title: 'Task to Retrieve',
            description: 'Description of task to retrieve',
          })
        );
      });
  });

  it('should return 404 for non-existing task', async () => {
    await request(app.server)
      .get('/tasks/00000000-0000-0000-0000-000000000000')
      .expect(StatusCodes.NOT_FOUND)
      .expect((res) => {
        const { data } = res.body;
        expect(data).toBeUndefined();
      });
  });
});
