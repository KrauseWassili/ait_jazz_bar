export default interface JazzBarEvent {
  id: number;
  title: string;
  image: string | null;
  description: string | null;
  place: string | null;
  datetime: Date | null;         
  price: number;        
  email: string | null;
  phone: string | null;
  createdAt: Date | null;      
}
