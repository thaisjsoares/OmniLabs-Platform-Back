import { Expose } from 'class-transformer';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

import uploadConfig from '../../../../../config/upload';

@Entity('courses')
class Courses {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Expose({ name: 'image_url' })
    getImageUrl(): string | null {
        if (!this.image) {
            return null;
        }

        switch (process.env.STORAGE_DRIVER) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.image}`;
            default:
                return null;
        }
    }
}

export default Courses;
