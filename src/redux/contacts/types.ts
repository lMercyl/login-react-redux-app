export type Item = {
  name: string;
  phone: string;
  id: string;
}

export interface ContactsSliceState {
  list: Array<Item>
}