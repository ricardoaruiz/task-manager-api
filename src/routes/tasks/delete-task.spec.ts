import { StatusCodes } from 'http-status-codes';
import request from 'supertest';
import { describe, it } from 'vitest';
import { app } from '../../app.js';

describe('Delete Task', () => {
  it('should delete a task successfully', async () => {
    // First, create a task to delete later
    const createResponse = await request(app.server)
      .post('/tasks/')
      .send({
        title: 'Task to Delete',
        description: 'Description of task to delete',
      })
      .expect(StatusCodes.CREATED);

    const createdTask = createResponse.body.data[0];

    // Verify the task exists
    await request(app.server)
      .get(`/tasks/${createdTask.id}`)
      .expect(StatusCodes.OK);

    // Now, delete the created task
    await request(app.server)
      .delete(`/tasks/${createdTask.id}`)
      .expect(StatusCodes.NO_CONTENT);

    // Verify the task has been deleted
    await request(app.server)
      .get(`/tasks/${createdTask.id}`)
      .expect(StatusCodes.NOT_FOUND);
  });

  it('should return 404 when deleting a non-existing task', async () => {
    await request(app.server)
      .delete('/tasks/00000000-0000-0000-0000-000000000000')
      .expect(StatusCodes.NOT_FOUND);
  });
});
