import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm'

import Course from '@modules/courses/infra/typeorm/entities/Courses';
import Modules from '@modules/modules/infra/typeorm/entities/Module';
import Journey from '@modules/journey/infra/typeorm/entities/Journey';

@Entity('lessons')
class Lesson {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    duration: number

    @Column()
    video_id: string

    @ManyToOne(()=> Journey)
    @JoinColumn({name: 'journey_id'})
    journey: Journey

    @Column()
    journey_id: string

    @ManyToOne(()=> Modules)
    @JoinColumn({name: 'module_id'})
    module: Modules

    @Column()
    module_id?: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson;
