import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';


@Module({
    imports: [
        GraphQLModule.forRoot({
            typePaths: ['./**/*.graphql'],
            context:({req})=>({headers:req.headers}),
        }),
        UserModule
    ],
    controllers: [AppController],
    providers: [
        AppService, 
        
    ]
})
export class AppModule {}