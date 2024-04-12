export const extractLimitAndOffset = (
  param: any,
): { limit: number; offset: number } => {
  return { limit: param.limit || 20, offset: param.offset || 0 };
};
