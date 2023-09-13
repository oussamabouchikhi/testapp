import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  const mockProducts = [
    { id: '1', name: 'Product 1' },
    { id: '2', name: 'Product 2' },
  ];

  const mockProductsService = {
    create: jest.fn().mockImplementation((dto) =>
      Promise.resolve({
        id: '123',
        ...dto,
      }),
    ),
    remove: jest.fn((id) => {
      return mockProducts.filter((p) => p.id != id);
    }),
    findAll: jest.fn(() => mockProducts),
    findOne: jest.fn((id) => {
      return mockProducts.find((p) => p.id === id);
    }),
    update: jest.fn((id, dto) => {
      return { ...mockProducts.find((p) => p.id === id), ...dto };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    })
      .overrideProvider(ProductsService)
      .useValue(mockProductsService)
      .compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'Product 1',
      category: 'someCategory',
      price: 100,
      availability: false,
    };

    expect(await service.create(createProductDto)).toEqual({
      id: '123',
      name: createProductDto.name,
      category: createProductDto.category,
      price: createProductDto.price,
      availability: createProductDto.availability,
    });

    expect(mockProductsService.create).toHaveBeenCalledWith(createProductDto);
  });

  it('should delete a product', () => {
    expect(mockProductsService.remove('2')).toEqual([
      {
        id: '1',
        name: 'Product 1',
      },
    ]);
  });

  it('should get all products', () => {
    expect(mockProductsService.findAll()).toEqual(mockProducts);
  });

  it('should find one product', () => {
    expect(mockProductsService.findOne('1')).toEqual({
      id: '1',
      name: 'Product 1',
    });
  });

  it('should update a product', () => {
    const updateProductDto = { name: 'Updated Product' };

    expect(mockProductsService.update('1', updateProductDto)).toEqual({
      id: '1',
      name: updateProductDto.name,
    });

    expect(mockProductsService.update).toHaveBeenCalledWith(
      '1',
      updateProductDto,
    );
  });
});
