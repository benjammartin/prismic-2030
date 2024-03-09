import React, { ComponentPropsWithRef, ElementType, ForwardedRef } from "react";
import PrismicSelector from "./prismic-selector";

type FixedForwardRef = <T, P = unknown>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = React.forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export const PrismicRepeatableComp = <T extends ElementType, P>(
  props: {
    as?: T;
    id: string;
    fields: P[];
    renderItem: (item: P, i: number) => React.ReactNode;
    className?: string;
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends T ? "span" : T>,
    "as"
  >,
  ref: ForwardedRef<unknown>
) => {
  const { as: Comp = "span", id, renderItem, fields, ...rest } = props;
  return (
    <PrismicSelector fieldId={id}>
      <Comp {...rest} ref={ref}>
        {fields.map(renderItem)}
      </Comp>
    </PrismicSelector>
  );
};
const PrismicRepeatable = fixedForwardRef(PrismicRepeatableComp);

export default PrismicRepeatable;
