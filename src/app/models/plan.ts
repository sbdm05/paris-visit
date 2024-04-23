import { v4 as uuidv4 } from 'uuid';

export class Plan {
  id: string;
  plans: {
    place_name: string;
    id: string;
    lat: string;
    lon: string;
    name: string;
  }[];

  constructor(obj?: Partial<Plan>) {
    this.id = uuidv4();
    this.plans = [];
  }
}
