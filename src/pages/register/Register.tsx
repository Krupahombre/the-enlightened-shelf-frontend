import { useState } from "react";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-[400px] max-h-[100%]">
        <CardBody>
          <p className="text-center p-4 font-bold text-3xl mb-2">Register</p>
          <div className="mb-2 flex justify-center">
            <Input
              name="email"
              label="Email"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
              className="max-w-xs"
            />
          </div>
          <div className="mb-2 flex justify-center">
            <Input
              name="username"
              label="Username"
              variant="bordered"
              value={formData.username}
              onChange={handleChange}
              className="max-w-xs"
            />
          </div>
          <div className="mb-2 flex justify-center">
            <Input
              name="first_name"
              label="First Name"
              variant="bordered"
              value={formData.first_name}
              onChange={handleChange}
              className="max-w-xs"
            />
          </div>
          <div className="mb-2 flex justify-center">
            <Input
              name="last_name"
              label="Last Name"
              variant="bordered"
              value={formData.last_name}
              onChange={handleChange}
              className="max-w-xs"
            />
          </div>
          <div className="mb-4 flex justify-center">
            <Input
              name="password"
              type="password"
              label="Password"
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
              className="max-w-xs"
            />
          </div>
          <div className="flex justify-center">
            <Button
              color="primary"
              variant="flat"
              className="w-24 h-10"
              onClick={handleSubmit}
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
