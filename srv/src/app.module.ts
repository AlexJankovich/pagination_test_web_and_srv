import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

const pg = () => {
  return new URL(process.env.APP_PG_URL);
};

// const pg = new URL(process.env.APP_PG_URL);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development.local'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: pg().hostname,
      port: parseInt(pg().port),
      username: pg().username,
      password: pg().password,
      database: pg().pathname.slice(1),
      ssl: pg().searchParams.get('sslmode') !== 'disable',
      autoLoadEntities: true,
      // it is unsafe to use synchronize: true for schema synchronization on production
      synchronize: false, // process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
      useUTC: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
