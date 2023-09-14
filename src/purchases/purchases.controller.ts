import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  async create(
    @Body('userId') userId: string,
    @Body('productId') productId: string,
  ) {
    try {
      return await this.purchasesService.create(userId, productId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new Error('Internal Server Error');
    }
  }

  @Get('stats')
  async getStats() {
    return this.purchasesService.getStats();
  }

  @Get('user/:userId')
  async getPurchasesByUser(@Param('userId') userId: string) {
    try {
      const purchases = await this.purchasesService.getPurchasesByUser(userId);
      return purchases;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      } else {
        throw error;
      }
    }
  }
}
