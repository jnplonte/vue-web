export interface CommonState {
  language: string;
  breadcrumbList: Array<object>;
  loading: boolean;
  isDarkTheme: boolean;
  isFullscreen: boolean;
  mainContainerHeight: number;
  visitedRoutes: Array<object>;
  snackbars: Array<object>;
}
