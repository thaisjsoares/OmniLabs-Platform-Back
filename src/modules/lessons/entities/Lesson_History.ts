import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import Groups from '../../groups/entities/Groups';
import Lessons from './Lessons';

@Entity('lesson_history')
class Lesson_History {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => Lessons)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lessons;

    @Column()
    lesson_id: string;

    @ManyToOne(() => Groups)
    @JoinColumn({ name: 'group_id' })
    group: Groups;

    @Column()
    group_id: string;

    @Column()
    title: string;

    @Column('decimal')
    duration: number;

    @Column()
    description: string;

    @Column()
    resource: string;

    @Column('timestamp with time zone')
    released_at: Date;

    @Column()
    platform: string;

    @Column()
    name: string;

    @Column()
    link: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson_History;
