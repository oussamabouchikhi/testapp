import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreditCard, CreditCardDocument } from './schemas/credit-card.schema';
import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ExternalCreditCard } from './types/ExternalCreditCard';

@Injectable()
export class CreditCardsService {
  constructor(
    @InjectModel(CreditCard.name)
    private creditCardModel: Model<CreditCardDocument>,
  ) {}

  async create(creditCardData: Partial<CreditCard>): Promise<CreditCard> {
    const createdCreditCard = new this.creditCardModel(creditCardData);
    return createdCreditCard.save();
  }

  async findAll(): Promise<CreditCard[]> {
    return this.creditCardModel.find().exec();
  }

  async findOne(id: string): Promise<CreditCard> {
    return this.creditCardModel.findById(id).exec();
  }

  async update(
    id: string,
    updateData: Partial<CreditCard>,
  ): Promise<CreditCard> {
    return this.creditCardModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
  }

  async remove(id: string): Promise<CreditCard> {
    return this.creditCardModel.findByIdAndRemove(id).exec();
  }

  async fetchCreditCardData(size: string): Promise<CreditCard[]> {
    try {
      const response = await axios.get(
        `https://random-data-api.com/api/v2/credit_cards?size=${size}`,
      );
      return response.data
        .filter(
          (card: ExternalCreditCard) =>
            card.credit_card_type.toLowerCase() === 'visa',
        )
        .map((card: ExternalCreditCard) => ({
          id: card.id,
          uid: card.uid,
          type: card.credit_card_type,
          number: card.credit_card_number,
          expirationDate: card.credit_card_expiry_date,
        }));
    } catch (error) {
      throw new Error(
        'Unable to fetch credit card data from the external API.',
      );
    }
  }

  // async fetchAndCreateExternalCreditCards(size: string): Promise<CreditCard[]> {
  //   const externalCreditCards = await this.fetchCreditCardData(size);

  //   const createPromises = externalCreditCards.map((card) => {
  //     const { id, uid, type, number, expirationDate } = card;
  //     return this.create({
  //       id,
  //       uid,
  //       type,
  //       number,
  //       expirationDate,
  //     });
  //   });

  //   return Promise.all(createPromises);
  // }
}
