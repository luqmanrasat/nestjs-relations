import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactInfo } from './entities/contact-info-entity';
import { Employee } from './entities/employee.entity';
import { Meeting } from './entities/meeting.entity';
import { Task } from './entities/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      username: 'postgres',
      password: 'pass123',
      entities: ['dist/**/*.entity.js'],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Employee, ContactInfo, Meeting, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
