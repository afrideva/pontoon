import type { PatternElement } from '@fluent/syntax';

import { isSimpleElement } from './isSimpleElement';

/**
 * Return true when all elements are supported in rich FTL editor.
 *
 * Elements are supported if they are:
 * - simple elements or
 * - select expressions, whose variants are simple elements
 */
export function areSupportedElements(elements: Array<PatternElement>): boolean {
  return elements.every((element) => {
    return (
      isSimpleElement(element) ||
      (element.type === 'Placeable' &&
        element.expression.type === 'SelectExpression' &&
        element.expression.variants.every((variant) => {
          return variant.value.elements.every((element) =>
            isSimpleElement(element),
          );
        }))
    );
  });
}
