import { Request, Response } from 'express';
import { components } from '../types/generated-api';
import { createSuperAdmin } from '../services/auth.service';

type SuperAdminCreatePayload = components['schemas']['SuperadminCreatePayload'];

export const superAdminSignupController = async (req: Request<{}, {}, SuperAdminCreatePayload>, res: Response) => {
  try {
    const { accessToken, refreshToken } = await createSuperAdmin(req.body);

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    res.status(201).json({ message: 'Superadmin created successfully' });
  } catch (error) {
    // A more specific error handling can be implemented
    res.status(500).json({ message: 'Error creating superadmin' });
  }
};
