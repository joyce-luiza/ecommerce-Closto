import Facade from "../controllers/Facade";

class SaveCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json(await Facade.save(entityType, entityInfo));
    }
}

export default new SaveCommand().execute;
