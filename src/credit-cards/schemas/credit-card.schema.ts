import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CreditCardDocument = CreditCard & Document;

@Schema()
export class CreditCard {
  @Prop()
  id: number;

  @Prop()
  uid: string;

  @Prop()
  number: string;

  @Prop()
  expirationDate: string;

  @Prop()
  type: string;
}

export const CreditCardSchema = SchemaFactory.createForClass(CreditCard);
