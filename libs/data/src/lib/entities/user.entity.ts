import { RestEntity } from './rest.entity';

export class UserEntity extends RestEntity {
  email!: string;
  emailVerified!: boolean;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  sub!: string;

  constructor(init?: Partial<UserEntity>) {
    super(init);
    Object.assign(this, init);
  }
}
