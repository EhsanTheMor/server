export const extractLimitAndOffset = (param: any) => {
  return { limit: param.limit || 20, offset: param.offset || 0 };
};
