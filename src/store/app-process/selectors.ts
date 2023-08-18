import {State} from '../../types/state';
import {NameSpace} from '../../const';

export const getCity = (state: State): string =>
  state[NameSpace.App].city;

export const getError = (state: State): string | null =>
  state[NameSpace.App].error;
