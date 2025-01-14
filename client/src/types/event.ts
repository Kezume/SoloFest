export interface Event {
  id?: number;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  location: string;
  image: File | null;
  price: number;
  tickets?: Ticket[];
}

export interface Ticket {
  id?: string;
  type: string;
  price: number;
  quantity: number;
}
