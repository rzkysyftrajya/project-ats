export interface PreloadResource {
  href: string
  as: "style" | "script" | "image" | "font" | "fetch"
  type?: string
  crossorigin?: "anonymous" | "use-credentials"
}

export const criticalResources: PreloadResource[] = [
  {
    href: "/styles/critical.css",
    as: "style",
  },
  {
    href: "/fonts/inter-var.woff2",
    as: "font",
    type: "font/woff2",
    crossorigin: "anonymous",
  },
]

export function preloadResource(resource: PreloadResource): void {
  if (typeof window === "undefined") return

  const link = document.createElement("link")
  link.rel = "preload"
  link.href = resource.href
  link.as = resource.as

  if (resource.type) {
    link.type = resource.type
  }

  if (resource.crossorigin) {
    link.crossOrigin = resource.crossorigin
  }

  document.head.appendChild(link)
}

export function preloadCriticalResources(): void {
  if (typeof window === "undefined") return

  criticalResources.forEach(preloadResource)
}

export function removeUnusedPreloads(): void {
  if (typeof window === "undefined") return

  const preloadLinks = document.querySelectorAll('link[rel="preload"]')

  preloadLinks.forEach((link) => {
    const href = link.getAttribute("href")
    const as = link.getAttribute("as")

    // Check if the resource is actually used
    let isUsed = false

    if (as === "style") {
      isUsed = document.querySelector(`link[rel="stylesheet"][href="${href}"]`) !== null
    } else if (as === "script") {
      isUsed = document.querySelector(`script[src="${href}"]`) !== null
    } else if (as === "image") {
      isUsed = document.querySelector(`img[src="${href}"]`) !== null
    }

    // Remove unused preload after 10 seconds
    if (!isUsed) {
      setTimeout(() => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      }, 10000)
    }
  })
}

export function optimizeResourceLoading(): void {
  if (typeof window === "undefined") return

  // Preload critical resources immediately
  preloadCriticalResources()

  // Clean up unused preloads after page load
  window.addEventListener("load", () => {
    setTimeout(removeUnusedPreloads, 5000)
  })
}
