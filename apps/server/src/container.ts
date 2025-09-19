import { AuthRepo } from "./repositories/auth.repo";
import { AuthService } from "./services/auth.service";
import TenantRepo from "./repositories/tenant.repo";
import TenantService from "./services/tenant.service";
import TenantController from "./controllers/tenant.controller";
import AuthController from "./controllers/auth.controller";
import { AdminRepository } from "./repositories/admin.repo";
import { AdminService } from "./services/admin.service";
import { AdminController } from "./controllers/admin.controller";
import { DriverService } from "./services/driver.service";
import { DriverRepository } from "./repositories/driver.repo";
import { DriverController } from "./controllers/driver.controller";

// Repositories (no dependencies)
const authRepo = new AuthRepo();
const tenantRepo = new TenantRepo();

const adminRepo = new AdminRepository();
const driverRepo = new DriverRepository();

// Services (depend on repositories and other services)
const adminService = new AdminService(adminRepo);
const driverService = new DriverService(driverRepo);
const authService = new AuthService(driverService, authRepo, tenantRepo);
const tenantService = new TenantService(tenantRepo, authService); // Inject authService here

// Controllers (depend on services)
export const authController = new AuthController(authService, tenantService);
export const tenantController = new TenantController(tenantService);

export const adminController = new AdminController(adminService);
export const driverController = new DriverController(driverService);
