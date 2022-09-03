class SaveCommand {
    async execute(req, res) {
        const entityType = req.route.path;
        const entityInfo = req.body;
        return res.json({ ok: true });
    }
}

export default new SaveCommand().execute;
