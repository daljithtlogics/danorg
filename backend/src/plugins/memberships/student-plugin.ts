import { VendurePlugin } from '@vendure/core';
import { Student } from './entities/student.entity';

@VendurePlugin({
    entities: [Student],
})
export class StudentPlugin {}