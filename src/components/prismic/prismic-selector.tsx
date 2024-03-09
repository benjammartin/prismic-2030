import useCurrentSelection from "@/hooks/use-current-selection";
import useSelectable from "@/hooks/use-selectable";
import React from "react";
import styles from "./prismic-selector.module.css";

const PrismicSelector: React.FC<{
  children: React.ReactNode;
  fieldId: string;
}> = (props) => {
  const ref = React.useRef(null);
  const { handleClick } = useSelectable(ref);
  const { id, component } = useCurrentSelection();
  const isSelected = id === props.fieldId;

  const onClick = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleClick(props.fieldId);
  };

  return (
    <div
      ref={ref}
      className={styles.selector}
      data-selected={isSelected}
      onClick={onClick}
      data-prismic-id={props.fieldId}
    >
      {isSelected && <span className={styles.selected}>{component?.name}</span>}
      {props.children}
    </div>
  );
};

export default PrismicSelector;
