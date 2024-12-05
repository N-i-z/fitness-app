import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MealsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createMeal(
    tenantId: string,
    userId: string,
    createMealDto: CreateMealDto,
  ) {
    const nutritionInfo = await this.getNutritionInfo(
      createMealDto.name,
      createMealDto.weight,
    );
    return await this.prisma.meal.create({
      data: {
        ...createMealDto,
        ...nutritionInfo,
        date: new Date(createMealDto.date),
        tenantId,
        userId,
      },
    });
  }

  async findAllMealsOfTenantUser(tenantId: string, userId: string) {
    return await this.prisma.meal.findMany({
      where: { tenantId, userId },
    });
  }

  async findOneMealOfTenantUser(tenantId: string, userId: string, id: string) {
    const meal = await this.prisma.meal.findFirst({
      where: {
        id,
        userId,
        tenantId,
      },
    });

    if (!meal) {
      throw new NotFoundException(
        `Meal with ID ${id} not found for user ${userId} in tenant ${tenantId}`,
      );
    }

    return meal;
  }

  async removeMeal(tenantId: string, userId: string, id: string) {
    await this.findOneMealOfTenantUser(tenantId, userId, id);

    return await this.prisma.meal.delete({
      where: {
        id,
      },
    });
  }

  private async getNutritionInfo(name: string, weight: number) {
    const nutritionInfo = {
      sugar_g: 0,
      fiber_g: 0,
      carbohydrates_total_g: 0,
      cholesterol_mg: 0,
      potassium_mg: 0,
      sodium_mg: 0,
      fat_saturated_g: 0,
      fat_total_g: 0,
    };
    const baseURL = 'https://api.api-ninjas.com/v1/nutrition';
    const query = encodeURIComponent(`${weight}g of ${name}`);
    const response = await this.httpService.axiosRef.get(
      `${baseURL}?query=${query}`,
      {
        headers: {
          'X-Api-Key': this.configService.get('NUTRITION_API_KEY'),
        },
      },
    );
    response.data.forEach((item) => {
      nutritionInfo.sugar_g += item.sugar_g;
      nutritionInfo.fiber_g += item.fiber_g;
      nutritionInfo.carbohydrates_total_g += item.carbohydrates_total_g;
      nutritionInfo.cholesterol_mg += item.cholesterol_mg;
      nutritionInfo.potassium_mg += item.potassium_mg;
      nutritionInfo.sodium_mg += item.sodium_mg;
      nutritionInfo.fat_saturated_g += item.fat_saturated_g;
      nutritionInfo.fat_total_g += item.fat_total_g;
    });
    return nutritionInfo;
  }
}
