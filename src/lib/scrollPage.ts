import type Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function setLenisInstance(lenis: Lenis | null) {
  lenisInstance = lenis;
}

/** Smooth scroll to an element id; uses Lenis when the app has registered it. */
export function scrollToSectionById(sectionId: string, options?: { offset?: number }) {
  const element = document.getElementById(sectionId);
  if (!element) return;
  const offset = options?.offset ?? -80;
  if (lenisInstance) {
    lenisInstance.scrollTo(element, { offset, duration: 1.2 });
  } else {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
