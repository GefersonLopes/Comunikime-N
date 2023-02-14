import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IsAdminGuard } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseErrorDTO } from '../auth/responseSwagger/response';
import { ResponseProductDTO } from './responseSwagger/response';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new Product' })
  @ApiResponse({
    status: 201,
    description: 'Created',
    type: ResponseProductDTO,
  })
  @ApiResponse({
    status: 400,
    description: 'name, price or img invalid',
    type: ResponseErrorDTO,
  })
  @ApiResponse({ status: 400, description: 'Product already exists' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({
    status: 200,
    description: 'Ok',
    type: ResponseProductDTO,
    isArray: true,
  })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Ok', type: ResponseProductDTO })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get product by id' })
  @ApiResponse({ status: 200, description: 'Ok', type: ResponseProductDTO })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  buy(@Param('id') id: string) {
    return this.productsService.buyProduct(id);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update product' })
  @ApiResponse({ status: 200, description: 'Ok', type: ResponseProductDTO })
  @ApiResponse({
    status: 400,
    description: 'name, price or img invalid',
    type: ResponseErrorDTO,
  })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard('jwt'), IsAdminGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 404, description: 'Id invalid' })
  @ApiResponse({ status: 401, description: 'Token invalid' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
