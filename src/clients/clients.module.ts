import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Project, ProjectSchema } from '../projects/models'
import { ClientsResolver } from './clients.resolver'
import { ClientsService } from './clients.service'
import { Client, ClientSchema } from './models'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Client.name,
				schema: ClientSchema
			},
			{
				name: Project.name,
				schema: ProjectSchema
			}
		])
	],
	providers: [ClientsService, ClientsResolver],
	exports: [ClientsService]
})
export class ClientsModule {}
