export default interface ResponseData {
  data: [{ id: number; name: string; email: string; phone: string }];
  status: number;
  errors?: [];
}
