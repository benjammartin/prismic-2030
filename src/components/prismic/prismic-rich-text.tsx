import React, { ComponentPropsWithRef, ElementType, ForwardedRef } from "react";
import PrismicSelector from "./prismic-selector";

type FixedForwardRef = <T, P = unknown>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode
) => (props: P & React.RefAttributes<T>) => React.ReactNode;

const fixedForwardRef = React.forwardRef as FixedForwardRef;

type DistributiveOmit<T, TOmitted extends PropertyKey> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export const PrismicRichTextComp = <T extends ElementType>(
  props: {
    as?: T;
    field: PrismicProp;
  } & DistributiveOmit<
    ComponentPropsWithRef<ElementType extends T ? "span" : T>,
    "as"
  >,
  ref: ForwardedRef<unknown>
) => {
  const { as: Comp = "span", field, ...rest } = props;
  return (
    <PrismicSelector fieldId={field.id}>
      <Comp {...rest} ref={ref}>
        {field.content}
      </Comp>
    </PrismicSelector>
  );
};
const PrismicRichText = fixedForwardRef(PrismicRichTextComp);

export default PrismicRichText;
