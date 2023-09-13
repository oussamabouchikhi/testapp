import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([]),
            findOne: jest.fn().mockResolvedValue({}),
            create: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            remove: jest.fn().mockResolvedValue({
              statusCode: 200,
              message: 'Product deleted successfully.',
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should find all products', async () => {
    expect(await controller.findAll(1, 5, '', null, null)).toEqual([]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should find one product', async () => {
    const id = '1';
    expect(await controller.findOne(id)).toEqual({});
    expect(service.findOne).toHaveBeenCalledWith(id);
  });

  it('should create a product', async () => {
    const product: Product = {
      name: 'Product 1',
      category: 'someCategory',
      price: 100,
      availability: false,
    };
    expect(await controller.create(product)).toEqual({});
    expect(service.create).toHaveBeenCalledWith(product);
  });

  it('should update a product', async () => {
    const id = '1';
    const product: Product = {
      name: 'Product 1',
      category: 'someCategory',
      price: 340,
      availability: true,
    };
    expect(await controller.update(id, product)).toEqual({});
    expect(service.update).toHaveBeenCalledWith(id, product);
  });

  it('should delete a product', async () => {
    const id = '1';
    expect(await controller.delete(id)).toEqual({
      statusCode: 200,
      message: 'Product deleted successfully.',
    });
    expect(service.remove).toHaveBeenCalledWith(id);
  });
});
