import { useCurrentAppContext } from '@/contexts/app-provider';
import { useEffect, useRef } from 'react';

const useSelectable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { dispatch } = useCurrentAppContext();
  useEffect(() => {
    const styledElements = ref.current?.querySelectorAll('[data-prismic-id]');
    styledElements?.forEach((el) => {
      (el as HTMLElement).style.border = '1px solid transparent';
      (el as HTMLElement).style.cursor = 'pointer';
    });
  }, [ref.current]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target as HTMLElement;
    const styledElements = ref.current?.querySelectorAll('[data-prismic-id]');
    styledElements?.forEach((el) => {
      (el as HTMLElement).style.border = '1px solid transparent';
      (el as HTMLElement).style.cursor = 'pointer';
    });
    if (target.dataset.prismicId) {
      target.style.border = '1px solid blue';
      dispatch({ type: 'SELECT_ELEMENT', payload: target.dataset.prismicId });
    }
  };

  return { ref, handleClick };
};

export default useSelectable;
