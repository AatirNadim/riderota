import { components } from "@riderota/utils";
import { Request, Response } from "express";
import TenantService from "../services/tenant.service";
import TenantRepo from "../repositories/tenant.repo";

class TenantController {
  constructor(private tenantService: TenantService) {
    // Initialization code here
  }

  createTenant = async (req: Request, res: Response) => {
    // Logic for creating a tenant

    console.log("received request to create tenant --> ", req);
  };

  checkIfSlugExists = async (req: Request, res: Response) => {
    // Logic for checking if a slug exists
    try {
      const { slug } = req.query;

      console.log("received request to check if slug exists --> ", slug);

      const slugExists = await this.tenantService.checkIfSlugExists(
        slug as string
      );

      res.status(200).json({ exists: slugExists });
    } catch (error) {
      console.error("Error checking if slug exists:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export const tenantController = new TenantController(
  new TenantService(new TenantRepo())
);
