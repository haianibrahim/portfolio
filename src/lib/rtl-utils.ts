import { useLanguage } from '@/contexts/language-context';

/**
 * Conditionally applies styles based on the current language direction
 * 
 * @param ltrStyles - Styles to apply in left-to-right mode
 * @param rtlStyles - Styles to apply in right-to-left mode
 * @returns The appropriate styles based on current direction
 */
export function useDirectionalStyles<T>(ltrStyles: T, rtlStyles: T): T {
  const { dir } = useLanguage();
  return dir === 'rtl' ? rtlStyles : ltrStyles;
}

/**
 * Helper function for RTL margin/padding classes
 * Swaps left/right values for RTL layouts
 * 
 * @param ltrValue - The Tailwind class for LTR direction (e.g., "ml-4")
 * @param rtlValue - The Tailwind class for RTL direction (e.g., "mr-4")
 * @returns The appropriate class based on current direction
 */
export function useDirectionalClass(ltrValue: string, rtlValue: string): string {
  const { dir } = useLanguage();
  return dir === 'rtl' ? rtlValue : ltrValue;
} 