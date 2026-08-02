import type { Directive, DirectiveBinding } from 'vue'

interface ScrollRevealOptions {
  /** Delay in milliseconds before the reveal animation starts, once in view. */
  delay?: number
}

type ScrollRevealBindingValue = ScrollRevealOptions | number | undefined

const activeObservers = new WeakMap<HTMLElement, IntersectionObserver>()

function getRevealOptions(value: ScrollRevealBindingValue): ScrollRevealOptions {
  return typeof value === 'number' ? { delay: value } : value ?? {}
}

function getDelayFromElement(el: HTMLElement): number | undefined {
  const delayAttr = el.dataset.srDelay ?? el.dataset.scrollRevealDelay
  if (!delayAttr) return undefined
  const delay = Number(delayAttr)
  return Number.isFinite(delay) ? delay : undefined
}

function scanScrollRevealElements(root: ParentNode = document): void {
  const elements = Array.from(root.querySelectorAll<HTMLElement>('.scroll-reveal'))
  for (const el of elements) {
    if (activeObservers.has(el) || el.classList.contains('scroll-reveal-visible')) {
      continue
    }
    revealElement(el, { delay: getDelayFromElement(el) })
  }
}

function revealElement(el: HTMLElement, options: ScrollRevealOptions) {
  el.classList.add('scroll-reveal')

  if (options.delay != null) {
    el.style.transitionDelay = `${options.delay}ms`
  } else {
    el.style.transitionDelay = ''
  }

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    el.classList.add('scroll-reveal-visible')
    return
  }

  const observer = new IntersectionObserver(
    function handleIntersect(entries) {
      const [entry] = entries
      if (entry.isIntersecting) {
        el.classList.add('scroll-reveal-visible')
        observer.unobserve(el)
      }
    },
    // Trigger a bit before the element enters the viewport so content is
    // already settling by the time you scroll to it.
    { threshold: 0, rootMargin: '0px 0px 80px 0px' },
  )

  observer.observe(el)
  activeObservers.set(el, observer)
}

function cleanupElement(el: HTMLElement) {
  const observer = activeObservers.get(el)
  observer?.unobserve(el)
  activeObservers.delete(el)
}

export function initScrollReveal() {
  if (typeof window === 'undefined') {
    return
  }

  scanScrollRevealElements(document)

  const mutationObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of Array.from(mutation.addedNodes)) {
          if (!(node instanceof HTMLElement)) {
            continue
          }
          if (node.matches('.scroll-reveal')) {
            scanScrollRevealElements(node)
          } else {
            scanScrollRevealElements(node)
          }
        }
      } else if (mutation.type === 'attributes') {
        const target = mutation.target as HTMLElement
        if (target.matches('.scroll-reveal')) {
          scanScrollRevealElements(target)
        }
      }
    }
  })

  mutationObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['class', 'data-sr-delay', 'data-scroll-reveal-delay'],
  })
}

/**
 * v-scroll-reveal
 *
 * Usage:
 *   <div v-scroll-reveal>...</div>
 *   <div v-scroll-reveal="{ delay: 150 }">...</div>
 *   <div v-scroll-reveal="150">...</div>
 *
 * For staggered grids/lists, pass the loop index times a fixed step:
 *   <PackageCard v-for="(pkg, index) in packages" :key="pkg.id" v-scroll-reveal="{ delay: index * 100 }" />
 *
 * Reveals once per element (observer disconnects after the first intersection),
 * and respects prefers-reduced-motion via the CSS in main.css.
 */
export const vScrollReveal: Directive<HTMLElement, ScrollRevealBindingValue> = {
  mounted(el, binding: DirectiveBinding<ScrollRevealBindingValue>) {
    revealElement(el, getRevealOptions(binding.value))
  },
  updated(el, binding: DirectiveBinding<ScrollRevealBindingValue>) {
    if (binding.value !== binding.oldValue) {
      cleanupElement(el)
      revealElement(el, getRevealOptions(binding.value))
    }
  },
  beforeUnmount(el) {
    cleanupElement(el)
  },
}
