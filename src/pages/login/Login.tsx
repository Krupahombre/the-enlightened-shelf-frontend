import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] max-h-[100%]">
        <CardBody>
          <p className="text-center p-4 font-bold text-3xl mb-2">Login in</p>
          <div className="mb-2 flex justify-center">
            <Input
              label="Email"
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
              as={Link}
              color="primary"
              to="/"
              variant="flat"
              className="w-24 h-10"
            >
              Sign in
            </Button>
          </div>
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
