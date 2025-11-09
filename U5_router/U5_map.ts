export const navigationMap: Record<string, string> = {
  
};

// --- This part remains the same ---
export const pageToComponentMap: Record<string, string> = {};
for (const componentId in navigationMap) {
  const pageId = navigationMap[componentId];
  if (pageId && pageId !== 'GO_BACK' && pageId !== 'EXTERNAL_LINK') {
    if (!pageToComponentMap[pageId]) {
      pageToComponentMap[pageId] = componentId;
    }
  }
}