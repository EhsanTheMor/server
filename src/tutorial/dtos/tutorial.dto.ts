import { Expose, Transform } from 'class-transformer';

export class TutorialDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Transform(({ obj }) => obj.season.id)
  @Expose()
  seasonId: number;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;

  @Transform(({ obj }) => obj.contents.map((i) => i.id))
  @Expose()
  contents: number[];
}
