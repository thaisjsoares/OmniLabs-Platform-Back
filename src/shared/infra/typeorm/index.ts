import { createConnections } from 'typeorm';

createConnections().then(() => {
    console.log('🗃🗃 Database Connected');
});
// procura arquivo ormconfig.json para olhar as configurações
