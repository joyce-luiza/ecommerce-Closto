class ValidatePassword {
    process(info) {
        if(info.password && info.password.length < 8) {
            return { password: 'The password must have at least 8 characters.'};
        }

        return null;
    }
}

export default new ValidatePassword().process;