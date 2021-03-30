import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToOne,
    JoinColumn,
} from 'typeorm';
import Roles from '../../../../roles/entities/Roles';
import User from './User';

@Entity('users_roles')
class UserRole {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    user_id: string;

    @CreateDateColumn()
    // eslint-disable-next-line camelcase
    created_at: Date;

    @UpdateDateColumn()
    // eslint-disable-next-line camelcase
    updated_at: Date;

    @ManyToOne(() => Roles)
    @JoinColumn({ name: 'role_id' })
    roles: Roles;

    @Column()
    role_id: string;
}

export default UserRole;
