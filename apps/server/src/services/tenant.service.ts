import { components } from "@riderota/utils";
import TenantRepo from "../repositories/tenant.repo";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

class TenantService {
  constructor(
    private tenantRepo: TenantRepo,
    private authService: AuthService
  ) {}

  async createTenant(
    req: Request<{}, {}, components["schemas"]["TenantCreatePayload"]>,
    res: Response
  ) {
    if (await this.checkIfSlugExists(req.body.slug)) {
      throw new Error("Slug already exists");
    }

    const { userId } = await this.authService.validateAndRefreshTokens(
      req,
      res
    );

    if (await this.tenantRepo.tenantExistsForUser(userId)) {
      throw new Error("Tenant already exists for this user");
    }

    return this.tenantRepo.addTenant(req.body, userId);
  }

  async checkIfSlugExists(slug: string) {
    return this.tenantRepo.checkIfSlugExists(slug);
  }
}

export default TenantService;
