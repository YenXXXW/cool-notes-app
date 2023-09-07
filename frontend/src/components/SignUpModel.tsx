import { User } from "../models/user";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputFeild from "./form/TextInputFeild";
import stylesUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError } from "../errors/http_errors";

interface SignUpModelProps {
  onDismiss: () => void;
  onSingUpSuccessful: (user: User) => void;
}

const SignUpModel = ({ onDismiss, onSingUpSuccessful }: SignUpModelProps) => {
  const [errorText, setErrorText] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UsersApi.SignUp(credentials);
      onSingUpSuccessful(newUser);
    } catch (error) {
      if (error instanceof ConflictError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.log(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}

        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputFeild
            name="username"
            label="Usernmae"
            type="text"
            placeholder="username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputFeild
            name="email"
            label="Email"
            type="email"
            placeholder="email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
          />
          <TextInputFeild
            name="password"
            label="Password"
            type="password"
            placeholder="password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          {/* by adding the type="submit" when we press the submit button the
          onSubmit callback of the form triggers automatically */}

          <Button
            type="submit"
            disabled={isSubmitting}
            className={stylesUtils.width100}
          >
            SignUp
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SignUpModel;
