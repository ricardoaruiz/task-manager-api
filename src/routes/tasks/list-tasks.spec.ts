import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('List Tasks', () => {
  it('should list all tasks', async () => {
    // Create a couple of tasks to ensure there is data to list
    await request(app.server)
      .post('/tasks/')
      .send({
        title: 'First Task',
        description: 'First task description',
      })
      .expect(StatusCodes.CREATED);

    await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Second Task',
        description: 'Second task description',
      })
      .expect(StatusCodes.CREATED);

    // Now, list all tasks
    await request(app.server)
      .get('/tasks/')
      .expect(StatusCodes.OK)
      .expect((res) => {
        const { data } = res.body;
        expect(Array.isArray(data)).toBe(true);
        expect(data.length).toBeGreaterThanOrEqual(2);
      });
  });
});
