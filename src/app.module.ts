import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PurchasesModule } from './purchases/purchases.module';
import { AuthModule } from './auth/auth.module';
import { CreditCardsModule } from './credit-cards/credit-cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    UsersModule,
    PurchasesModule,
    AuthModule,
    CreditCardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
