import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import Journey from '../../../../journey/infra/typeorm/entities/Journey';

@Entity('groups')
class Groups {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Journey)
    @JoinColumn({ name: 'journey_id' })
    journey: Journey;

    @Column()
    journey_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
export default Groups;
