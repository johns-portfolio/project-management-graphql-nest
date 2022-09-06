import {
	Args,
	ArgsType,
	Field,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'
import { IsEmail, IsInt, IsUUID, Length, Min } from 'class-validator'
import { ClientsService } from './clients.service'
import { Client } from './models'

@ArgsType()
export class FindClientArgs {
	@Field()
	@IsUUID()
	id: string
}

@ArgsType()
export class CreateClientArgs {
	@Field()
	@Length(1, 100)
	name: string

	@Field()
	@IsEmail()
	@Length(1, 100)
	email: string

	@Field()
	phone: string
}

@ArgsType()
export class UpdateClientArgs {
	@Field()
	@IsUUID()
	id: string

	@Field({ nullable: true })
	@Length(1, 100)
	name?: string

	@Field({ nullable: true })
	@IsEmail()
	@Length(1, 100)
	email?: string

	@Field({ nullable: true })
	phone?: string
}

@ArgsType()
export class DeleteClientArgs {
	@Field()
	@IsUUID()
	id: string
}

@Resolver((of) => Client)
export class ClientsResolver {
	constructor(private readonly clientsService: ClientsService) {}

	@Query((returns) => [Client], { name: 'clients' })
	async getClients() {
		return await this.clientsService.getClients()
	}

	@Query((returns) => Client, { name: 'client' })
	async findClient(@Args() params: FindClientArgs) {
		return await this.clientsService.findClient(params.id)
	}

	@Mutation((returns) => Client)
	async createClient(@Args() params: CreateClientArgs) {
		return await this.clientsService.createClient(params)
	}

	@Mutation((returns) => Client)
	async updateClient(@Args() params: UpdateClientArgs) {
		return await this.clientsService.updateClient(params)
	}

	@Mutation((returns) => Client)
	async deleteClient(@Args() params: DeleteClientArgs) {
		return await this.clientsService.deleteClient(params.id)
	}
}
