import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { randomUUID } from 'crypto'
import { Model } from 'mongoose'
import { Project, ProjectDocument } from '../projects/models'
import { CreateClientArgs, UpdateClientArgs } from './clients.resolver'
import { Client, ClientDocument } from './models'

@Injectable()
export class ClientsService {
	constructor(
		@InjectModel(Client.name)
		private readonly clientModel: Model<ClientDocument>,
		@InjectModel(Project.name)
		private readonly projectModel: Model<ProjectDocument>
	) {}

	async getClients(): Promise<Client[]> {
		const ref = await this.clientModel.find()

		return ref
	}

	async findClient(clientId: string): Promise<Client> {
		const ref = await this.clientModel.findById(clientId)
		if (!ref) {
			throw new NotFoundException('The client is not found')
		}

		return ref
	}

	async createClient(client: CreateClientArgs) {
		const newClient: Client = { ...client }
		const createdClient = new this.clientModel(newClient)
		const res = await createdClient.save()

		return res as Client
	}

	async updateClient({ id, ...updateInfo }: UpdateClientArgs) {
		const ref = await this.clientModel.findById(id)
		if (!ref) {
			throw new NotFoundException('The client is not found')
		}
		await ref.updateOne(updateInfo)

		Object.assign(ref, updateInfo)
		return ref
	}

	async deleteClient(clientId: string) {
		const ref = await this.clientModel.findById(clientId)
		if (!ref) {
			throw new NotFoundException('The client is not found')
		}
		ref.delete()

		// Delete related project
		await this.projectModel.deleteMany({
			client: clientId
		})

		return ref
	}
}
