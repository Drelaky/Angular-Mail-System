export class CreateMailDto {
  id?: string;
  name: string;
  email: string;
  message: string;

  labels?: {
    id: string;
    name: string;
    color: string;
    selected: boolean;
  }[];
}
