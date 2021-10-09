/* eslint-disable no-param-reassign */
import { produce } from 'immer';

const update = produce((draft) => {
  draft.value = 2;
});

const originalState = {
  value: 1,
  foo: 'bar',
};

const nextState = update(originalState);
console.log(
  `nextState.value => ${nextState.value} originalState.value => ${originalState.value}`,
);
