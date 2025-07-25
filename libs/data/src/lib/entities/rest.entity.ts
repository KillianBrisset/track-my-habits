export abstract class RestEntity {
  _id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(init?: Partial<RestEntity>) {
    Object.assign(this, init);
  }
}
