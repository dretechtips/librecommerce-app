import React from "react";

type ExtractReactProps<T> = T extends React.ComponentType<infer P> ? P : never;

type ExtractReactPureComponentProps<T> = T extends React.PureComponent<infer P>
  ? P
  : never;

type ExtractReactAllProps<T> =
  | ExtractReactProps<T>
  | ExtractReactPureComponentProps<T>;

/**
 * @typedef T React Component Type
 * @typedef U Required Instance Props
 * @typedef G Requires An Override ( Generic USE! )
 * @alias WrappedComponent React Component Class
 */
export abstract class DeferProps<
  T extends React.ComponentType<any> | React.PureComponent<any, any>,
  U extends keyof (ExtractReactProps<T> | ExtractReactPureComponentProps<T>)
> {
  protected abstract WrappedComponent: { new <T>(...props: any): T };
  protected props: Pick<ExtractReactAllProps<T>, U>;
  constructor(props: Pick<ExtractReactAllProps<T>, U>) {
    this.props = props;
  }
  public use(props: Omit<ExtractReactAllProps<T>, U>): JSX.Element {
    const Component: React.ComponentType<any> = this
      .WrappedComponent as React.ComponentType<any>;
    return <Component {...(props as any)} {...(this.props as any)} />;
  }
}

export default DeferProps;
