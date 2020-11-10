import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {typeOrmConfig} from './config/typeOrmConfig'


@Module({
    imports: [
        TypeOrmModule.forRoot(
            typeOrmConfig
          ),
        GraphQLModule.forRoot({
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),

        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService, 
        
    ]
})
export class AppModule {}