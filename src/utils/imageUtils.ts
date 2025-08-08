/// <reference types="vite/client" />

/**
 * Get the correct image URL that works both in development and production
 * This function ensures images load correctly with the GitHub Pages base path
 */
export function getImageUrl(imagePath: string): string {
  // Remove leading slash if present
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
  
  // Use Vite's BASE_URL environment variable to get the correct base path
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

/**
 * Get image URL specifically for images in the public/images folder
 */
export function getPublicImageUrl(imageName: string): string {
  return getImageUrl(`images/${imageName}`);
}
