import { IActivityData, Order } from "../types";

export function fnActivityListByTag(list: IActivityData[]) {
  return list.reduce((acc: any, cur) => {
    if (!acc[cur.tag as string]) {
      acc[cur.tag as string] = [{
        id: cur._id,
        duration: cur.duration,
        tag: cur.tag,
        name: cur.name,
        date: cur.date
      }];
      return acc;
    } else {
      const sameActivityIndex = acc[cur.tag as string].findIndex((a: IActivityData) => a.name === cur.name);
      if (sameActivityIndex > -1) {
        acc[cur.tag as string][sameActivityIndex].duration += cur.duration;
      } else {
        acc[cur.tag as string] = [
          ...acc[cur.tag as string],
          {
            id: cur._id,
            duration: cur.duration,
            tag: cur.tag,
            name: cur.name,
            date: cur.date
          }
        ]
      }
      return acc;
    }
  }, {})
}

export function fnDescendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function fnGetComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => fnDescendingComparator(a, b, orderBy)
    : (a, b) => -fnDescendingComparator(a, b, orderBy);
}

export function fnStableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function fnParseInputValue(input: string, date: string): Partial<IActivityData> {
  const temp = input.split(" ");
  let count = 0;
  let duration = '';
  let tag = '';
  let name = '';

  temp.forEach(word => {
    if (count === 0) {
      if (word === 'hr' || word === 'hrs') {
        count++;
      } else {
        duration += word;
      }
    } else if (count === 1) {
      if (word[0] === '#') {
        tag = word.slice(1);
        count++;
      }
    } else if (count === 2) {
      name += word + " ";
    }
  });

  return {
    duration: Number(duration),
    tag,
    name: name.trimEnd(),
    date: date.toString() || new Date().toString(),
  } 
}
