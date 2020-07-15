import axios from "axios";
const axiosGithubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
});
const GetOrganizationQuery = ({
    organization,
    repo, }: {
        organization: string;
        repo: string;
    }) => `
{
  organization(login: "${organization}"){
    name
    url
  }
}
`;
export const DEFAULT_PATH = "the-road-to-learn-react/the-road-to-learn-react";
export const [INITIAL_ORGANIZATION, INITIAL_REPO] = DEFAULT_PATH.split("/");
export const getDataFromGithub = function getData({
    organizationName,
    repo, }: {
        organizationName: string;
        repo: string;
    }) {
    debugger;
    if (!organizationName || !repo) {
        return Promise.reject(
            `Expected both org name and repo. Got ${JSON.stringify({
                organizationName,
                repo,
            })}`
        );
    }

    return axiosGithubGraphQL.post("", {
        query: GetOrganizationQuery({
            organization: organizationName,
            repo,
        }),
    });
};
