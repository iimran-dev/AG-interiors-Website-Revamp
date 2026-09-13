import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BASE_PATH =
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined
    ? process.env.NEXT_PUBLIC_BASE_PATH
    : "/ag-interiors";

/**
 * Resolves local assets, images, and icons to include the configured Next.js basePath.
 * Preserves external URLs (https://, http://, data:, blob:) untouched.
 */
export function getAssetUrl(url: string | null | undefined): string {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }

  const cleanUrl = url.startsWith("/") ? url : `/${url}`;

  if (BASE_PATH && BASE_PATH !== "/") {
    const normalizedBasePath = BASE_PATH.endsWith("/")
      ? BASE_PATH.slice(0, -1)
      : BASE_PATH;
    const prefix = normalizedBasePath.startsWith("/")
      ? normalizedBasePath
      : `/${normalizedBasePath}`;

    if (!cleanUrl.startsWith(prefix)) {
      return `${prefix}${cleanUrl}`;
    }
  }

  return cleanUrl;
}


