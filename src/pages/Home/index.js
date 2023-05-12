import React from 'react'
import Button from '../../components/Button'
import * as C from './styles'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../../hooks/UseAuth'
import { Form, Formik } from 'formik'
import { InputForm } from '../../components/Form/InputForm'
import * as Yup from 'yup'
import styled from 'styled-components'

const Container = styled.div`
    padding: 60px 0;
    display: flex;
    justify-content: center;
`;

const Content = styled.div`
    width: 80%;
    max-width: 600px;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 2px;
    padding: 30px 0;
`;

const Row = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 550px) {
    display: block;
  }
`;

const Footer = styled.div`
  text-align: end;
`;

const ButtonSalvar = styled.button`
  padding: 8px;
  font-size: 20px;
  cursor: pointer;
  background-color: #0081cf;
  color: white;
  border: none;
  border-radius: 5px;
`;

function Home() {
  const { signout } = UseAuth();
  const navigate = useNavigate();

  const initialValues = {
    nome: "",
    sobrenome: "",
    dataNascimento: "",
    naturalidade: "",
    endereço: "",
    cidade: "",
    email: "",
    celular: "",
  };

  const validationSchema = Yup.object({
    nome: Yup.string()
      .min(3, "O campo deve ter no mínimo 3 caracteres")
      .required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
    dataNascimento: Yup.date()
      .max(new Date(), "Não é possível incluir uma data futura")
      .required("Campo obrigatório"),
    celular: Yup.string()
      .max(13, "O campo deve ter no máximo 13 caracteres")
      .required("Campo obrigatório"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);

    setSubmitting(false);
  }

  return (
    <C.Container>
      <C.Title>Formulário</C.Title>
      <Container>
        <Content>
          <Formik
            onSubmit={handleSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {({ values, isSubmitting }) => (
              <Form style={{ width: "90%" }}>
                <Row>
                  <InputForm name="nome" required />
                  <InputForm name="sobrenome" required />
                </Row>
                <Row>
                  <InputForm 
                    name="dataNascimento"
                    type="date"
                    label="Data de Nascimento"
                    required
                  />
                  <InputForm name="naturalidade" />
                </Row>

                <Row>
                  <InputForm name="endereço" />
                  <InputForm name="cidade" disabled={!values.endereço} />
                </Row>

                <Row>
                  <InputForm name="email" type="email" required />
                  <InputForm name="celular" type="number" required />
                </Row>

                <Footer>
                  <ButtonSalvar type="submit" disabled={isSubmitting}>
                    Salvar
                  </ButtonSalvar>
                </Footer>
              </Form>
            )}
          </Formik>
        </Content>
      </Container>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  )
}

export default Home