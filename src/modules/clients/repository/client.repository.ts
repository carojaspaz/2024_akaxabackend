import { ClientErrors } from './client.repository.errors'
import { Either, GenericAppError, Result, left, right, Utils, AddressDto } from '../../../core'

import { rolesNames } from '../../../core'
import { Config } from '../../../config'

import { ClientMap } from '../mappers/clientMap'
import { ClientDto, BranchOfficeDto, UpdateClientDto, SectorsDto } from '../dtos'
import { ProfileBaseDto, UpdateProfileBaseDto } from '../../profiles/dtos'
import { UsersService } from '../../users/services/users.service'
import { String } from 'aws-sdk/clients/acm'

type Response = Either<
    GenericAppError.UnexpectedError |
    GenericAppError.NotFoundError |
    ClientErrors.ClientDoesNotExists |
    Result<any>,
    Result<void>>

export interface IClientRepo {
    save(client: ClientDto): Promise<Response>
    saveBranchOffice(branchOffice: BranchOfficeDto): Promise<Response>
    addOperatorToClient(idClient: string, idOperator: string): Promise<Response>
    addOperatorToBranchOffice(idClient: string, idOperator: string): Promise<Response>
    saveProfile(id: string, profileClient: ProfileBaseDto): Promise<Response>
    update(id: string, client: ClientDto): Promise<Response>
    updateBranchOffice(id: string, branchOffice: BranchOfficeDto): Promise<Response>
    updateClientAddress(id: string, address: AddressDto): Promise<Response>
    updateClientSectors(id: string, sectors: SectorsDto[]): Promise<Response>
    updateProfile(id: string, profileClient: UpdateProfileBaseDto): Promise<Response>
    updateProfilePic(id: string, ulr: string): Promise<Response>
    updateProfileAddress(id: string, mainAddress: boolean, address: AddressDto): Promise<Response>
    toggleActiveClient(id: string): Promise<Response>
    toggleActiveBranch(id: string): Promise<Response>
    getAll(): Promise<Response>
    getAllByOperator(id: String): Promise<Response>
    getById(id: string): Promise<Response>
    getAllBranchesById(id: string): Promise<Response>
    getAllBranchesByIdMin(id: string): Promise<Response>
    getBranchById(id: string): Promise<Response>
    getClientsAndBranches(): Promise<Response>
    getClientsAndBranchesByOperator(id: string): Promise<Response>
    getAllAudits(id: string): Promise<Response>
}

export class ClientRepository implements IClientRepo {
    private map: ClientMap
    private models: any
    private removeId = { "_id": 0 }

    constructor(models: any) {
        this.models = models
        this.map = new ClientMap()
    }
    public async getAllAudits(id: string): Promise<Response> {
        try {
            const audits = await this.models.Audit.find({ 'client': id })
                .populate('auditor')
                .exec()
            let viewAudits: any[] = []
            audits.forEach((element: any) => {
                viewAudits.push(this.map.toEvaluationDto(element))
            })
            return right(Result.ok<any>(viewAudits)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }

    public async updateProfilePic(id: string, url: string): Promise<Response> {
        try {
            const newProfile = this.models.ProfileClient
            const idUpdated = await newProfile.schema.methods.UpdateProfilePicture(id, url)
            if (idUpdated) {
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new ClientErrors.ClientDoesNotExists()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async save(client: ClientDto): Promise<Response> {
        const clientModel = this.models.Client
        try {
            const newClient = await clientModel.schema.methods.CreateClient(client) as any
            return right(Result.ok<any>(newClient)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async saveBranchOffice(branchOffice: BranchOfficeDto): Promise<Response> {
        const branchOfficeModel = this.models.BranchOffice
        try {
            const activitiesType = branchOffice.activities.map((a: any) => a.type)
            if (activitiesType.includes('TODO')) {
                const activities = await this.models.ActivityVerify.find({ description: { $ne: 'TODO' } })
                branchOffice.activities = activities.map((a: any) => { return { type: a.description, isSelected: true } })
            }
            const newClient = await branchOfficeModel.schema.methods.CreateBranchOffice(branchOffice) as any
            return right(Result.ok<any>(newClient)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async addOperatorToClient(idClient: string, idOperator: string): Promise<Response> {
        const clientModel = this.models.Client
        try {
            const newClient = await clientModel.schema.methods.AddOperator(idClient, idOperator) as any
            return right(Result.ok<any>(newClient)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async addOperatorToBranchOffice(idBranch: string, idOperator: string): Promise<Response> {
        const branchOfficeModel = this.models.BranchOffice
        try {
            const newBranch = await branchOfficeModel.schema.methods.AddOperator(idBranch, idOperator) as any
            return right(Result.ok<any>(newBranch)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async update(id: string, client: UpdateClientDto): Promise<Response> {
        const clientModel = this.models.Client
        try {
            const updateClient = await clientModel.schema.methods.UpdateClient(id, client) as any
            return right(Result.ok<any>(updateClient))
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateBranchOffice(id: string, branchOffice: BranchOfficeDto): Promise<Response> {
        const BranchOfficeModel = this.models.BranchOffice
        try {
            const updateBranchOffice = await BranchOfficeModel.schema.methods.UpdateBranchOffice(id, branchOffice) as any
            return right(Result.ok<any>(updateBranchOffice))
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateClientAddress(id: string, address: AddressDto): Promise<Response> {
        try {
            const clientModel = this.models.Client
            const idUpdated = await clientModel.schema.methods.AddUpdateAddress(id, address)
            if (idUpdated) {
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new ClientErrors.ClientDoesNotExists()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateClientSectors(id: string, sectors: SectorsDto[]): Promise<Response> {
        try {
            const clientModel = this.models.Client
            const idUpdated = await clientModel.schema.methods.AddUpdateSectors(id, sectors)
            if (idUpdated) {
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new ClientErrors.ClientDoesNotExists()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async toggleActiveClient(id: string): Promise<Response> {
        const clientModel = this.models.Client
        try {
            const toggleActive = await clientModel.schema.methods.ToggleActive(id)
            return right(Result.ok<any>(toggleActive)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async toggleActiveBranch(id: string): Promise<Response> {
        const branchOfficeModel = this.models.BranchOffice
        try {
            const toggleActive = await branchOfficeModel.schema.methods.ToggleActive(id)
            return right(Result.ok<any>(toggleActive)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async saveProfile(id: string, profileClient: ProfileBaseDto): Promise<Response> {
        const profileModel = this.models.ProfileClient
        const clientModel = this.models.Client
        try {
            const user = await this.createUser(profileClient.email, profileClient.identification.number, rolesNames.Client) as any
            if (user.isRight()) {
                const profile = await profileModel.schema.methods.CreateClientProfile(profileClient)
                await clientModel.schema.methods.AddProfile(profile, id)
                this.updateUserProfile(user.value.getValue()._id, profile)
                return right(Result.ok<any>(profile)) as Response
            } else {
                return user
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateProfile(id: string, profileClient: UpdateProfileBaseDto): Promise<Response> {
        const profileModel = this.models.ProfileClient
        try {
            const profile = await profileModel.schema.methods.UpdateClientProfile(id, profileClient) as any
            return right(Result.ok<any>(profile)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async updateProfileAddress(id: string, mainAddress: boolean, address: AddressDto): Promise<Response> {
        try {
            const profileModel = this.models.ProfileClient
            const idUpdated = await profileModel.schema.methods.AddUpdateAddress(id, mainAddress, address)
            if (idUpdated) {
                return right(Result.ok<any>(id)) as Response
            } else {
                return left(new ClientErrors.ClientDoesNotExists()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAll(): Promise<Response> {
        try {
            const clients = await this.models.Client.find()
                .populate('idOperator', 'firstName lastName')
                .populate({
                    path: 'typeCompany',
                    populate: {
                        path: 'riskLevel',
                        select: 'risk level'
                    }
                })
                .exec()
            let viewClients: any[] = []
            clients.forEach((element: any) => {
                if (element.email !== Config.superUserEmail) viewClients.push(this.map.toClientDtoAdmin(element))
            })
            return right(Result.ok<any>(viewClients)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllByOperator(id: string): Promise<Response> {
        try {
            const activities = await this.models.ActivityVerify.find({})
            const clients = await this.models.BranchOffice.find({ 'idOperator': id })
                .populate('idOperator', 'firstName lastName')
                .populate('mainOffice', '_id legalName codeCIIU identification description')
                .populate({
                    path: 'typeCompany',
                    populate: {
                        path: 'riskLevel',
                        select: 'risk level'
                    }
                })
                .exec()
            let viewClients: any[] = []
            clients.forEach((element: any) => {
                if (element.email !== Config.superUserEmail) viewClients.push(this.map.toViewBranchDto(element, activities))
            })
            return right(Result.ok<any>(viewClients)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllBranchesById(id: string): Promise<Response> {
        try {
            const filter = { mainOffice: id }
            const branches = await this.models.BranchOffice.find(filter)
                .populate('idOperator', 'firstName lastName legalName businessName typeOperator')
                .populate('mainOffice', '_id legalName businessName email codeCIIU')
                .exec()
            let viewBranches = branches.map((b: any) => { { return this.map.toBranchOfficeDto(b) } })
            return right(Result.ok<any>(viewBranches)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getAllBranchesByIdMin(id: string): Promise<Response> {
        try {
            const filter = { mainOffice: id }
            const branches = await this.models.BranchOffice.find(filter)
            let viewBranches = branches.map((b: any) => { return { id: b._id, name: b.branchOffice } })
            return right(Result.ok<any>(viewBranches)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getById(id: string): Promise<Response> {
        try {
            const client = await this.models.Client.findById(id)
                .populate('idOperator', 'firstName lastName')
                .populate({
                    path: 'typeCompany',
                    select: 'type riskLevel',
                    populate: {
                        path: 'riskLevel',
                        select: 'risk level'
                    }
                })
                .exec()
            if (client) {
                const viewClient = this.map.toClientDtoAdmin(client)
                return right(Result.ok<any>(viewClient)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getBranchById(id: string): Promise<Response> {
        try {
            const branchOffice = await this.models.BranchOffice.findById(id)
                .populate('idOperator', 'firstName lastName legalName businessName typeOperator')
                .populate('mainOffice', 'legalName businessName email codeCIIU')
                .exec()
            if (branchOffice) {
                const viewBranche = this.map.toBranchOfficeDto(branchOffice)
                return right(Result.ok<any>(viewBranche)) as Response
            } else {
                return left(new GenericAppError.NotFoundError()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getClientsAndBranches(): Promise<Response> {
        try {
            const clients = await this.models.Client.find({}, '_id legalName codeCIIU activities')
            const branches = await this.models.BranchOffice.find({}, '_id branchOffice activities mainOffice')
            const activities = await this.models.ActivityVerify.find({})
            let viewClients = this.map.toViewClientWithBranches(clients, branches, activities)
            return right(Result.ok<any>(viewClients)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    public async getClientsAndBranchesByOperator(id: string): Promise<Response> {
        try {
            const clients = await this.models.Client.find({ 'idOperator': id }, '_id legalName codeCIIU activities')
            const branches = await this.models.BranchOffice.find({}, '_id branchOffice activities mainOffice')
            const activities = await this.models.ActivityVerify.find({})
            let viewClients = this.map.toViewClientWithBranches(clients, branches, activities)
            return right(Result.ok<any>(viewClients)) as Response
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    // HELPERS
    public async updateUserProfile(idUser: string, idProfile: string): Promise<Response> {
        try {
            const profile = await this.models.ProfileBase.findById(idProfile)
            if (profile) {
                profile.mainUser = idUser
                profile.lastUpdate = Date.now()
                profile.save()
                return right(Result.ok<any>()) as Response
            } else {
                return left(new ClientErrors.ClientDoesNotExists()) as Response
            }
        } catch (error) {
            return left(new GenericAppError.UnexpectedError(error)) as Response
        }
    }
    private async createUser(email: string, username: string, role: string): Promise<any> {
        try {
            const userDto = {
                "email": email,
                "username": username,
                "password": Utils.generatePassword(),
                "role": role
            }
            const userService = new UsersService()
            return await userService.CreateUser(userDto) as Response
        } catch (e) {
            return left(new GenericAppError.UnexpectedError(e)) as Response
        }
    }
}