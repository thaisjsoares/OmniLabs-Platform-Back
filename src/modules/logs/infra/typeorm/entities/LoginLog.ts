import User from '@modules/courses/infra/typeorm/entities/Courses';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm'

@Entity('login_log')
class LoginLog {
      @PrimaryGeneratedColumn()
      id: string

      @Column()
      content: string

      @Column()
      user_id: string;

      @ManyToOne(() => User)
      @JoinColumn({ name: 'user_id' })
      user: User;

      @CreateDateColumn()
      login_at: Date;
}

export default LoginLog
