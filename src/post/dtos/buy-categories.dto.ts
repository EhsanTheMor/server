import { IsArray } from "class-validator";

export class BuyCategoriesDto {
    @IsArray()
    categories: number[];
}