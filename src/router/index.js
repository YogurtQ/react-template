/*
 * @Author: YogurtQ
 * @Date: 2020-12-23 15:33:32
 * @LastEditors: YogurtQ
 * @LastEditTime: 2021-10-08 12:15:34
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
