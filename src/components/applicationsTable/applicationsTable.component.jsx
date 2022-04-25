import React from "react";
import Skeleton from "react-loading-skeleton";
import { useUser } from "../../context/user.context";

import ApiInformationLink from "../apiInformationLink/apiInformationLink.component";
import DeleteDialog from "../dialogs/deleteDialog.component";

const ApplicationsTable = ({ apiStatus, apiData, onDelete }) => {
  let user = useUser();
  let authAllowedGroups =
    process.env.REACT_APP_AUTH_ALLOWED_GROUPS || "Development Team,TEST_GROUP";
  const isAuthorised = user.groups.some((group) =>
    authAllowedGroups.split(",").includes(group)
  );

  let history = useHistory();
  let { apiId } = useParams();
  const addApplicationOnClick = () => {
    history.push(`/api-catalogue/${apiId}/application/new`);
  };

    return (
        <dl className="govuk-summary-list lbh-summary-list">
            {apiData.applications.map((application, key) => (
                <div key={key} className="govuk-summary-list__row">
                    <dd className="govuk-summary-list__key">
                        <ApiInformationLink linkText={application.name} url={application.link}/>
                    </dd>
                    {isAuthorised && <dt className="govuk-summary-list__actions">
                        <ul>
                            <li className="govuk-summary-list__actions-list-item">
                                <button 
                                    className="lbh-link lbh-link--no-visited-state edit-link"
                                >
                                    Edit<span className="govuk-visually-hidden"> application</span>
                                </button>
                            </li>
                            <li className="govuk-summary-list__actions-list-item">
                                <DeleteDialog onDelete={onDelete} applicationName={application.name}/>
                            </li>
                        </ul>
                    </dt>}
                </div>
            ))}
        </dl>
    );
};

export default ApplicationsTable;
