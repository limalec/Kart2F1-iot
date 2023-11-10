export class CreateUserDto {
    name: string;
    surname: string;
    password: string;
    email: string;
    info: {
      statistics: JSON;
      tresholds: JSON;
      topCategories: JSON[];
      achievements: string[];
      score: number;
    }
  }