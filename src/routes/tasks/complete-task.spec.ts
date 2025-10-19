import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('Complete Task', () => {
  it('should complete a task successfully', async () => {
    // First, create a task to complete later
    const createResponse = await request(app.server).post('/tasks').send({
      title: 'Test Task',
      description: 'This is a test task',
    });

    expect(createResponse.status).toBe(StatusCodes.CREATED);
    const taskId = createResponse.body.data.id;

    // Now, complete the created task
    const completeResponse = await request(app.server)
      .patch(`/tasks/${taskId}`)
      .send({
        completed: true,
      });

    expect(completeResponse.status).toBe(StatusCodes.OK);
    expect(completeResponse.body.data.completed).toBe(1);
  });

  it('should return 404 for non-existing task', async () => {
    const nonExistingTaskId = '123e4567-e89b-12d3-a456-426614174000'; // Example UUID

    const response = await request(app.server)
      .patch(`/tasks/${nonExistingTaskId}`)
      .send({
        completed: true,
      });

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
  });
});
