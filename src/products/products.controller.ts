import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('search') search: string,
  ) {
    return this.productsService.findAll(page, itemsPerPage, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() product: Product): Promise<Product> {
    return this.productsService.create(product);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() product: Product): Promise<Product> {
    return this.productsService.update(id, product);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.remove(id);
  }
}
