export class CreateUserDto {
    name: string;
    surname: string;
    password: string;
    email: string;
    info: {
      statistics: JSON;
      score: number;
    }
  }