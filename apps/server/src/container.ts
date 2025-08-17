import { AuthRepo } from "./repositories/auth.repo";
import { AuthService } from "./services/auth.service";
import TenantRepo from "./repositories/tenant.repo";
import TenantService from "./services/tenant.service";
import TenantController from "./controllers/tenant.controller";
import AuthController from "./controllers/auth.controller";

// Repositories (no dependencies)
const authRepo = new AuthRepo();
const tenantRepo = new TenantRepo();

// Services (depend on repositories and other services)
const authService = new AuthService(authRepo);
const tenantService = new TenantService(tenantRepo, authService); // Inject authService here

// Controllers (depend on services)
export const authController = new AuthController(authService);
export const tenantController = new TenantController(tenantService);
