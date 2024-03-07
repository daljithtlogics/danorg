import { DeepPartial } from '@vendure/common/lib/shared-types';
import { VendureEntity, EntityId, ID } from '@vendure/core';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
class Student extends VendureEntity {
    constructor(input?: DeepPartial<Student>) {
        super(input);
    }

    
    
    @EntityId()
    Id: ID;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}