import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  /**
   * @description The user's name.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof User
   */
  @Prop()
  firstName: string;

  /**
   * @description The user's last name.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof User
   */
  @Prop()
  lastName: string;

  /**
   * @description The user's email.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof User
   */
  @Prop({ required: true, unique: true })
  email: string;

  /**
   * @description The user's Auth0 ID.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof User
   */
  @Prop({ required: true, unique: true })
  sub: string; // Auth0 user ID

  /**
   * @description Indicates if the user's email is verified.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {boolean}
   * @memberof User
   */
  @Prop({ default: false })
  emailVerified: boolean;

  /**
   * @description The user's profile picture URL.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {string}
   * @memberof User
   */
  @Prop({ default: '' })
  profilePicture: string;

  /**
   * @description The date when the user was created.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {Date}
   * @memberof User
   */
  @Prop({ default: Date.now })
  createdAt: Date;

  /**
   * @description The date when the user was last updated.
   * @author Killian Brisset
   * @date 23/07/2025
   * @type {Date}
   * @memberof User
   */
  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
