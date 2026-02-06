/**
 * Utility function to get correct image path for both development and production
 * Handles GitHub Pages base path automatically
 */
export const getImagePath = (path) => {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Use Vite's BASE_URL which includes the base path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}

