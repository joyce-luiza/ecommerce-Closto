import Facade from "../controllers/Facade";

class ConsultCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json(await Facade.show(entityType, entityInfo));
    }
}

export default new ConsultCommand().execute;
