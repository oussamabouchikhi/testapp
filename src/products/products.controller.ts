import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Product } from './schemas/product.schema';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(
    @Query('page') page: number,
    @Query('itemsPerPage') itemsPerPage: number,
    @Query('name') name: string,
    @Query('category') category: string,
    @Query('price') price: number,
  ) {
    return this.productsService.findAll(
      page,
      itemsPerPage,
      name,
      category,
      price,
    );
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
  delete(
    @Param('id') id: string,
  ): Promise<{ statusCode: number; message: string }> {
    return this.productsService.remove(id);
  }
}
