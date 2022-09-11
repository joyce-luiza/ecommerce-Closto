import '../../styles/LoginRegisterStyle.css';

import Form from '../../components/Form';

function LoginRegister() {
    return (
        <div className='form-container'>
            <Form title="login">
                <label className="form-label" htmlFor="loginEmail" >E-mail</label>
                <input className="form-input" type="text" name="loginEmail" id="loginEmail" />

                <label className="form-label" htmlFor="loginPassword" >Senha</label>
                <input className="form-input" type="password" name="loginPassword" id="loginPassword" />

                <button className="form-btn" type="submit">Entrar</button>

                <p className="form-confirmText">
                    <a href="">
                        Esqueci minha senha
                    </a>
                </p >
            </Form>

            <hr className='div-loginRegister'/>

            <Form title="Cadastro">
            <label className="form-label" htmlFor="firstName" >Nome</label>
                <input className="form-input" type="text" name="firstName" id="firstName"/>

                <label className="form-label" htmlFor="lastName" >Sobrenome</label>
                <input className="form-input" type="text" name="lastName" id="lastName"/>

                <label className="form-label" htmlFor="registerEmail" >E-mail</label>
                <input className="form-input" type="text" name="registerEmail" id="registerEmail"/>

                <label className="form-label" htmlFor="cpf" >CPF</label>
                <input className="form-input" type="text"  placeholder="000.000.000-00" name="cpf" id="cpf"/>

                <label className="form-label" htmlFor="genre" >Sexo</label>
                <select className="form-select" name="genre" id="genre">
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                </select>


                <label className="form-label" htmlFor="birthDate" >Data de nascimento</label>
                <input className="form-input" type="date" name="birthDate" id="birthDate"/>

                <label className="form-label" htmlFor="phoneNumber" >Celular</label>
                <input className="form-input" type="text" placeholder="(00) 00000-0000" name="phoneNumber" id="phoneNumber"/>

                <label className="form-label" htmlFor="registerPassword" >Senha</label>
                <input className="form-input" type="password" name="registerPassword" id="registerPassword"/>

                <label className="form-label" htmlFor="confirmPassword" >Confirmar Senha</label>
                <input className="form-input" type="password" name="confirmPassword" id="confirmPassword"/>

                <p className="form-confirmText">
                    Ao criar uma conta, você concorda com nossas <a href="">políticas de privacidade.</a>
                </p>

                <button className="form-btn" type="submit">Criar Conta</button>
            </Form>
        </div>
    )
}

export default LoginRegister;