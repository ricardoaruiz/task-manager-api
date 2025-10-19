import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../../app.js';

describe('Update Task', () => {
  it('should update a task successfully', async () => {
    // First, create a task to update later
    const createResponse = await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Task to Update',
        description: 'Description of task to update',
      })
      .expect(StatusCodes.CREATED);

    const createdTask = createResponse.body.data[0];

    // Now, update the created task
    const updatedData = {
      title: 'Updated Task Title',
      description: 'Updated description of task',
    };

    const updateResponse = await request(app.server)
      .put(`/tasks/${createdTask.id}`)
      .send(updatedData)
      .expect(StatusCodes.OK);

    const updatedTask = updateResponse.body.data[0];

    // Verify the task has been updated
    expect(updatedTask.title).toBe(updatedData.title);
    expect(updatedTask.description).toBe(updatedData.description);
  });

  it('should return 404 when updating a non-existing task', async () => {
    await request(app.server)
      .put('/tasks/00000000-0000-0000-0000-000000000000')
      .send({
        title: 'Non-existing Task',
        description: 'This task does not exist',
      })
      .expect(StatusCodes.NOT_FOUND);
  });

  it('should return 400 when updating a task with invalid title', async () => {
    await request(app.server)
      .put('/tasks/00000000-0000-0000-0000-000000000000')
      .send({
        title: '',
        description: 'This task does not exist',
      })
      .expect(StatusCodes.BAD_REQUEST);
  });

  it('should return 400 when updating a task with invalid description', async () => {
    await request(app.server)
      .put('/tasks/00000000-0000-0000-0000-000000000000')
      .send({
        title: 'Task title',
        description: '',
      })
      .expect(StatusCodes.BAD_REQUEST);
  });
});
