import * as Mongoose from "mongoose";
import validator from "validator";

import { translate } from "../../localization";
import {
  phoneType,
  documentType,
  addressType,
  contactType,
  selectedType,
} from "../customTypes";

const branchOfficeSchema = new Mongoose.Schema(
  {
    branchOffice: {
      type: String,
      required: [true, translate("requiredField", "schema", ["branchOffice"])],
    },
    totalEmployees: {
      type: Number,
      required: [
        true,
        translate("requiredField", "schema", ["totalEmployees"]),
      ],
    },
    contacts: [contactType],
    phones: [phoneType],
    address: addressType,
    activities: [selectedType],
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
    mainOffice: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    typeCompany: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "TypeCompany",
      required: false,
    },
    idOperator: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Operators",
      required: false,
    },
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
  },
  { versionKey: false }
);

branchOfficeSchema.methods.CreateBranchOffice = async function (
  raw: any
): Promise<any> {
  const branchOffice = new BranchOffice(raw);
  await branchOffice.save();
  return branchOffice._id;
};

branchOfficeSchema.methods.UpdateBranchOffice = async function (
  id: string,
  raw: any
): Promise<any> {
  const filter = { _id: id };
  raw.lastUpdate = Date.now();
  let branchOffice = await BranchOffice.findOneAndUpdate(filter, raw);
  return branchOffice._id;
};

branchOfficeSchema.methods.AddOperator = async function (
  id: string,
  idOperator: string
): Promise<any> {
  const client = await BranchOffice.findById(id);
  client.set("idOperator", idOperator);
  client.set("lastUpdate", Date.now());
  await client.save();
  return client._id;
};

branchOfficeSchema.methods.ToggleActive = async function (
  id: string
): Promise<any> {
  const branchOffice = await BranchOffice.findById(id);
  branchOffice.set("isActive", !branchOffice.get("isActive"));
  branchOffice.set("lastUpdate", Date.now());
  await branchOffice.save();
  return branchOffice._id;
};

const BranchOffice = Mongoose.model("BranchOffice", branchOfficeSchema);
export { BranchOffice };
