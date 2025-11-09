// File: U5_router/U5_state.ts
import { reactive } from 'vue';

// This holds the reactive information about the current route.
export const currentRouteInfo = reactive({
  path: '',
  pageId: '', // e.g., 'P_7'
});

/**
 * Updates the global route state based on the current page stack.
 * This function should be called whenever a page is loaded or shown.
 */
export function updateCurrentRoute() {
  const pages = getCurrentPages();
  if (pages.length === 0) {
    return;
  }
  
  const currentPage = pages[pages.length - 1];
  const routePath = currentPage.route;
  
  // Extract page ID like 'P_7' from a path like 'U1_pages/P_7'
  const pageIdMatch = routePath?.match(/([^\/]+)$/);
  const newPageId = pageIdMatch ? pageIdMatch[1] : '';

  if (currentRouteInfo.pageId !== newPageId) {
    console.log(`[Route State] Page changed to: ${newPageId}`);
    currentRouteInfo.path = routePath || '';
    currentRouteInfo.pageId = newPageId;
  }
}