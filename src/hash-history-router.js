// @flow
import createHashHistory from 'history/lib/createHashHistory';
import useBasename from 'history/lib/useBasename';
import useQueries from 'history/lib/useQueries';

import installRouter from './store-enhancer';
import routerMiddleware from './middleware';

type HashHistoryRouterArgs = {
  routes: Object,
  basename: string,
  hashType: string,
  getLocation: () => Location,
  passRouterStateToReducer?: bool
};

/* istanbul ignore next: unstubbable! */
const realLocation = () => window.location;

export default ({
  routes,
  basename,
  hashType = 'slash',
  getLocation = realLocation,
  passRouterStateToReducer = false
}: HashHistoryRouterArgs) => {
  const history = useBasename(useQueries(createHashHistory))({
    basename,
    hashType
  });

  const { hash } = getLocation();

  // The hash will begin with one of the following prefixes:
  //     #     If hashType == 'noslash'
  //     #/    If hashType == 'slash'
  //     #!/   If hashType == 'hashbang'

  const hashWithoutPrefix = hash.replace(/^((#\/)|(#!\/)|(#))/, '');

  const pathname = `/${ hashWithoutPrefix }`;

  const location = history.createLocation({ pathname });

  return {
    routerEnhancer: installRouter({
      routes,
      history,
      location,
      passRouterStateToReducer
    }),
    routerMiddleware: routerMiddleware({ history })
  };
};
