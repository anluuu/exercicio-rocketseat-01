import { Router } from 'express';
import { lodash as _ } from 'lodash';

const projects = [];

const routes = Router();

const checkIdExists = (req,res,next) => {
    const { id } = req.params;
    const exists = _.find(projects, ['id', id]);
    if (!exists) return res.status(400).json({error: 'Id dont exists'});
    return next();
};

routes.get('/projects', (req,res) => {
    return res.json(projects);
});

routes.post('/projects', (req,res) => {
    projects.push(req.body);
    return res.json(projects);
});

routes.put('/projects/:id', checkIdExists, (req,res) => {
    const { id } = req.params;
    const { title } = req.body;

    projects[id].title = title;
    return res.json(projects).status(200);
});
routes.post('/projects/:id/tasks', checkIdExists, (req,res) => {
    const { id } = req.params;
    const { tasks } = req.body;
    _.set(projects[id], 'tasks', tasks);

    return res.json(projects);
});
routes.delete('/projects/:id', checkIdExists, (req,res) => {
    const { id } = req.params;
    projects.splice(id, 1);
    return res.status(200);
});

routes.use((req,res,next) => {
    console.count('Requisições');
    next();
});

export default routes;