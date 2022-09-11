import Facade from "../controllers/Facade";

class UpdateCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json(await Facade.update(entityType, entityInfo));
    }
}

export default new UpdateCommand().execute;
