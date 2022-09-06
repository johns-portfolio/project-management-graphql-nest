import { Args, ArgsType, Field, Mutation, Query, Resolver } from '@nestjs/graphql'
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
	@Prop()
	name: string

	@Field()
	@IsEmail()
	@Length(1, 100)
	@Prop()
	email: string

	@Field()
	@Prop()
	phone: string
}


@Resolver((of) => Client)
export class ClientsResolver {
	constructor(private readonly clientsService: ClientsService) {}

	@Query((returns) => Client, { name: 'client' })
	async findClient(@Args() params: FindClientArgs) {
		return await this.clientsService.findClient(params.id)
	}

	@Mutation((returns) => Client)
	async createClient(@Args() params: CreateClientArgs) {
		return await this.clientsService.createClient(params)
	}
}
