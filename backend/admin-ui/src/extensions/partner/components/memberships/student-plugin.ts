import { VendurePlugin } from '@vendure/core';
import { Student } from './student.entity';

@VendurePlugin({
    entities: [Student],
})
export class StudentPlugin {}