import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientsResolver } from './clients.resolver'
import { ClientsService } from './clients.service'
import { Client, ClientSchema } from './models'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Client.name,
				schema: ClientSchema
			}
		])
	],
	providers: [ClientsService, ClientsResolver]
})
export class ClientsModule {}
