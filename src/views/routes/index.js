import Index from '../pages/Home/Index';
import ListProjects from '../pages/Project/ListProjects';
import ListUsers from '../pages/User/ListUsers';
import Dashboard from '../pages/Statistics/Charts';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';

const exactRoutes = (path, component) => ({
    path,
    component,
    exact: true,
});

const redirect = (from, to) => ({
    from,
    to,
    exact: true,
});

const baseRoutes = [
    exactRoutes("/home/index", Index),
    exactRoutes("/project/list", ListProjects),
    exactRoutes("/user/list", ListUsers),
    exactRoutes("/statistics/chart", Dashboard),
    exactRoutes("/login", Login),
    exactRoutes("/register", Register),
];

const redirects = [
    redirect("/", "/home/index"),
];

export {baseRoutes, redirects};
