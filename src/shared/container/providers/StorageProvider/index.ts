import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import { S3StorageProvider } from './implementations/S3StorageProvider';
import IStorageProvider from './models/IStorageProvider';

const diskStorage = {
    disk: DiskStorageProvider,
    s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
    'StorageProvider',
    diskStorage[process.env.STORAGE_DRIVER],
);
