import { useForm } from "react-hook-form";
import * as UsersApi from "../network/users_api";
import { LoginCredentials } from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFeild from "./form/TextInputFeild";
import stylesUtils from "../styles/utils.module.css";
import { User } from "../models/user";
import { useState } from "react";
import { UnAuthorizedError } from "../errors/http_errors";

interface LoginInModelProps {
  onDismiss: () => void;
  onLogInSuccess: (user: User) => void;
}

const LogInModel = ({ onDismiss, onLogInSuccess }: LoginInModelProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      console.log(credentials);
      const user = await UsersApi.Login(credentials);
      onLogInSuccess(user);
    } catch (error) {
      if (error instanceof UnAuthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputFeild
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={stylesUtils.width100}
          >
            Log In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LogInModel;
