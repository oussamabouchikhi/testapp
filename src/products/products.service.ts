import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(product: Product): Promise<Product> {
    const newProduct = new this.productModel(product);
    return newProduct.save();
  }

  async findAll(
    page: number = 1,
    itemsPerPage: number = null,
    name: string = '',
    category: string = '',
    price: number = null,
  ): Promise<Product[]> {
    const skipItems = (page - 1) * itemsPerPage;
    const nameFilter = name ? { name: new RegExp(name, 'i') } : {};
    const categoryFilter = category
      ? { category: new RegExp(category, 'i') }
      : {};
    const priceFilter = price ? { price } : {};
    const finalFilter = { ...nameFilter, ...categoryFilter, ...priceFilter };

    if (!itemsPerPage) {
      return this.productModel.find(finalFilter);
    }

    return this.productModel
      .find(finalFilter)
      .skip(skipItems)
      .limit(itemsPerPage);
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return product;
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async remove(id: string): Promise<{ statusCode: number; message: string }> {
    const product = await this.productModel.findOne({ _id: id }).exec();
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    await this.productModel.deleteOne({ _id: id }).exec();
    return { statusCode: 200, message: 'Product deleted successfully.' };
  }
}
