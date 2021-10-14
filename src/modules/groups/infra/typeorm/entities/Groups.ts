import Courses from '@modules/courses/infra/typeorm/entities/Courses';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity('groups')
class Groups {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Courses)
    @JoinColumn({ name: 'course_id' })
    course: Courses;

    @Column()
    course_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
export default Groups;
