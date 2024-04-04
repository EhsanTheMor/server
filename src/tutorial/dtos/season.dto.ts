import { Expose, Transform } from 'class-transformer';

export class SeasonDto {
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

  @Transform(({ obj }) => obj.tutorials.map((i) => i.id))
  @Expose()
  tutorials: number[];
}
