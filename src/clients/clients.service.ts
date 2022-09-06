import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { randomUUID } from 'crypto'
import { Model } from 'mongoose'
import { CreateClientArgs } from './clients.resolver'
import { Client, ClientDocument } from './models'

@Injectable()
export class ClientsService {
	constructor(
		@InjectModel(Client.name)
		private readonly clientModel: Model<ClientDocument>
	) {}

	async findClient(clientId: string): Promise<Client> {
		const data = await this.clientModel.findById(clientId)

		return data as Client
	}

	async createClient(client: CreateClientArgs) {
		const newClient: Client = { ...client }
		const createdClient = new this.clientModel(newClient)
		const res = await createdClient.save()

		return res as Client
	}
}
