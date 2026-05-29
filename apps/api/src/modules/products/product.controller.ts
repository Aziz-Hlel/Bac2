import getUrlParam from '@/utils/getUrlParam';
import { createProductRequestSchema } from '@bac/contracts/schemas/product/createProductRequest';
import { productsQueryParamsSchema } from '@bac/contracts/schemas/product/ProductPageQuery';
import { ProductResponse } from '@bac/contracts/schemas/product/productResponse';
import { updateProductRequestSchema } from '@bac/contracts/schemas/product/updateProductRequest';
import { Request, Response } from 'express';
import { IProductService } from './product.service';

export class ProductController {
  constructor(private readonly productService: IProductService) {}
  create = async (req: Request, res: Response<ProductResponse>) => {
    const parsedSchema = createProductRequestSchema.parse(req.body);

    const productResponse = await this.productService.create(parsedSchema);

    res.status(201).json(productResponse);
  };

  getById = async (req: Request, res: Response<ProductResponse>) => {
    const productId = getUrlParam(req, 'id');

    const productResponse = await this.productService.getById(productId);
    res.status(200).json(productResponse);
  };

  update = async (req: Request, res: Response<ProductResponse>) => {
    const productId = getUrlParam(req, 'id');
    const parsedSchema = updateProductRequestSchema.parse(req.body);
    const productResponse = await this.productService.update(productId, parsedSchema);

    res.status(200).json(productResponse);
  };

  getPage = async (req: Request, res: Response) => {
    const queryParams = productsQueryParamsSchema.parse(req.query);
    const productPage = await this.productService.getPage(queryParams);

    res.status(200).json(productPage);
  };

  delete = async (req: Request, res: Response) => {
    const productId = getUrlParam(req, 'id');

    await this.productService.delete(productId);

    res.status(204).send();
  };
}
