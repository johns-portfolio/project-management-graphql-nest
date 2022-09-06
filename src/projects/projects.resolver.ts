import {
	Args,
	ArgsType,
	Field,
	Mutation,
	Query,
	Resolver
} from '@nestjs/graphql'
import { Length, IsEmail, IsUUID } from 'class-validator'
import { Project, ProjectStatus } from './models'
import { ProjectsService } from './projects.service'

@ArgsType()
export class CreateProjectInput {
	@Field()
	@Length(1, 100)
	name: string

	@Field()
	@IsEmail()
	@Length(1, 100)
	description: string

	@Field()
	status: ProjectStatus

	@Field()
	clientId: string
}

@ArgsType()
export class UpdateProjectInput {
	@Field()
	@IsUUID()
	id: string

	@Field({ nullable: true })
	@Length(1, 100)
	name: string

	@Field({ nullable: true })
	@IsEmail()
	@Length(1, 100)
	description: string

	@Field({ nullable: true })
	status: ProjectStatus

	@Field({ nullable: true })
	clientId: string
}

@ArgsType()
export class DeleteProjectInput {
	@Field()
	@IsUUID()
	id: string
}

@Resolver((of) => Project)
export class ProjectsResolver {
	constructor(private readonly projectsService: ProjectsService) {}

	@Query((returns) => [Project], { name: "projects"})
	async getProjects(): Promise<Project[]> {
		return await this.projectsService.getProjects()
	}

	@Mutation((returns) => Project)
	async createProject(@Args() params: CreateProjectInput): Promise<Project> {
		return await this.projectsService.createProject(params)
	}

	@Mutation((returns) => Project)
	async updateProject(@Args() params: UpdateProjectInput): Promise<Project> {
		return await this.projectsService.updateProject(params)
	}

	@Mutation((returns) => Project)
	async deleteProject(@Args() params: DeleteProjectInput): Promise<Project> {
		return await this.projectsService.deleteProject(params.id)
	}
}
