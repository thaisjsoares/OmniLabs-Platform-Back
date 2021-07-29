import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import User from '../../../../courses/infra/typeorm/entities/Courses';

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
