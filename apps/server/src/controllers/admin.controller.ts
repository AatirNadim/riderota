import { AdminService } from "../services/admin.service";

export class AdminController {
constructor(private adminService: AdminService) {}

  getAdminDashboard = async (req: Request, res: Response) => {
    const data = await this.adminService.getAdminDashboardData();
    res.json(data);
  };

  getUserManagement = async (req: Request, res: Response) => {
    const data = await this.adminService.getUserManagementData();
    res.json(data);
  };
}
