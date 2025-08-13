import { AuthRepo } from "../repositories/auth.repo";
import { components } from "@riderota/utils";

export class AuthService {
  constructor(private authRepo: AuthRepo) {}

  async superAdminSignup(
    data: components["schemas"]["SuperadminCreatePayload"]
  ): Promise<any> {
    try {
      await this.authRepo.createSuperAdminInDb(data);
      console.log("Superadmin created successfully");

      

    } catch (error) {
      // Handle error
    }
  }

  async healthCheck(): Promise<any> {
    // Implement the health check logic
  }
}
