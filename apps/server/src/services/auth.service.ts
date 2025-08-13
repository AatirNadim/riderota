import { AuthRepo } from "../repositories/auth.repo";
import { components, createTokens } from "@riderota/utils";

export class AuthService {
  constructor(private authRepo: AuthRepo) {}

  async superAdminSignup(
    data: components["schemas"]["SuperadminCreatePayload"]
  ): Promise<any> {
    try {
      const userId = await this.authRepo.createSuperAdminInDb(data);
      console.log("Superadmin created successfully");

      const { accessToken, refreshToken } = createTokens({ id: userId });
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);

      return { accessToken, refreshToken };
    } catch (error) {
      // Handle error
    }
  }

  async healthCheck(): Promise<any> {
    // Implement the health check logic
  }
}
