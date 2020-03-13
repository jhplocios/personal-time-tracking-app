export interface IActivityData {
  _id: string;
  duration: number;
  tag: string;
  name: string;
  date: string;
}

export type Order = 'asc' | 'desc';

export interface HeadCell {
  disablePadding: boolean;
  id: keyof IActivityData;
  label: string;
  numeric: boolean;
}
