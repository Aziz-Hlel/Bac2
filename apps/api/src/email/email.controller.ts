import { sendContactUsRequestSchema } from '@bac/contracts/schemas/email/sendContactUsRequest';
import { SimpleApiResponse } from '@bac/contracts/types/api/SimpleApiResponse.dto';
import { Request, Response } from 'express';
import { emailService } from './email.service';

class EmailController {
  async sendContactEmail(req: Request, res: Response<SimpleApiResponse>) {
    const parsedPayload = sendContactUsRequestSchema.parse(req.body);
    await emailService.sendContactEmail(parsedPayload);
    res.status(200).json({ message: 'Email sent successfully' });
  }
}

export const emailController = new EmailController();
