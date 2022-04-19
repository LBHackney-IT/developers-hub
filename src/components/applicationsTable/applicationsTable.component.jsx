import React from "react";
import Skeleton from "react-loading-skeleton";
import { useUser } from "../../context/user.context";
import ApiInformationLink from "../../components/apiInformationLink/apiInformationLink.component.jsx";

const ApplicationsTable = ({apiStatus, apiData, onDelete}) => {
    let user = useUser();
    let authAllowedGroups = process.env.AUTH_ALLOWED_GROUPS || "Development Team,TEST_GROUP";
    const isAuthorised = user.groups.some((group) => authAllowedGroups.split(",").includes(group));

    if(!apiStatus.isLoaded) return <Skeleton />
    if(apiData.applications.length === 0) return <p className="lbh-body-m">No applications found.</p>

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
                                <button 
                                    onClick={() => onDelete(application.name)}
                                    className="lbh-link lbh-link--no-visited-state delete-link"
                                >
                                    Delete<span className="govuk-visually-hidden"> application</span>
                                </button>
                            </li>
                        </ul>
                    </dt>}
                </div>
            ))}
        </dl>
    );
};

export default ApplicationsTable;
