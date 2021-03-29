import User from '@modules/courses/infra/typeorm/entities/Courses';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

@Entity('login_log')
class LoginLog {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    content: string;

    @Column()
    user_id: string;

    @Column()
    login_at: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

export default LoginLog;
