import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn
} from 'typeorm'

@Entity('login_log')
class LoginLog {
      @PrimaryGeneratedColumn()
      id: string

      @Column()
      content: string

      @CreateDateColumn()
      login_at: Date;
}

export default LoginLog
