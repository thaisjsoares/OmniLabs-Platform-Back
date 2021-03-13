import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm'

import Course from '@modules/courses/infra/typeorm/entities/Courses';
import { Expose } from 'class-transformer';
import uploadConfig from '@config/upload';

@Entity('journey')
class Journey {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    image: string;

    @Expose({ name: 'image_url' })
    getAvatarUrl(): string | null {
        if (!this.image) {
            return null;
        }

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.image}`;
            default:
                return null;
        }
    }

    @ManyToOne(()=> Course)
    @JoinColumn({name: 'course_id'})
    course: Course

    @Column()
    course_id: string

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default Journey;
