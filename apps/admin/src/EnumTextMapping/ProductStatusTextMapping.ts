import type { ProductStatus } from '@bac/contracts/types/enums/enums';

const productStatusTextMapping: Record<ProductStatus, string> = {
  AVAILABLE: 'Available',
  OUT_OF_STOCK: 'Out of Stock',
  DISCONTINUED: 'Discontinued',
};

export default productStatusTextMapping;
