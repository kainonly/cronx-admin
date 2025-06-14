import { Component } from '@angular/core';

import { ShareModule } from '@common/share.module';

interface D {
  id: string;
  name: string;
  project_id: string;
  last_time: string;
  next_time: string;
  status: number;
}

@Component({
  standalone: true,
  imports: [ShareModule],
  selector: 'app-schedule',
  templateUrl: './schedule.component.html'
})
export class ScheduleComponent {
  datasource: D[] = [
    {
      id: '1',
      name: '任务调度名称-1',
      project_id: 'PROJ-001',
      last_time: '2025-06-10 08:30:00',
      next_time: '2025-06-15 09:00:00',
      status: 1
    },
    {
      id: '2',
      name: '任务调度名称-2',
      project_id: 'PROJ-002',
      last_time: '2025-06-11 14:15:00',
      next_time: '2025-06-16 10:30:00',
      status: -1
    },
    {
      id: '3',
      name: '任务调度名称-3',
      project_id: 'PROJ-003',
      last_time: '2025-06-09 16:45:00',
      next_time: '2025-06-14 14:00:00',
      status: 1
    },
    {
      id: '4',
      name: '任务调度名称-4',
      project_id: 'PROJ-001',
      last_time: '2025-06-12 09:20:00',
      next_time: '2025-06-17 11:15:00',
      status: -1
    },
    {
      id: '5',
      name: '任务调度名称-5',
      project_id: 'PROJ-004',
      last_time: '2025-06-08 11:00:00',
      next_time: '2025-06-13 15:30:00',
      status: 1
    },
    {
      id: '6',
      name: '任务调度名称-6',
      project_id: 'PROJ-002',
      last_time: '2025-06-10 15:30:00',
      next_time: '2025-06-15 16:00:00',
      status: -1
    },
    {
      id: '7',
      name: '任务调度名称-7',
      project_id: 'PROJ-005',
      last_time: '2025-06-11 08:45:00',
      next_time: '2025-06-16 09:30:00',
      status: 1
    },
    {
      id: '8',
      name: '任务调度名称-8',
      project_id: 'PROJ-003',
      last_time: '2025-06-09 10:20:00',
      next_time: '2025-06-14 10:00:00',
      status: -1
    },
    {
      id: '9',
      name: '任务调度名称-9',
      project_id: 'PROJ-006',
      last_time: '2025-06-12 16:15:00',
      next_time: '2025-06-17 14:45:00',
      status: 1
    },
    {
      id: '10',
      name: '任务调度名称-10',
      project_id: 'PROJ-004',
      last_time: '2025-06-08 14:30:00',
      next_time: '2025-06-13 16:00:00',
      status: -1
    },
    {
      id: '11',
      name: '任务调度名称-11',
      project_id: 'PROJ-001',
      last_time: '2025-06-10 09:10:00',
      next_time: '2025-06-15 11:30:00',
      status: 1
    },
    {
      id: '12',
      name: '任务调度名称-12',
      project_id: 'PROJ-007',
      last_time: '2025-06-11 11:45:00',
      next_time: '2025-06-16 13:00:00',
      status: -1
    },
    {
      id: '13',
      name: '任务调度名称-13',
      project_id: 'PROJ-002',
      last_time: '2025-06-09 13:20:00',
      next_time: '2025-06-14 12:30:00',
      status: 1
    },
    {
      id: '14',
      name: '任务调度名称-14',
      project_id: 'PROJ-005',
      last_time: '2025-06-12 08:00:00',
      next_time: '2025-06-17 09:45:00',
      status: -1
    },
    {
      id: '15',
      name: '任务调度名称-15',
      project_id: 'PROJ-008',
      last_time: '2025-06-08 16:45:00',
      next_time: '2025-06-13 14:30:00',
      status: 1
    },
    {
      id: '16',
      name: '任务调度名称-16',
      project_id: 'PROJ-003',
      last_time: '2025-06-10 12:30:00',
      next_time: '2025-06-15 15:00:00',
      status: -1
    },
    {
      id: '17',
      name: '任务调度名称-17',
      project_id: 'PROJ-006',
      last_time: '2025-06-11 17:00:00',
      next_time: '2025-06-16 16:30:00',
      status: 1
    },
    {
      id: '18',
      name: '任务调度名称-18',
      project_id: 'PROJ-004',
      last_time: '2025-06-09 10:15:00',
      next_time: '2025-06-14 11:15:00',
      status: -1
    },
    {
      id: '19',
      name: '任务调度名称-19',
      project_id: 'PROJ-009',
      last_time: '2025-06-12 14:45:00',
      next_time: '2025-06-17 13:00:00',
      status: 1
    },
    {
      id: '20',
      name: '任务调度名称-20',
      project_id: 'PROJ-007',
      last_time: '2025-06-08 09:30:00',
      next_time: '2025-06-13 10:45:00',
      status: -1
    },
    {
      id: '21',
      name: '任务调度名称-21',
      project_id: 'PROJ-001',
      last_time: '2025-06-10 11:20:00',
      next_time: '2025-06-15 14:30:00',
      status: 1
    },
    {
      id: '22',
      name: '任务调度名称-22',
      project_id: 'PROJ-010',
      last_time: '2025-06-11 09:50:00',
      next_time: '2025-06-16 11:15:00',
      status: -1
    },
    {
      id: '23',
      name: '任务调度名称-23',
      project_id: 'PROJ-002',
      last_time: '2025-06-09 15:30:00',
      next_time: '2025-06-14 16:00:00',
      status: 1
    },
    {
      id: '24',
      name: '任务调度名称-24',
      project_id: 'PROJ-005',
      last_time: '2025-06-12 11:15:00',
      next_time: '2025-06-17 10:30:00',
      status: -1
    },
    {
      id: '25',
      name: '任务调度名称-25',
      project_id: 'PROJ-008',
      last_time: '2025-06-08 13:45:00',
      next_time: '2025-06-13 12:00:00',
      status: 1
    },
    {
      id: '26',
      name: '任务调度名称-26',
      project_id: 'PROJ-003',
      last_time: '2025-06-10 16:00:00',
      next_time: '2025-06-15 17:30:00',
      status: -1
    },
    {
      id: '27',
      name: '任务调度名称-27',
      project_id: 'PROJ-006',
      last_time: '2025-06-11 08:15:00',
      next_time: '2025-06-16 09:00:00',
      status: 1
    },
    {
      id: '28',
      name: '任务调度名称-28',
      project_id: 'PROJ-004',
      last_time: '2025-06-09 12:45:00',
      next_time: '2025-06-14 13:30:00',
      status: -1
    },
    {
      id: '29',
      name: '任务调度名称-29',
      project_id: 'PROJ-011',
      last_time: '2025-06-12 10:30:00',
      next_time: '2025-06-17 12:00:00',
      status: 1
    },
    {
      id: '30',
      name: '任务调度名称-30',
      project_id: 'PROJ-007',
      last_time: '2025-06-08 15:20:00',
      next_time: '2025-06-13 17:45:00',
      status: -1
    },
    {
      id: '31',
      name: '任务调度名称-31',
      project_id: 'PROJ-001',
      last_time: '2025-06-10 09:45:00',
      next_time: '2025-06-15 11:00:00',
      status: 1
    },
    {
      id: '32',
      name: '任务调度名称-32',
      project_id: 'PROJ-012',
      last_time: '2025-06-11 14:30:00',
      next_time: '2025-06-16 15:45:00',
      status: -1
    },
    {
      id: '33',
      name: '任务调度名称-33',
      project_id: 'PROJ-002',
      last_time: '2025-06-09 11:10:00',
      next_time: '2025-06-14 10:30:00',
      status: 1
    },
    {
      id: '34',
      name: '任务调度名称-34',
      project_id: 'PROJ-005',
      last_time: '2025-06-12 16:45:00',
      next_time: '2025-06-17 14:15:00',
      status: -1
    },
    {
      id: '35',
      name: '任务调度名称-35',
      project_id: 'PROJ-008',
      last_time: '2025-06-08 10:20:00',
      next_time: '2025-06-13 11:30:00',
      status: 1
    },
    {
      id: '36',
      name: '任务调度名称-36',
      project_id: 'PROJ-003',
      last_time: '2025-06-10 13:30:00',
      next_time: '2025-06-15 14:45:00',
      status: -1
    },
    {
      id: '37',
      name: '任务调度名称-37',
      project_id: 'PROJ-006',
      last_time: '2025-06-11 17:15:00',
      next_time: '2025-06-16 18:00:00',
      status: 1
    },
    {
      id: '38',
      name: '任务调度名称-38',
      project_id: 'PROJ-004',
      last_time: '2025-06-09 14:00:00',
      next_time: '2025-06-14 15:30:00',
      status: -1
    },
    {
      id: '39',
      name: '任务调度名称-39',
      project_id: 'PROJ-013',
      last_time: '2025-06-12 09:15:00',
      next_time: '2025-06-17 10:00:00',
      status: 1
    },
    {
      id: '40',
      name: '任务调度名称-40',
      project_id: 'PROJ-007',
      last_time: '2025-06-08 17:00:00',
      next_time: '2025-06-13 16:30:00',
      status: -1
    },
    {
      id: '41',
      name: '任务调度名称-41',
      project_id: 'PROJ-001',
      last_time: '2025-06-10 11:00:00',
      next_time: '2025-06-15 13:30:00',
      status: 1
    },
    {
      id: '42',
      name: '任务调度名称-42',
      project_id: 'PROJ-014',
      last_time: '2025-06-11 10:30:00',
      next_time: '2025-06-16 12:15:00',
      status: -1
    },
    {
      id: '43',
      name: '任务调度名称-43',
      project_id: 'PROJ-002',
      last_time: '2025-06-09 16:15:00',
      next_time: '2025-06-14 17:00:00',
      status: 1
    },
    {
      id: '44',
      name: '任务调度名称-44',
      project_id: 'PROJ-005',
      last_time: '2025-06-12 08:45:00',
      next_time: '2025-06-17 09:30:00',
      status: -1
    },
    {
      id: '45',
      name: '任务调度名称-45',
      project_id: 'PROJ-008',
      last_time: '2025-06-08 14:00:00',
      next_time: '2025-06-13 15:45:00',
      status: 1
    },
    {
      id: '46',
      name: '任务调度名称-46',
      project_id: 'PROJ-003',
      last_time: '2025-06-10 14:45:00',
      next_time: '2025-06-15 16:30:00',
      status: -1
    },
    {
      id: '47',
      name: '任务调度名称-47',
      project_id: 'PROJ-006',
      last_time: '2025-06-11 09:30:00',
      next_time: '2025-06-16 11:00:00',
      status: 1
    },
    {
      id: '48',
      name: '任务调度名称-48',
      project_id: 'PROJ-004',
      last_time: '2025-06-09 10:45:00',
      next_time: '2025-06-14 12:00:00',
      status: -1
    },
    {
      id: '49',
      name: '任务调度名称-49',
      project_id: 'PROJ-015',
      last_time: '2025-06-12 13:00:00',
      next_time: '2025-06-17 14:45:00',
      status: 1
    },
    {
      id: '50',
      name: '任务调度名称-50',
      project_id: 'PROJ-007',
      last_time: '2025-06-08 12:30:00',
      next_time: '2025-06-13 13:30:00',
      status: -1
    }
  ];
}
