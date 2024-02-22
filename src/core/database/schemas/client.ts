import * as Mongoose from "mongoose";
import validator from "validator";

import { translate } from "../../localization";
import {
  phoneType,
  documentType,
  addressType,
  CIIUType,
  selectedType,
  contactType,
} from "../customTypes";

const clientSchema = new Mongoose.Schema(
  {
    legalName: {
      type: String,
      required: [true, translate("requiredField", "schema", ["legalName"])],
    },
    businessName: {
      type: String,
      required: [true, translate("requiredField", "schema", ["businessName"])],
    },
    identification: documentType,
    contacts: [contactType],
    phones: [phoneType],
    address: addressType,
    totalEmployees: {
      type: Number,
      default: 1,
      required: [
        true,
        translate("requiredField", "schema", ["totalEmployees"]),
      ],
    },
    description: {
      type: String,
      default: "",
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (value: string) {
          return validator.isEmail(value);
        },
        message: (props: any) =>
          translate("invalidEmail", "user", [props.value]),
      },
    },
    activities: [selectedType],
    creationDate: {
      type: Date,
      default: Date.now(),
    },
    lastUpdate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    contact: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "ProfileClient",
      required: false,
    },
    typeCompany: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "TypeCompany",
      required: false,
    },
    codeCIIU: CIIUType,
    idOperator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Operators",
      required: false,
    },
  },
  { versionKey: false }
);

clientSchema.post("save", async function (err: any, doc: any, next: any) {
  if (err.name === "MongoServerError" && err.code === 11000) {
    next(new Error(translate("uniqueFiled", "schema", ["email"])));
  } else {
    next();
  }
});

clientSchema.methods.CreateClient = async function (raw: any): Promise<any> {
  const client = new Client(raw);
  await client.save();
  return client._id;
};

clientSchema.methods.UpdateClient = async function (
  id: string,
  raw: any
): Promise<any> {
  const filter = { _id: id };
  raw.lastUpdate = Date.now();
  let client = await Client.findOneAndUpdate(filter, raw);
  return client._id;
};

clientSchema.methods.ToggleActive = async function (id: string): Promise<any> {
  const client = await Client.findById(id);
  client.set("isActive", !client.get("isActive"));
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

clientSchema.methods.AddProfile = async function (
  idProfile: string,
  idClient: string
): Promise<any> {
  const client = await Client.findById(idClient);
  client.set("contact", idProfile);
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

clientSchema.methods.AddUpdateAddress = async function (
  id: string,
  raw: any
): Promise<any> {
  const client = await Client.findById(id);
  client.set("address", raw);
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

clientSchema.methods.AddUpdateSectors = async function (
  id: string,
  raw: any
): Promise<any> {
  const client = await Client.findById(id);
  client.set("sectors", raw);
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

clientSchema.methods.AddOperator = async function (
  id: string,
  idOperator: string
): Promise<any> {
  const client = await Client.findById(id);
  client.set("idOperator", idOperator);
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

const Client = Mongoose.model("Client", clientSchema);
export { Client };
