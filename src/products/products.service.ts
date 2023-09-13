import { Injectable } from '@nestjs/common';
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
    itemsPerPage: number = 10,
    search: string = '',
  ): Promise<Product[]> {
    const skipItems = (page - 1) * itemsPerPage;
    const filter = search ? { name: new RegExp(search, 'i') } : {};

    return this.productModel.find(filter).skip(skipItems).limit(itemsPerPage);
  }

  async findOne(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async update(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }
}
