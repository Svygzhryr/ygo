export interface ICard {
  attribute: string;
  id: number;
  name: string;
  type: string;
  frameType: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  race: string;
  archetype: string;
  card_sets: [
    {
      set_name: string;
      set_code: string;
      set_rarity: string;
      set_rarity_code: string;
      set_price: string;
    }
  ];
  card_images: [
    {
      id: number;
      image_url: string;
      image_url_small: string;
      image_url_cropped: string;
    }
  ];
  card_prices: [
    {
      cardmarket_price: string;
      tcgplayer_price: string;
      ebay_price: string;
      amazon_price: string;
      coolstuffinc_price: string;
    }
  ];
}

export interface ICardMeta {
  current_rows: number;
  total_rows: number;
  rows_remaining: number;
  total_pages: number;
  pages_remaining: number;
  next_page: string;
  next_page_offset: number;
  previous_page_offset?: number;
}

export interface ICardAPI {
  data: ICard[];
  meta: ICardMeta | null;
}
