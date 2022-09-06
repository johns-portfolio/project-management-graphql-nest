import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ClientsModule } from '../clients/clients.module'
import { Project, ProjectSchema } from './models'
import { ProjectsResolver } from './projects.resolver'
import { ProjectsService } from './projects.service'

@Module({
	imports: [
		MongooseModule.forFeature([
			{
				name: Project.name,
				schema: ProjectSchema
			}
		]),
		ClientsModule
	],
	providers: [ProjectsService, ProjectsResolver]
})
export class ProjectsModule {}
