import { useEffect } from 'react';
import { APP_NAME } from '../constants/brand';

export function useDocumentTitle(pageTitle) {
  useEffect(() => {
    document.title = pageTitle ? `${APP_NAME} | ${pageTitle}` : APP_NAME;
  }, [pageTitle]);
}
