import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StatusBar,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import * as Yup from "yup";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { PasswordInput } from "../../components/PasswordInput";
import theme from "../../styles/theme";

import { Container, Header, Subtitle, Form, Title, Footer } from "./styles";
import { useAuth } from "../../hooks/auth";

export function SignIn() {
  const [email, setEmail] = useState("paulokrieger@gmail.com");
  const [password, setPassword] = useState("123456");

  const { signIn } = useAuth();

  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().required("A senha é obrigatória"),
      });

      await schema.validate({ email, password });


      signIn({ email, password });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        Alert.alert("Opa", err.message);
      } else {
        Alert.alert(
          "Erro de autenticação",
          "Ocorreu um erro ao fazer login, verifique suas credenciais"
        );
      }
    }
  }

  function handleNewAccount() {
    navigation.navigate("SignUpFirstStep" as any);
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      {/** Subir a tela quando abrir a tela de Input */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/** Quando clicar na tela, o teclado desabilitar */}

        <Container>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Header>
            <Title>Estamos{"\n"}quase lá.</Title>
            <Subtitle>
              Faça seu login para começar{"\n"}uma experiência incrível.
            </Subtitle>
          </Header>
          <Form>
            <Input
              iconName="mail"
              placeholder="E-mail"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              onChangeText={setPassword}
              value={password}
            />
          </Form>
          <Footer>
            <Button
              title="Login"
              onPress={handleSignIn}
              enabled={true}
              loading={false}
            />
            <Button
              title="Criar conta gratuita"
              color={theme.colors.background_secondary}
              onPress={handleNewAccount}
              enabled={true}
              loading={false}
              light={true}
            />
          </Footer>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
