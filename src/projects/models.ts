import { ArgsType, Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Schema as DbSchema } from 'mongoose'
import { IsEmail, IsInt, IsUUID, Length, Min } from 'class-validator'
import { Client } from '../clients/models'

@ObjectType()
@Schema()
export class Project {
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
	description: string

	@Field()
	@Prop()
	status: ProjectStatus = 'new'

	@Field()
	@Prop({ type: DbSchema.Types.ObjectId, ref: 'Client' })
	client: Client
}

export type ProjectStatus = 'new' | 'progress' | 'completed'
export type ProjectDocument = Project & Document
export const ProjectSchema = SchemaFactory.createForClass(Project)
