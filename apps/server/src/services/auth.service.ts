import { AuthRepo } from "../repositories/auth.repo";
import { components } from "../types/generated-api";

export class AuthService {
  private authRepo;
  constructor() {
    this.authRepo = new AuthRepo();
  }

  async createSuperAdmin(
    data: components["schemas"]["SuperadminCreatePayload"]
  ): Promise<any> {
    return this.authRepo.createSuperAdminInDb(data);
  }

  async superAdminSignup(data: any): Promise<any> {
    // Implement the signup logic for super admins
  }

  async healthCheck(): Promise<any> {
    // Implement the health check logic
  }
}
