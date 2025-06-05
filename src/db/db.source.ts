import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { UserEntitiy } from './entities/user-entity';

export const dbConnection = [
  {
    provide: 'DataSource',
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [UserEntitiy],
        logging: true,
      });

      return dataSource.initialize();
    },

    inject: [ConfigService],
  },
];
