import { Expose, Transform } from 'class-transformer';

export class CreateContentResponseDto {
  @Expose()
  id: number;

  @Expose()
  description: string;

  @Expose()
  type: number;

  @Transform(({ obj }) => obj.createdBy.id)
  @Expose()
  createdById: number;

  @Transform(({ obj }) => obj.tutorial.id)
  @Expose()
  tutorialId: number;
}
