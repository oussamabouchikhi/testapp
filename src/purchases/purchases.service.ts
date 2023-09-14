import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './schemas/purchase.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
    @InjectModel(Purchase.name) private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async getPurchasesByUser(userId: string): Promise<Purchase[]> {
    const purchases = await this.purchaseModel
      .find({ user: userId })
      .populate('user product', '-password')
      .exec();

    if (!purchases) {
      throw new NotFoundException(
        `No purchases found for user with ID ${userId}`,
      );
    }

    return purchases;
  }

  async create(userId: string, productId: string): Promise<Purchase> {
    const product = await this.productModel.findById(productId).exec();
    const user = await this.userModel.findById(userId).exec();

    if (!user || !product) {
      throw new NotFoundException('User or Product not found');
    }

    const purchase = new this.purchaseModel({
      user: user._id,
      product: product._id,
      date: new Date(),
    });

    await purchase.save();

    return purchase;
  }

  async getStats() {
    const stats = await this.purchaseModel.aggregate([
      {
        $group: {
          _id: '$product',
          totalPurchases: { $sum: 1 },
        },
      },
      {
        $sort: { totalPurchases: -1 },
      },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productInfo',
        },
      },
      {
        $unwind: '$productInfo',
      },
    ]);

    return stats;
  }
}
