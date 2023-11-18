import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useStorage } from "../../storage/Storage";
import { observer } from "mobx-react-lite";

export default observer(function Header() {
  const { userStorage } = useStorage();
  const navigate = useNavigate();

  const handleLogout = () => {
    userStorage.logoutUser();

    navigate("/");
  };

  return (
    <>
      <Navbar shouldHideOnScroll isBordered>
        <NavbarBrand>
          <p className="font-bold text-inherit">THE ENLIGHTENED SHELF</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" to="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link to="/find-books" aria-current="page">
              Find Books
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" to="/your-shelf">
              Your Shelf
            </Link>
          </NavbarItem>
          {userStorage.isAdmin() && (
            <NavbarItem>
              <Link color="foreground" to="/admin-page">
                Admin Page
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>
        <NavbarContent justify="end">
          {!userStorage.isLoggedIn() ? (
            <>
              <NavbarItem>
                <Button as={Link} to="/login" variant="bordered">
                  Login
                </Button>
              </NavbarItem>
              <NavbarItem className="hidden lg:flex">
                <Button as={Link} color="primary" to="/register" variant="flat">
                  Register
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className="hidden lg:flex">
              <Button color="primary" onClick={handleLogout} variant="flat">
                Logout
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
      <Outlet />
    </>
  );
});
