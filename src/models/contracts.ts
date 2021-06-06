import { prop, getModelForClass } from '@typegoose/typegoose'

export class Contract {
  @prop({ required: true })
  type: string

  // Mongo property
  _doc: any
}

export const ContractModel = getModelForClass(Contract, {
  schemaOptions: { timestamps: true },
})
