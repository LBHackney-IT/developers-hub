import HomePage from "./pages/home/home.page";
import LoginPage from "./pages/login/login.page";
import RegisterPage from "./pages/register/register.page";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page"
import ContactPage from "./pages/contact/contact.page"
import { hyphenatedToTitleCase } from "./utility/utility";

const ApiNameBreadcrumb = ({ match }) => (
  <span>{hyphenatedToTitleCase(match.params.apiName)}</span>
);

const APP_PATHS = [
  {
    path: "/",
    Component: HomePage,
    breadcrumb: 'Home',
    headingName: 'HOME',
    alwaysVisible: true
  },
  {
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: 'API Catalogue',
    headingName: 'APIS',
    alwaysVisible: true
  },
  {
    path: "/api-catalogue/:apiName",
    Component: ApiInformationPage,
    breadcrumb: ApiNameBreadcrumb,
    alwaysVisible: false
  },
  {
    path: "/contact-us",
    Component: ContactPage,
    breadcrumb: 'Contact Us',
    headingName: 'CONTACT US',
    alwaysVisible: true
  },
  {
    path: "/login",
    Component: LoginPage,
    breadcrumb: 'Sign In',
    headingName: 'SIGN IN',
    signedOutVisible: true
  },
  {
    path: "/register",
    Component: RegisterPage,
    breadcrumb: 'Register',
    headingName: 'SIGN UP',
    signedOutVisible: true
  },
  {
    path: "/logout",
    Component: HomePage,
    breadcrumb: 'Register',
    headingName: 'SIGN OUT',
    signedInVisible: true
  },
]

export default APP_PATHS;
