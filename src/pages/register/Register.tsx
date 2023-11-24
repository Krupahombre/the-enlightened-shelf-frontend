import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import SignUp from "../../interfaces/register/SignUp";
import Client from "../../api/Client";
import UserStorage from "../../storage/UserStorage";
import { useStorage } from "../../storage/Storage";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { userStorage } = useStorage();

  const onSubmit = async (data: any) => {
    const registerData: SignUp = {
      email: data.email,
      username: data.username,
      first_name: data.first_name,
      last_name: data.last_name,
      password: data.password,
    };

    console.log(registerData);

    const response = await Client.register(registerData);

    userStorage.setUser(response.data);

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] max-h-[100%]">
        <CardBody>
          <form>
            <p className="text-center p-4 font-bold text-3xl mb-2">Register</p>
            <div className="mb-2 flex justify-center">
              <Input
                {...register("email")}
                name="email"
                label="Email"
                variant="bordered"
                className="max-w-xs"
              />
            </div>
            <div className="mb-2 flex justify-center">
              <Input
                {...register("username")}
                name="username"
                label="Username"
                variant="bordered"
                className="max-w-xs"
              />
            </div>
            <div className="mb-2 flex justify-center">
              <Input
                {...register("first_name")}
                name="first_name"
                label="First Name"
                variant="bordered"
                className="max-w-xs"
              />
            </div>
            <div className="mb-2 flex justify-center">
              <Input
                {...register("last_name")}
                name="last_name"
                label="Last Name"
                variant="bordered"
                className="max-w-xs"
              />
            </div>
            <div className="mb-4 flex justify-center">
              <Input
                {...register("password")}
                name="password"
                type="password"
                label="Password"
                variant="bordered"
                className="max-w-xs"
              />
            </div>
          </form>
          <div className="flex justify-center">
            <Button
              as={Link}
              to="/"
              color="primary"
              variant="flat"
              className="w-24 h-10"
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </div>
          <div className="mt-2 text-center">
            <p>Already have an account?</p>
            <Link to="/login" className="text-primary">
              Sign in!
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
