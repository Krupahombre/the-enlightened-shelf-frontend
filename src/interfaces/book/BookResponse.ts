export default interface BookResponse {
  id: number;
  title: string;
  author: string;
  description?: string;
  quantity: number;
  quantity_available: number;
  category: string;
  img: string;
}
