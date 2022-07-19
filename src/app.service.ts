import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactInfo } from './entities/contact-info-entity';
import { Employee } from './entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private readonly contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // IN A REAL APPLICATION, USE MIGRATIONS OR API TO ADD DATA
  // THIS IS JUST FOR LEARNING PURPOSES
  async seed() {
    // Employee 1 CEO
    const ceo = this.employeeRepository.create({
      name: 'Mr. CEO',
    });
    await this.employeeRepository.save(ceo);

    const ceoContactInfo = this.contactInfoRepository.create({
      email: 'ceo@email.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepository.save(ceoContactInfo);

    // Employee 2 macai
    const macai = this.employeeRepository.create({ name: 'luqman' });
    macai.manager = ceo;

    const task1 = this.taskRepository.create({ name: 'buat bodo' });
    await this.taskRepository.save(task1);
    const task2 = this.taskRepository.create({ name: 'buat kopi' });
    await this.taskRepository.save(task2);
    macai.tasks = [task1, task2];

    const meeting1 = this.meetingRepository.create({ zoomUrl: 'youtube.com' });
    meeting1.attendees = [ceo];
    await this.meetingRepository.save(meeting1);

    macai.meetings = [meeting1];
    await this.employeeRepository.save(macai);
  }

  getEmployeeById(id: number) {
    // return this.employeeRepository.findOne({
    //   relations: [
    //     'contactInfo',
    //     'manager',
    //     'directReports',
    //     'tasks',
    //     'meetings',
    //   ],
    //   where: { id },
    // });

    return this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.contactInfo', 'contactInfo')
      .leftJoinAndSelect('employee.manager', 'manager')
      .leftJoinAndSelect('employee.directReports', 'directReports')
      .leftJoinAndSelect('employee.tasks', 'tasks')
      .leftJoinAndSelect('employee.meetings', 'meetings')
      .where('employee.id = :employeeId', { employeeId: id })
      .getOne();
  }

  deleteEmployee(id: number) {
    return this.employeeRepository.delete(id);
  }
}
