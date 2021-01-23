import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';


import uploadConfig from '@config/upload';

import { Exclude, Expose } from 'class-transformer';

@Entity('courses')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

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

        switch (uploadConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.image}`;
            default:
                return null;
        }
    }
}

export default User;
