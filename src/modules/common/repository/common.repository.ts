import {
  Either,
  GenericAppError,
  Result,
  left,
  right,
  ciiu,
  MailService,
} from "../../../core";
import { CompanyTypeDto, KeyValueDto } from "../dtos";
import { CommonMap } from "../mappers/commonMap";
export interface ICommonRepo {
  getCountries(): Promise<Response>;
  getActiveCountries(): Promise<Response>;
  getStatesCountries(countryCode: string): Promise<Response>;
  getMunicipalitiesStates(stateCode: string): Promise<Response>;
  getPopulateCenterMunicipality(municipalityCode: string): Promise<Response>;
  getAllActivityVerify(): Promise<Response>;
  getAllConditionsRisk(): Promise<Response>;
  getAllTypesList(): Promise<Response>;
  getCIIU(): Promise<Response>;
  getSector(sector: string): Response;
  getDivision(code: string): Promise<Response>;
  getDivisionName(sector: string, division: string): Response;
  getSubDivision(sector: string, division: string): Promise<Response>;
  getSubDivisionName(
    sector: string,
    division: string,
    subDivision: string
  ): Response;
  saveActivityVerify(activity: string, description: string): Promise<Response>;
  toggleActivityVerify(id: string): Promise<Response>;
  getAllActivityVerify(): Promise<Response>;
  getAllConditionsRisk(): Promise<Response>;
  getAllTypesList(): Promise<Response>;
  getAllRiskTypes(): Promise<Response>;
  saveTypeCompany(type: CompanyTypeDto): Promise<Response>;
  updateTypeCompany(id: string, type: CompanyTypeDto): Promise<Response>;
  getAllTypesCompany(): Promise<Response>;
  sendMail(email: string): Promise<Response>;
  getKeys(): Promise<Response>;
  getValueKey(key: string, isProd: boolean): Promise<Response>;
  setKey(keyValue: KeyValueDto): Promise<Response>;
  updateKey(keyValue: KeyValueDto): Promise<Response>;
}

type Response = Either<
  GenericAppError.UnexpectedError | GenericAppError.NotFoundError | Result<any>,
  Result<void>
>;

export class CommonRepository implements ICommonRepo {
  private map: CommonMap;
  private models: any;
  private removeId = { _id: 0 };

  constructor(models: any) {
    this.models = models;
    this.map = new CommonMap();
  }

  public async getKeys(): Promise<Response> {
    try {
      const values = await this.models.KeyValue.find({}, this.removeId);
      if (values.length > 0) {
        return right(Result.ok<any>(values)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getValueKey(key: string, isProd: boolean): Promise<Response> {
    try {
      const value = await this.models.KeyValue.findOne({
        key: key,
        isProd: isProd,
      }).select("value");
      if (value) {
        return right(Result.ok<any>(value)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async setKey(keyValue: KeyValueDto): Promise<Response> {
    const newKeyValue = this.models.KeyValue;
    try {
      const id = await newKeyValue.schema.methods.SetKey(keyValue);
      return right(Result.ok<any>(id)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateKey(keyValue: KeyValueDto): Promise<Response> {
    const updateKeyValue = this.models.KeyValue;
    try {
      const id = await updateKeyValue.schema.methods.UpdateKey(keyValue);
      return right(Result.ok<any>(id)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getPopulateCenterMunicipality(
    municipalityCode: string
  ): Promise<Response> {
    try {
      const states = await this.models.Colombia.aggregate([
        { $match: { municipality: municipalityCode } },
        {
          $group: {
            _id: { populateCenter: "$populateCenter" },
            code: { $first: "$populateCenter" },
            name: { $first: "$populatedCenterName" },
          },
        },
        { $sort: { code: 1 } },
        { $project: { _id: 0 } },
      ]);
      if (states.length > 0) {
        return right(Result.ok<any>(states)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getMunicipalitiesStates(stateCode: string): Promise<Response> {
    try {
      const states = await this.models.Colombia.aggregate([
        { $match: { state: stateCode } },
        {
          $group: {
            _id: { municipality: "$municipality" },
            code: { $first: "$municipality" },
            name: { $first: "$municipalityName" },
          },
        },
        { $sort: { code: 1 } },
        { $project: { _id: 0 } },
      ]);
      if (states.length > 0) {
        return right(Result.ok<any>(states)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getStatesCountries(countryCode: string): Promise<Response> {
    try {
      let states = [];
      const template = new RegExp(`^${countryCode}$`, "gi");
      switch (true) {
        case template.test("CO"):
          states = await this.models.Colombia.aggregate([
            {
              $group: {
                _id: { state: "$state" },
                code: { $first: "$state" },
                name: { $first: "$stateName" },
              },
            },
            { $sort: { name: 1 } },
            { $project: { _id: 0 } },
          ]);
          break;
        default:
          states = [];
          break;
      }
      if (states.length > 0) {
        return right(Result.ok<any>(states)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getActiveCountries(): Promise<Response> {
    try {
      const countries = await this.models.Country.find({ active: true }).select(
        { _id: 0, name: 1, code: 1 }
      );
      if (countries.length > 0) {
        return right(Result.ok<any>(countries)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getCountries(): Promise<Response> {
    try {
      const countries = await this.models.Country.find().select({
        _id: 0,
        name: 1,
        code: 1,
      });
      if (countries.length > 0) {
        return right(Result.ok<any>(countries)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getCIIU(): Promise<Response> {
    try {
      var sectionsCiiu: any = [];
      const data: any = ciiu();
      const sections = Object.getOwnPropertyNames(data);
      sections.forEach((item, i) => {
        sectionsCiiu.push({ code: item, title: data[item].titulo });
      });
      return right(Result.ok<any>(sectionsCiiu)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public getSector(sector: string): Response {
    try {
      var sectionsCiiu: any = [];
      const data: any = ciiu();
      const sections = Object.getOwnPropertyNames(data);
      return right(Result.ok<any>(data[sector].titulo)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getDivision(code: string): Promise<Response> {
    try {
      const data: any = ciiu();
      var section: any = data[code];
      var divisions = Object.getOwnPropertyNames(section.divisiones);
      var divisionSection: any = [];
      divisions.forEach((item, i) => {
        divisionSection.push({
          code: item,
          title: section.divisiones[item].titulo,
        });
      });
      return right(Result.ok<any>(divisionSection)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public getDivisionName(sector: string, division: string): Response {
    try {
      const data: any = ciiu();
      var section: any = data[sector];
      var divisions = Object.getOwnPropertyNames(section.divisiones);
      return right(
        Result.ok<any>(section.divisiones[division].titulo)
      ) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getSubDivision(
    section: string,
    division: string
  ): Promise<Response> {
    try {
      const data: any = ciiu();
      var divisions: any = data[section].divisiones[division];
      var subdivisions = Object.getOwnPropertyNames(divisions.subdivisiones);
      var subdivisionsDivision: any = [];
      subdivisions.forEach((item, i) => {
        subdivisionsDivision.push({
          code: item,
          title: divisions.subdivisiones[item].titulo,
        });
      });
      return right(Result.ok<any>(subdivisionsDivision)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public getSubDivisionName(
    sector: string,
    division: string,
    subDivision: string
  ): Response {
    try {
      const data: any = ciiu();
      var divisions: any = data[sector].divisiones[division];
      return right(
        Result.ok<any>(divisions.subdivisiones[subDivision].titulo)
      ) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getActivities(
    section: string,
    division: string,
    subdivision: string
  ): Promise<Response> {
    try {
      const data: any = ciiu();
      var subdivisions: any =
        data[section].divisiones[division].subdivisiones[subdivision];
      var activities = Object.getOwnPropertyNames(subdivisions.actividades);
      var activitiesSubdivision: any = [];
      activities.forEach((item, i) => {
        activitiesSubdivision.push({
          code: item,
          title: subdivisions.actividades[item],
        });
      });
      return right(Result.ok<any>(activitiesSubdivision)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public getActivityName(
    section: string,
    division: string,
    subdivision: string,
    activity: string
  ): Response {
    try {
      const data: any = ciiu();
      var activityName: any =
        data[section].divisiones[division].subdivisiones[subdivision]
          .actividades[activity];
      if (activityName) {
        return right(Result.ok<any>(activityName)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async saveActivityVerify(
    activity: string,
    description: string
  ): Promise<Response> {
    const activityModel = this.models.ActivityVerify;
    try {
      const newActivity = (await activityModel.schema.methods.CreateActivity({
        activity: activity,
        description: description,
      })) as any;
      return right(Result.ok<any>(newActivity)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async toggleActivityVerify(id: string): Promise<Response> {
    try {
      const newActivity =
        (await this.models.ActivityVerify.schema.methods.ToggleActive(
          id
        )) as any;
      return right(Result.ok<any>(newActivity)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllActivityVerify(): Promise<Response> {
    try {
      const activitiesVerify = await this.models.ActivityVerify.find({
        isActive: true,
      }).select({ _id: 0, activity: 1, description: 1 });
      if (activitiesVerify.length > 0) {
        return right(Result.ok<any>(activitiesVerify)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllConditionsRisk(): Promise<Response> {
    try {
      const conditions = await this.models.ConditionRisk.find();
      if (conditions.length > 0) {
        let conditionsRisk: any[] = [];
        conditions.forEach((element: any) => {
          let conditionRisk = this.map.toViewCondition(element);
          conditionsRisk.push(conditionRisk);
        });
        return right(Result.ok<any>(conditionsRisk)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllTypesList(): Promise<Response> {
    try {
      const types = await this.models.TypesList.find();
      if (types.length > 0) {
        let typesList: any[] = [];
        types.forEach((element: any) => {
          let typeList = this.map.toViewType(element);
          typesList.push(typeList);
        });
        return right(Result.ok<any>(typesList)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllRiskTypes(): Promise<Response> {
    try {
      const types = await this.models.RiskTypes.find();
      if (types.length > 0) {
        let typesList: any[] = [];
        types.forEach((element: any) => {
          let typeList = this.map.toViewRiskType(element);
          typesList.push(typeList);
        });
        return right(Result.ok<any>(typesList)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async saveTypeCompany(type: CompanyTypeDto): Promise<Response> {
    const typesModel = this.models.TypeCompany;
    try {
      const newType = (await typesModel.schema.methods.CreateType(type)) as any;
      return right(Result.ok<any>(newType)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async updateTypeCompany(id: string,type: CompanyTypeDto): Promise<Response> {
    const typesModel = this.models.TypeCompany;
    try {
      const newType = (await typesModel.schema.methods.UpdateType(
        id,
        type
      )) as any;
      return right(Result.ok<any>(newType)) as Response;
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async getAllTypesCompany(): Promise<Response> {
    try {
      const types = await this.models.TypeCompany.find().populate(
        "riskLevel",
        "risk code level"
      );
      if (types.length > 0) {
        let typesList: any[] = [];
        types.forEach((element: any) => {
          let typeList = this.map.toViewCompanyType(element);
          typesList.push(typeList);
        });
        return right(Result.ok<any>(typesList)) as Response;
      } else {
        return left(new GenericAppError.NotFoundError()) as Response;
      }
    } catch (error) {
      return left(new GenericAppError.UnexpectedError(error)) as Response;
    }
  }
  public async sendMail(email: string): Promise<Response> {
    const result = MailService.sendTestMail(email);
    return right(Result.ok<any>(result)) as Response;
  }
}
