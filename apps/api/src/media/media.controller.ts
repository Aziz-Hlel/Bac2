import { presignedUrlRequestSchema } from '@bac/contracts/schemas/media/PresignedUrlRequest';
import { PresignedUrlResponse } from '@bac/contracts/schemas/media/PresignedUrlResponse';
import { Request, Response } from 'express';
import { IMediaService } from './media.service';

export class MediaController {
  constructor(private readonly mediaService: IMediaService) {}

  getPresignedUrl = async (req: Request, res: Response<PresignedUrlResponse>) => {
    const schema = presignedUrlRequestSchema.parse(req.body);
    const presignedUrlResponse = await this.mediaService.getPresignedUrl(schema);
    res.json(presignedUrlResponse);
  };
}
