/**
 * create html markdown
 */
declare function html(
  components: TemplateStringsArray,
  ...values: (
    | boolean
    | void
    | null
    | string
    | number
    | (void | null | boolean | string | number)[])[]
): string;

/**
 * create application store from reducer
 */
declare function createStore<State, Action>(
  reducer: (state: State, action: Action) => State
): {
  /**
   * dispatch an app action
   */
  dispatch(action: Action, ...args: any[]): void;

  /**
   * mount a component on an element
   */
  attach<Component extends (...args: any[]) => string>(
    component: Component,
    root: Element
  ): void;

  /**
   * attach the app state to a component
   */
  connect(component: (state: State) => string): () => string;
  connect<A>(component: (state: State, a: A) => string): (a: A) => string;
  connect<A, B>(
    component: (state: State, a: A, b: B) => string
  ): (a: A, b: B) => string;
  connect<A, B, C>(
    component: (state: State, a: A, b: B, c: C) => string
  ): (a: A, b: B, c: C) => string;
  connect(component: (state: State, ...args: any[]) => string): (...args: any[]) => string;
};

export { createStore };
export default html;