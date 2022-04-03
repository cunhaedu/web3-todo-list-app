import { BigNumber } from 'ethers';

export interface ITask {
  id: BigNumber;
  date: BigNumber;
  content: string;
  author: string;
  isDone: boolean;
  dateComplete: BigNumber;
}
