import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { ClientsService } from '../clients/clients.service'
import { Project } from './models'
import {
	CreateProjectInput,
	DeleteProjectInput,
	UpdateProjectInput
} from './projects.resolver'

@Injectable()
export class ProjectsService {
	constructor(
		@InjectModel(Project.name) private readonly projectModel: Model<Project>,
		private readonly clientsService: ClientsService
	) {}

	async getProjects() {
		const ref = await this.projectModel.find().populate('client')
		if (!ref) {
			throw new NotFoundException('The project is not found')
		}

		return ref
	}

	async createProject(params: CreateProjectInput): Promise<Project> {
		const client = await this.clientsService.findClient(params.clientId)
		if (!client) {
			throw new NotFoundException('The client is not found')
		}

		const newProject: Project = {
			name: params.name,
			description: params.description,
			status: params.status as any,
			client: client
		}

		const createdProject = new this.projectModel(newProject)
		await createdProject.save()

		return createdProject
	}

	async updateProject({
		id,
		...projectInfo
	}: UpdateProjectInput): Promise<Project> {
		const ref = await this.projectModel.findById(id)
		if (!ref) {
			throw new NotFoundException('The project is not found')
		}
		await ref.updateOne(projectInfo)

		Object.assign(ref, projectInfo)
		return ref
	}

	async deleteProject(projectId: string): Promise<Project> {
		const ref = await this.projectModel.findById(projectId)
		if (!ref) {
			throw new NotFoundException('The project is not found')
		}
		ref.delete()

		return ref
	}
}
