import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

import Course from '@modules/courses/infra/typeorm/entities/Courses';

@Entity('journey')
class Journey {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    technology: string;

    @Column()
    image: string;

    @ManyToOne(()=> Course)
    @JoinColumn({name: 'course_id'})
    course: Course

    @Column()
    course_id: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Journey;
