import { Expose, Transform } from 'class-transformer';

export class CreateSeasonResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.semester.id)
  @Expose()
  semesterId: number;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;
}
