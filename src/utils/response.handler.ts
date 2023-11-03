export const responseHandler = (
  code: number,
  message: string,
  data: any = null,
) => {
  return {
    code,
    message,
    data,
  };
};
