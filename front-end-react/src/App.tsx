import { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SessionStorage from '@/utils/SessionUtil';
import routes from './configs/routes';
import Loading from './common/Loading';

const App = () => (
    <Suspense fallback={<Loading />}>
        <Routes>
            {
                routes.map((item: any, index: number) =>
                (
                    <Route
                        key={index}
                        path={item.path}
                        element={
                            <CheckIsLogin requireLogin={item.requireLogin}>
                                <item.component />
                            </CheckIsLogin>
                        }
                    >
                        {item.children && item.children.map((s: any, i: number) => (
                            <Route
                                key={i}
                                path={s.path}
                                element={<s.component />}
                            />
                        ))}
                    </Route>
                )
                )
            }
        </Routes>
    </Suspense>
)
type CheckComParams = { requireLogin: Boolean, targetUrl?: string, children: JSX.Element };
const CheckIsLogin = ({ requireLogin, children }: CheckComParams) => {
    if (requireLogin && !SessionStorage.get('event-token')) {
        return <Navigate to="/login" />;
    }
    return children;
}
export default App;

