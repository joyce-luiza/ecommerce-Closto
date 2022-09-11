import Facade from "../controllers/Facade";

class DeleteCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json(await Facade.delete(entityType, entityInfo));
    }
}

export default new DeleteCommand().execute;
