import { Request, Response } from 'express';
import { HttpMethod, HttpFunction } from '../decorator/Http.decorator';
import Schedule from '../model/Schedule';
import { NewBody, ExistingBody } from '../interface/Schedule.inteface';
import { ClientError } from '../type/Error';

export const add = HttpFunction(
  'System was unable to create a new schedule for the employee.',
  (req, res) => {
    const bSchedule: Body = req.body.schedule;
    const schedule: Schedule = Schedule.generate(bSchedule);
    schedule.add();
  }
);

export const remove = HttpFunction(
  'System was unable to delete the schedule.',
  (req, res) => {
    const { id } = req.body.schedule as Partial<ExistingBody>;
    const schedule: Schedule[] = Schedule.search({ id });
    schedule[0].remove();
  }
);

export const update = HttpFunction(
  'System was unable to update the schedule.',
  (req, res) => {
    const { id } = req.body.schedule as Partial<ExistingBody>;
    const schedule: Schedule[] = Schedule.search({ id });
    schedule[0].update(req.body.schedule);
  }
);

export const partion = HttpFunction(
  'System was unable to partion the schedules',
  (req, res) => {}
);
