import React from 'react'
import Button from '../../components/Button'
import * as C from './styles'
import { useNavigate } from 'react-router-dom'
import UseAuth from '../../hooks/UseAuth'

function Home() {
  const { signout } = UseAuth();
  const navigate = useNavigate();

  return (
    <C.Container>
      <C.Title>Home</C.Title>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>
  )
}

export default Home