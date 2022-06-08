interface PartOfResult<T> {
  fulfilled: T;
  rejected: any;
}
type StateType = keyof PartOfResult<any>;

interface Result<T> extends PartOfResult<T> {
  state: StateType;
}

const awaitWrap = async <T extends Promise<any>>(p: T): Promise<Result<Awaited<T>>> => {
  let fulfilled;
  let rejected;
  let state: StateType;
  try {
    fulfilled = await p;
    state = 'fulfilled';
  } catch (error) {
    rejected = error;
    state = 'rejected';
  }
  return {
    fulfilled,
    rejected,
    state,
  };
};

export default awaitWrap;
