import { Router } from 'express';

const routes = Router();

routes.get('/teste', (req, res) => {
    return res.json({ status: 'ok'});
});

export default routes;