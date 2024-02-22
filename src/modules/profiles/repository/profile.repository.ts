import { ProfileErrors } from "./profile.repository.error";
import {
  Either,
  GenericAppError,
  Result,
  left,
  right,
  Utils,
  AddressDto,
  roles,
} from "../../../core";

import { MongoMessages, rolesNames, profileTypesName } from "../../../core";
import { Config } from "../../../config";

import { ProfileMap } from "../mappers/profileMap";
import {
  ProfileBaseDto,
  ProfilePartnerDto,
  UpdateProfileBaseDto,
  ProfileOperatorDto,
  UpdateProfileOperatorDto,
  UpdateProfilePartnerDto,
} from "../dtos";
import { UsersService } from "../../users/services/users.service";

type Response = Either<
  | GenericAppError.UnexpectedError
  | GenericAppError.NotFoundError
  | ProfileErrors.ProfileDoesNotExists
  | ProfileErrors.WrongType
  | Result<any>,
  Result<void>
>;

export interface IProfileRepo {
  saveAdmin(profileAdmin: ProfileBaseDto): Promise<Response>;
  updateAdmin(
    id: string,
    profileAdmin: UpdateProfileBaseDto
  ): Promise<Response>;
  saveOperator(profileOperator: ProfileOperatorDto): Promise<Response>;
  savePartner(profilePartner: ProfilePartnerDto): Promise<Response>;
  updateOperator(
    id: string,
    profileOperator: UpdateProfileOperatorDto
  ): Promise<Response>;
  updatePartner(
    id: string,
    profilePartner: UpdateProfilePartnerDto
  ): Promise<Response>;
  updateProfilePic(id: string, ulr: string): Promise<Response>;
  updateProfileAddress(
    id: string,
    mainAddress: boolean,
    address: AddressDto
  ): Promise<Response>;
  updateClient(
    id: string,
    profileClient: UpdateProfileBaseDto
  ): Promise<Response>;
  getAll(): Promise<Response>;
  getAllOperators(): Promise<Response>;
  getAllOperatorsParent(): Promise<Response>;
  getAllOperatorsByParent(id: string): Promise<Response>;
  getAllOperatorsByType(type: string): Promise<Response>;
  getById(id: string): Promise<Response>;
  getByEmail(email: string): Promise<Response>;
  saveEvidence(idProfile: string, type: string, raw: any): Promise<Response>;
  deleteEvidence(
    type: string,
    idProfile: string,
    idEvidence: string
  ): Promise<Response>;
  toggleActivePartner(id: string): Promise<Response>;
  toggleApprovePartner(id: string): Promise<Response>;
}

export class ProfileRepository implements IProfileRepo {
  private map: ProfileMap;
  private models: any;
  private removeId = { _id: 0 };

  /**
   *
   */
  constructor(models: any) {
    this.models = models;
    this.map = new ProfileMap();
  }
  public async saveAdmin(profileAdmin: ProfileBaseDto): Promise<Response> {
    const newProfile = this.models.ProfileBase;
    try {
      const profile = (await newProfile.schema.methods.CreateAdminProfile(
        profileAdmin
      )) as any;
      const user = (await this.createUser(
        profileAdmin.email,
        profileAdmin.identification.number,
        rolesNames.Admin
      )) as any;
      if (user.isRight()) {
        this.updateUserProfile(user.value.getValue(), profile);
      }
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateAdmin(
    id: string,
    profileAdmin: UpdateProfileBaseDto
  ): Promise<Response> {
    const profileModel = this.models.ProfileBase;
    try {
      const profile = (await profileModel.schema.methods.UpdateAdminProfile(
        id,
        profileAdmin
      )) as any;
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async saveOperator(
    profileOperator: ProfileOperatorDto
  ): Promise<Response> {
    const newProfile = this.models.ProfileOperator;
    try {
      const profile = await newProfile.schema.methods.CreateOperatorProfile(
        profileOperator
      );
      const user = (await this.createUser(
        profileOperator.email,
        profileOperator.identification.number,
        rolesNames.Operator
      )) as any;
      if (user.isRight()) {
        this.updateUserProfile(user.value.getValue(), profile);
      }
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async savePartner(
    profilePartner: ProfilePartnerDto
  ): Promise<Response> {
    try {
      const newProfile = this.models.ProfilePartner;
      const profile = await newProfile.schema.methods.CreatePartnerProfile(
        profilePartner
      );
      const user = (await this.createUser(
        profilePartner.email,
        profilePartner.identification.number,
        roles.Associated
      )) as any;
      if (user.isRight()) {
        this.updateUserProfile(user.value.getValue(), profile);
      }
      return right(Result.ok<any>(profilePartner)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error));
    }
  }
  public async updateOperator(
    id: string,
    profileOperator: UpdateProfileOperatorDto
  ): Promise<Response> {
    const updateProfile = this.models.ProfileOperator;
    try {
      const profile = (await updateProfile.schema.methods.UpdateOperatorProfile(
        id,
        profileOperator
      )) as any;
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updatePartner(
    id: string,
    profilePartner: UpdateProfilePartnerDto
  ): Promise<Response> {
    const updateProfile = this.models.ProfilePartner;
    try {
      const profile = (await updateProfile.schema.methods.UpdatePartnerProfile(
        id,
        profilePartner
      )) as any;
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateProfilePic(id: string, url: string): Promise<Response> {
    try {
      const newProfile = this.models.ProfileBase;
      const idUpdated = await newProfile.schema.methods.UpdateProfilePicture(
        id,
        url
      );
      if (idUpdated) {
        return right(Result.ok<any>(id)) as Response;
      } else {
        return left(new ProfileErrors.ProfileDoesNotExists()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateProfileAddress(
    id: string,
    mainAddress: boolean,
    address: AddressDto
  ): Promise<Response> {
    try {
      const newProfile = this.models.ProfileOperator;
      const idUpdated = await newProfile.schema.methods.AddUpdateAddress(
        id,
        mainAddress,
        address
      );
      if (idUpdated) {
        return right(Result.ok<any>(id)) as Response;
      } else {
        return left(new ProfileErrors.ProfileDoesNotExists()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateClient(
    id: string,
    profileClient: UpdateProfileBaseDto
  ): Promise<Response> {
    const profileModel = this.models.ProfileBase;
    try {
      const profile = (await profileModel.schema.methods.UpdateClientProfile(
        id,
        profileClient
      )) as any;
      return right(Result.ok<any>(profile)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAll(): Promise<Response> {
    try {
      const profiles = await this.models.ProfileBase.find();
      if (profiles.length > 0) {
        let viewProfiles: any[] = [];
        profiles.forEach((element: any) => {
          if (element.email !== Config.superUserEmail)
            viewProfiles.push(this.map.toAdminDto(element));
        });
        return right(Result.ok<any>(viewProfiles)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllOperators(): Promise<Response> {
    try {
      const profiles = await this.models.ProfileBase.find({
        typeProfile: MongoMessages.profileDiscriminator.operator,
      })
        .populate("mainUser")
        .exec();
      let viewProfiles: any[] = [];
      for (const element of profiles) {
        if (element.email !== Config.superUserEmail) {
          const operator = await this.models.OperatorBase.findOne({
            operatorProfile: element._id,
          });
          viewProfiles.push(this.map.toOperatorDto(element, operator));
        }
      }
      return right(Result.ok<any>(viewProfiles)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllOperatorsParent(): Promise<Response> {
    try {
      const profiles = await this.models.ProfileBase.find({
        typeProfile: MongoMessages.profileDiscriminator.operator,
      })
        .populate("mainUser")
        .exec();
      if (profiles.length > 0) {
        let viewProfiles: any[] = [];
        profiles.forEach((element: any) => {
          if (element.email !== Config.superUserEmail) {
            viewProfiles.push(this.map.toPartnerDto(element));
          }
        });
        return right(Result.ok<any>(viewProfiles)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllOperatorsByParent(id: string): Promise<Response> {
    try {
      const profiles = await this.models.ProfileBase.find({
        typeProfile: MongoMessages.profileDiscriminator.partner,
        parentOperator: id,
      })
        .populate("mainUser")
        .exec();
      let viewProfiles: any[] = [];
      profiles.forEach((element: any) => {
        if (element.email !== Config.superUserEmail)
          viewProfiles.push(this.map.toPartnerDto(element));
      });
      return right(Result.ok<any>(viewProfiles)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllOperatorsByType(type: string): Promise<Response> {
    try {
      var query: any = {
        typeProfile: MongoMessages.profileDiscriminator.operator,
      };
      switch (type) {
        case profileTypesName.Audit:
          query = { ...query, "profileType.audit": true };
          break;
        case profileTypesName.Consultancy:
          query = { ...query, "profileType.consultancy": true };
          break;
        case profileTypesName.Teaching:
          query = { ...query, "profileType.teaching": true };
          break;
        default:
          break;
      }
      const profiles = await this.models.ProfileBase.find(query)
        .populate("mainUser")
        .exec();
      if (profiles.length > 0) {
        let viewProfiles: any[] = [];
        for (const element of profiles) {
          if (element.email !== Config.superUserEmail) {
            const operator = await this.models.OperatorBase.findOne({
              operatorProfile: element._id,
            });
            viewProfiles.push(this.map.toOperatorDto(element, operator));
          }
        }
        return right(Result.ok<any>(viewProfiles)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getById(id: string): Promise<Response> {
    try {
      const profile = await this.models.ProfileBase.findById(id);
      if (profile) {
        let viewProfile: any;
        switch (profile.typeProfile) {
          case MongoMessages.profileDiscriminator.operator:
            const operator = await this.models.OperatorBase.findOne({
              operatorProfile: profile._id,
            });
            viewProfile = this.map.toOperatorDto(profile, operator);
            break;
          case MongoMessages.profileDiscriminator.partner:
            viewProfile = this.map.toPartnerDto(profile);
            break;
          case MongoMessages.profileDiscriminator.client:
            const client = await this.models.Client.findOne({
              contact: profile._id,
            });
            viewProfile = this.map.toContactDto(profile, client._id);
            break;
          default:
            viewProfile = this.map.toAdminDto(profile);
            break;
        }
        return right(Result.ok<any>(viewProfile)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getByEmail(email: string): Promise<Response> {
    try {
      var query = {
        email: { $regex: new RegExp(`^${email.toLowerCase()}`, "i") },
      };
      const profile = await this.models.ProfileBase.findOne(query);
      if (profile) {
        let viewProfile: any;
        switch (profile.typeProfile) {
          case MongoMessages.profileDiscriminator.operator:
            const operator = await this.models.OperatorBase.findOne({
              operatorProfile: profile._id,
            });
            viewProfile = this.map.toOperatorDto(profile, operator);
            break;
          case MongoMessages.profileDiscriminator.partner:
            viewProfile = this.map.toPartnerDto(profile);
            break;
          case MongoMessages.profileDiscriminator.client:
            const client = await this.models.Client.findOne({
              contact: profile._id,
            });
            viewProfile = this.map.toContactDto(profile, client._id);
            break;
          default:
            viewProfile = this.map.toAdminDto(profile);
            break;
        }
        return right(Result.ok<any>(viewProfile)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async saveEvidence(
    idProfile: string,
    type: string,
    raw: any
  ): Promise<Response> {
    const newProfile = this.models.ProfilePartner;
    try {
      if (type === "st") {
        const profileSt = await newProfile.schema.methods.AddStudyEvidence(
          idProfile,
          raw
        );
        return right(Result.ok<any>(profileSt)) as Response;
      } else if (type === "xp") {
        const profileSt = await newProfile.schema.methods.AddExperienceEvidence(
          idProfile,
          raw
        );
        return right(Result.ok<any>(profileSt)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new ProfileErrors.WrongType()) as Response;
    }
  }
  public async deleteEvidence(
    type: string,
    idProfile: string,
    idEvidence: string
  ): Promise<Response> {
    const newProfile = this.models.ProfilePartner;
    try {
      if (type === "st") {
        const profileSt = await newProfile.schema.methods.RemoveStudyEvidence(
          idProfile,
          idEvidence
        );
        return right(Result.ok<any>(profileSt)) as Response;
      } else if (type === "xp") {
        const profileSt =
          await newProfile.schema.methods.RemoveExperinceEvidence(
            idProfile,
            idEvidence
          );
        return right(Result.ok<any>(profileSt)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new ProfileErrors.WrongType()) as Response;
    }
  }
  public async toggleActivePartner(id: string): Promise<Response> {
    const partnerModel = this.models.ProfilePartner;
    try {
      const toggleActive = await partnerModel.schema.methods.ToggleActive(id);
      return right(Result.ok<any>(toggleActive)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async toggleApprovePartner(id: string): Promise<Response> {
    const partnerModel = this.models.ProfilePartner;
    try {
      const toggleActive = await partnerModel.schema.methods.ToggleActive(id);
      return right(Result.ok<any>(toggleActive)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }

  //HELPERS
  public async updateUserProfile(
    idUser: string,
    idProfile: string
  ): Promise<Response> {
    try {
      const profile = await this.models.ProfileBase.findById(idProfile);
      if (profile) {
        profile.mainUser = idUser;
        profile.lastUpdate = Date.now();
        profile.save();
        return right(Result.ok<any>()) as Response;
      } else {
        return left(new ProfileErrors.ProfileDoesNotExists()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  private async createUser(
    email: string,
    username: string,
    role: string
  ): Promise<any> {
    try {
      const userDto = {
        email: email,
        username: username,
        password: Utils.generatePassword(),
        role: role,
      };
      const userService = new UsersService();
      return (await userService.CreateUser(userDto)) as Response;
    } catch (e) {
      return left(new GenericAppError.UnexpectedError(e)) as Response;
    }
  }
}
