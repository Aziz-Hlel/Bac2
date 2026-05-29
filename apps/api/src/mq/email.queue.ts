import redis from '@/bootstrap/redis.init';
import QUEUE_NAMES from '@bac/contracts/const/queues.name';
import { EmailJob } from '@bac/contracts/jobs/emailJob';
import { Queue } from 'bullmq';

export const emailQueue = new Queue<EmailJob>(QUEUE_NAMES.email, {
  connection: redis,
  defaultJobOptions: {
    attempts: 3, // retry up to 3 times
    backoff: { type: 'exponential', delay: 5000 }, // retry with exponential backoff
    removeOnComplete: true, // auto remove successful jobs
    removeOnFail: false, // keep failed jobs for inspection
  },
});
