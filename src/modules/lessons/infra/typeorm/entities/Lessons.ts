import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('lessons')
class Lesson {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    type: 'video' | 'link' | 'material';

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Lesson;
