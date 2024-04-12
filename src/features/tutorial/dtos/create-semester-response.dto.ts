import { Expose, Transform } from 'class-transformer';

export class CreateSemesterResponseDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;
}
