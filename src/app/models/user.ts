import {Role} from "./role";

export class User {
  id: number;
  username: string;
  email: string;
  municipalityId: number;
  tokenType: string;
  accessToken: string;
  municipalityName: string;
  roles: Role[] = [];


  constructor(id: number, username: string, email: string, municipalityId: number, tokenType: string, accessToken: string, municipalityName: string, roles: Role[]) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.municipalityId = municipalityId;
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.municipalityName = municipalityName;
    this.roles = roles;
  }
}
