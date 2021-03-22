import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  CreateDateColumn
} from 'typeorm'

import Groups from '@modules/groups/infra/typeorm/entities/Groups'

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

    @ManyToOne(() => Groups)
    @JoinColumn({ name: 'group_id' })
    group: Groups

    @Column()
    group_id: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson
