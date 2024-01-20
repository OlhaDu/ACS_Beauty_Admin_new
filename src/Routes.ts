import React from 'react';

const Dashboard = React.lazy(() => import('../src/pages/Dashboard/Dashboard'));
const Categories = React.lazy(() => import('../src/pages/CategoriesPage/CategoriesPage'));
const Users = React.lazy(() => import('../src/pages/Users/Users'));
const Products = React.lazy(() => import('../src/pages/Products/Products'));
const NotFound = React.lazy(() => import('../src/pages/NotFound/NotFound'));

const routes = [
	{
		path: '/',
		component: Dashboard,
	},
	{
		path: '/categories',
		component: Categories,
	},
    {
		path: '/products',
		component: Products,
	},
	{
		path: '/users',
		component: Users,
	},
	{
		path: '*',
		component: NotFound,
	}
];

export default routes;
