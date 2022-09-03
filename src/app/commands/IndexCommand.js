import Facade from "../controllers/Facade";

class IndexCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json(await Facade.index(entityType, entityInfo));
    }
}

export default new IndexCommand().execute;
