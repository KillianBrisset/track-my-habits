import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Habit extends Document {
  /**
   * @description The name of the habit.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof Habit
   */
  @Prop({ required: true })
  name: string;

  /**
   * @description A brief description of the habit.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof Habit
   */
  @Prop()
  description: string;

  /**
   * @description Dates when the habit was completed.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {Date[]}
   * @memberof Habit
   */
  @Prop({ type: [String], default: [] })
  dates: string[]; // ISO strings

  /**
   * @description The user ID associated with the habit.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof Habit
   */
  @Prop({ required: true })
  userId: string; // Auth0 sub
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
