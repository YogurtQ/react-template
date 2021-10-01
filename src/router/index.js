/*
 * @Author: QY
 * @Date: 2020-12-23 15:33:32
 * @LastEditors: QY
 * @LastEditTime: 2021-07-15 16:05:37
 * @Description: file content
 * @FilePath: \react-template\src\router\index.js
 */

import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';

const loadingComponent = () => <div>loading</div>;
export const loadable = (loader, loading = loadingComponent) => Loadable({ loader, loading });

const routes = [];

function Router() {
  return (
    <Switch>
      {routes.map((r) => (
        <Route path={r.path} key={r.name} component={loadable(r.component)} />
      ))}
      <Redirect to="/" />
    </Switch>
  );
}

export default Router;
