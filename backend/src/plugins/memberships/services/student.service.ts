import { Injectable } from '@nestjs/common';
import { RequestContext, Product, TransactionalConnection } from '@vendure/core';

import { Student } from '../entities/student.entity';

@Injectable()
export class StudentService {
    constructor(private connection: TransactionalConnection) {}

    async createStudentReview(ctx: RequestContext, firstName: string, lastName: string): Promise<Student> {
        // Create a new Student entity with the provided data
        const student = new Student();
        student.firstName = firstName;
        student.lastName = lastName;
     

        // Save the new Student entity to the database
        return await this.connection.getRepository(ctx, Student).save(student);
    }


   
}