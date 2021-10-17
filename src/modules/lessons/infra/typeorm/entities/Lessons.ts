import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Groups from '../../../../groups/infra/typeorm/entities/Groups';

@Entity('lessons')
class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

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

export default Lesson;
