import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import Client from "../../api/Client";
import Auth from "../../interfaces/auth/Auth";
import { useForm } from "react-hook-form";
import { useStorage } from "../../storage/Storage";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { userStorage } = useStorage();

  const onSubmit = async (data: any) => {
    const authData: Auth = {
      username: data.username,
      password: data.password,
    };

    const response = await Client.login(authData);

    userStorage.setUser(response.data);

    navigate("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] max-h-[100%]">
        <CardBody>
          <form>
            <p className="text-center p-4 font-bold text-3xl mb-2">Login in</p>
            <div className="mb-2 flex justify-center">
              <Input
                {...register("username")}
                label="Username"
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none p-3"
                    type="button"
                  ></button>
                }
                className="max-w-xs"
              />
            </div>
            <div className="mb-4 flex justify-center">
              <Input
                {...register("password")}
                type="password"
                label="Password"
                variant="bordered"
                endContent={
                  <button
                    className="focus:outline-none p-2"
                    type="button"
                  ></button>
                }
                className="max-w-xs"
              />
            </div>
            <div className="flex justify-center">
              <Button
                type="submit"
                as={Link}
                color="primary"
                to="/"
                variant="flat"
                className="w-24 h-10"
                onClick={handleSubmit(onSubmit)}
              >
                Sign in
              </Button>
            </div>
          </form>
          <div className="mt-2 text-center">
            <p>Don't have an account?</p>
            <Link to="/register" className="text-primary">
              Register now!
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
