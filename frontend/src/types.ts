export interface IActivityData {
  id: number;
  duration: number;
  tag: string;
  activityName: string;
  date: Date;
}

export interface IActivityInput {
  duration: number;
  tag: string;
  activityName: string;
}