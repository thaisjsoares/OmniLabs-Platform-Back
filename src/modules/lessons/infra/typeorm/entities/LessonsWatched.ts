import User from '@modules/users/infra/typeorm/entities/User';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Lesson from './Lessons';

@Entity('lessons_watched')
class LessonsWatched {
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @ManyToOne(() => Lesson)
    @JoinColumn({ name: 'lesson_id' })
    lesson: Lesson;

    @Column()
    lesson_ud: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default LessonsWatched;
