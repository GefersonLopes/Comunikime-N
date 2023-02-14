import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose/dist';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name } = createProductDto;

    const verifyNameProduct = await this.productModel.findOne({ name: name });
    if (verifyNameProduct) {
      throw new BadRequestException('Product already exists');
    }
    const newProduct = new this.productModel(createProductDto);
    await newProduct.save();

    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    const ProductList = await this.productModel.find();
    return ProductList;
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async buyProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.amount === 0) {
        await this.remove(id);
        return;
      }

      product.amount--;
      await product.save();

      if (product.amount === 0) {
        await this.remove(id);
        return;
      }

      return product;
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const productUpdate = await this.productModel.findById(id);
      if (!productUpdate) {
        throw new NotFoundException('Product not found');
      }

      await this.productModel.replaceOne({ _id: id }, updateProductDto);
      return await this.productModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const product = await this.productModel.findById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      await this.productModel.findOneAndDelete({ _id: id });
    } catch (error) {
      throw new NotFoundException('Product not found');
    }
  }
}
