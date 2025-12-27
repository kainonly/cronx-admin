import { Job } from '@shared/models/job';

export interface Scheduler {
  id: string;
  key: string;
  status: boolean;
  name: string;
  timezone: string;
  jobs: Record<string, Job>;
}
