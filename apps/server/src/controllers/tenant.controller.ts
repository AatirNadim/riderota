import { components } from "@riderota/utils";
import { Request, Response } from "express";
import TenantService from "../services/tenant.service";
import TenantRepo from "../repositories/tenant.repo";

class TenantController {
  constructor(private tenantService: TenantService) {
    // Initialization code here
  }

  createTenant = async (
    req: Request<{}, {}, components["schemas"]["TenantCreatePayload"]>,
    res: Response
  ) => {
    try {
      const tenantDetails = await this.tenantService.createTenant(req, res);
      res.status(201).json(tenantDetails);
    } catch (error) {
      console.error("Error creating tenant:", error);
      res.status(500).json({ error: "Internal server error" });
    }
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

export default TenantController;
