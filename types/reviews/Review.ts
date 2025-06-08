export interface Review {
  id: number;
  customerId: string;
  customerName: string;
  customerImageUrl: string;
  workshopId: string;
  text: string;
  whenPublished: string;
  stars: number;
}
