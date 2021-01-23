import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn
} from 'typeorm'

import Course from '@modules/courses/infra/typeorm/entities/Courses';

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
}

export default Lesson;
