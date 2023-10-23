export interface APIRecord {
  uid: string;
  name: string;
  url: string;
}

export interface APIResponse {
  total_records: number;
  total_pages: number;
  records: APIRecord[];
  page?: number;
  limit?: number;
}

export type DataType = 'people' | 'starships';

export interface APIStarshipProps {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: string;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
  created: string;
  edited: string;
  name: string;
  url: string;
}
export interface APIPersonProps {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  name: string;
  homeworld: string;
  url: string;
}

export interface APICommonProps {
  __v: number;
  _id: string;
  uid: string;
  description: string;
}

export interface APIPerson extends APICommonProps {
  properties: APIPersonProps;
}
export interface APIStarship extends APICommonProps {
  properties: APIStarshipProps;
}
