import Index from '../pages/Home/Index';
import ListProjects from '../pages/Project/ListProjects';
import CreateProject from '../pages/Project/CreateProject';
import EditProject from '../pages/Project/EditProject';
import ListTasks from '../pages/Task/ListTasks';
import CreateTask from '../pages/Task/CreateTask';
import ListUsers from '../pages/User/ListUsers';
import Charts from '../pages/Statistics/Charts';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Logout from "../pages/Logout/Logout"
import AboutPage from '../pages/AboutPage/AboutPage';

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
    exactRoutes("/project/edit", EditProject),
    exactRoutes("/task/list", ListTasks),
    exactRoutes("/task/create", CreateTask),
    exactRoutes("/user/list", ListUsers),
    exactRoutes("/statistics/chart", Charts),
    exactRoutes("/login", Login),
    exactRoutes("/register", Register),
    exactRoutes("/log-out", Logout),
    exactRoutes("/about", AboutPage),
];

const redirects = [
    redirect("/", "/home/index"),
];

export {baseRoutes, redirects};
