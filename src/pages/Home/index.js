// import React from 'react'
// import Button from '../../components/Button'
// import * as C from './styles'
// import { useNavigate } from 'react-router-dom'
// import UseAuth from '../../hooks/UseAuth'
// import { Form, Formik } from 'formik'
// import { InputForm } from '../../components/Form/InputForm'
// import * as Yup from 'yup'
// import styled from 'styled-components'

// const Container = styled.div`
//     padding: 60px 0;
//     display: flex;
//     justify-content: center;
// `;

// const Content = styled.div`
//     width: 80%;
//     max-width: 600px;
//     display: flex;
//     justify-content: center;
//     box-shadow: 0 1px 2px;
//     padding: 30px 0;
// `;

// const Row = styled.div`
//   display: flex;
//   gap: 20px;

//   @media (max-width: 550px) {
//     display: block;
//   }
// `;

// const Footer = styled.div`
//   text-align: end;
// `;

// const ButtonSalvar = styled.button`
//   padding: 8px;
//   font-size: 20px;
//   cursor: pointer;
//   background-color: #0081cf;
//   color: white;
//   border: none;
//   border-radius: 5px;
// `;

// function Home() {
//   const { signout } = UseAuth();
//   const navigate = useNavigate();

//   const initialValues = {
//     nome: "",
//     sobrenome: "",
//     dataNascimento: "",
//     naturalidade: "",
//     endereço: "",
//     cidade: "",
//     email: "",
//     celular: "",
//   };

//   const validationSchema = Yup.object({
//     nome: Yup.string()
//       .min(3, "O campo deve ter no mínimo 3 caracteres")
//       .required("Campo obrigatório"),
//     sobrenome: Yup.string().required("Campo obrigatório"),
//     email: Yup.string().email("E-mail inválido").required("Campo obrigatório"),
//     dataNascimento: Yup.date()
//       .max(new Date(), "Não é possível incluir uma data futura")
//       .required("Campo obrigatório"),
//     celular: Yup.string()
//       .max(13, "O campo deve ter no máximo 13 caracteres")
//       .required("Campo obrigatório"),
//   });

//   const handleSubmit = (values, { setSubmitting }) => {
//     console.log(values);

//     setSubmitting(false);
//   }

//   return (
//     <C.Container>
//       <C.Title>Formulário de Cadastro</C.Title>
//       <Container>
//         <Content>
//           <Formik
//             onSubmit={handleSubmit}
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//           >
//             {({ values, isSubmitting }) => (
//               <Form style={{ width: "90%" }}>
//                 <Row>
//                   <InputForm name="nome" required />
//                   <InputForm name="sobrenome" required />
//                 </Row>
//                 <Row>
//                   <InputForm 
//                     name="dataNascimento"
//                     type="date"
//                     label="Data de Nascimento"
//                     required
//                   />
//                   <InputForm name="naturalidade" />
//                 </Row>

//                 <Row>
//                   <InputForm name="endereço" />
//                   <InputForm name="cidade" disabled={!values.endereço} />
//                 </Row>

//                 <Row>
//                   <InputForm name="email" type="email" required />
//                   <InputForm name="celular" type="number" required />
//                 </Row>

//                 <Footer>
//                   <ButtonSalvar type="submit" disabled={isSubmitting}>
//                     Salvar
//                   </ButtonSalvar>
//                 </Footer>
//               </Form>
//             )}
//           </Formik>
//         </Content>
//       </Container>
//       <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
//         Sair
//       </Button>
//     </C.Container>
//   )
// }

// export default Home

import GlobalStyle from "../../styles/global";
import styled from "styled-components";
import Form from "../../components/Form/Form";
import Grid from "../../components/Grid/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import UseAuth from "../../hooks/UseAuth";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function Home() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const { signout } = UseAuth();
  const navigate = useNavigate();

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>USUÁRIOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </>
  );
}

export default Home;