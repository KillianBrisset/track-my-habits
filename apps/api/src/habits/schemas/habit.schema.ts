import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Habit extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: [] })
  dates: Date[]; // Dates validées

  @Prop({ required: true })
  userId: string; // Auth0 sub
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
