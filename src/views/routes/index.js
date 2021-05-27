import Index from '../pages/Home/Index';
import ListProjects from '../pages/Project/ListProjects';
import CreateProject from '../pages/Project/CreateProject';
import ListUsers from '../pages/User/ListUsers';
import Charts from '../pages/Statistics/Charts';
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
    exactRoutes("/project/create", CreateProject),
    exactRoutes("/user/list", ListUsers),
    exactRoutes("/statistics/chart", Charts),
    exactRoutes("/login", Login),
    exactRoutes("/register", Register),
];

const redirects = [
    redirect("/", "/home/index"),
];

export {baseRoutes, redirects};
