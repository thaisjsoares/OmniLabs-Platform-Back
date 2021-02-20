import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import Course from '@modules/courses/infra/typeorm/entities/Courses';
import Modules from '@modules/modules/infra/typeorm/entities/Module';

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

    @ManyToOne(()=> Course)
    @JoinColumn({name: 'course_id'})
    course: Course

    @Column()
    course_id: string

    @ManyToOne(()=> Modules)
    @JoinColumn({name: 'module_id'})
    module: Modules

    @Column()
    module_id?: string
}

export default Lesson;
