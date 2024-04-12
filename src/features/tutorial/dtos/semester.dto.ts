import { Expose, Transform } from 'class-transformer';

export class SemesterDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;

  @Transform(({ obj }) => obj.season.map((i) => i?.id))
  @Expose()
  season: number[];
}
