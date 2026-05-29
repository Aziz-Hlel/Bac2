import type { PresignedUrlRequest } from '@bac/contracts/schemas/media/PresignedUrlRequest';
import type { PresignedUrlResponse } from '@bac/contracts/schemas/media/PresignedUrlResponse';
import { apiService } from '../apiService';
import apiRoutes from '../routes/routes';

export const mediaService = {
  presignedUrl: (payload: PresignedUrlRequest) =>
    apiService.post<PresignedUrlResponse>(apiRoutes.media.presignedUrl(), payload),
};
