import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from './app.controller'
import { ClientsModule } from './clients/clients.module'
import { ProjectsModule } from './projects/projects.module'

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: true,
			playground: true
		}),
		MongooseModule.forRoot('mongodb://root:1234@localhost', {
      dbName: 'project-management'
    }),
		ClientsModule,
		ProjectsModule
	],
	controllers: [AppController],
	providers: []
})
export class AppModule {}
