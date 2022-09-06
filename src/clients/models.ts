import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as DbSchema } from 'mongoose'
import { IsEmail, IsInt, IsUUID, Length, Min } from 'class-validator'

@ObjectType()
@Schema()
export class Client {
	@Field(() => String)
	@IsUUID()
	_id?: DbSchema.Types.ObjectId

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

export type ClientDocument = Client & Document
export const ClientSchema = SchemaFactory.createForClass(Client)
