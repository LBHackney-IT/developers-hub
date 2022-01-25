import { hyphenatedToTitleCase, camelToTitleCase } from "./utility/utility.js";

import HomePage from "./pages/home/home.page.jsx";
import LoginPage from "./pages/login/login.page.jsx";
import ApiCataloguePage from "./pages/apiCatalogue/apiCatalogue.page.jsx";
import ApiInformationPage from "./pages/apiInformation/apiInformation.page.jsx";
import ContactPage from "./pages/contact/contact.page.jsx";

import Link from "./components/link/link.component.jsx";

const ApiNameBreadcrumb = ({ match }) => {
  return <span>{match.params.apiName.includes("-") ? hyphenatedToTitleCase(match.params.apiName) : camelToTitleCase(match.params.apiName) }</span>
}

const ApiCatalogueBreadcrumb = ({match, location}) => {
  if(location.search){
    return (
      <>
        <span className="govuk-breadcrumbs__list-item">
          <Link className="govuk-breadcrumbs__link" href={match}>Search</Link>
        </span>
        <span className="govuk-breadcrumbs__list-item" aria-current="page">Search for "{decodeURIComponent(location.search.replace("?query=", "").replaceAll("+", " "))}"</span>
      </>
    )
  } else {
    return(
      <span>API Catalogue</span>
    )
  }
}

const APP_PATHS = [
  {
    path: "/",
    Component: HomePage,
    breadcrumb: 'Home',
    headingName: 'HOME',
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
    path: "/api-catalogue",
    Component: ApiCataloguePage,
    breadcrumb: ApiCatalogueBreadcrumb,
    headingName: 'API CATALOGUE',
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
    breadcrumb: "Contact Us",
    alwaysVisible: false
  }
]

export default APP_PATHS;
