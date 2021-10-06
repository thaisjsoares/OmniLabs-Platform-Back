import { Expose } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '../../../../../config/upload';
import Course from '../../../../courses/infra/typeorm/entities/Courses';

@Entity('journey')
class Journey {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Expose({ name: 'image_url' })
    getAvatarUrl(): string | null {
        if (!this.image) {
            return null;
        }

        switch (process.env.STORAGE_DRIVER) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.image}`;
            case 's3':
                return `${process.env.AWS_BUCKET_URL}/uploads/${this.image}`;
            default:
                return null;
        }
    }

    @ManyToOne(() => Course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column()
    course_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Journey;
