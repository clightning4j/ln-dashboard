export type ListOffers = {
  offer_id: string;
  active: boolean;
  single_use: boolean;
  bolt12: string;
  bolt12_unsingned: string;
  used: boolean;
  created: boolean;
  label: string;
}[];
