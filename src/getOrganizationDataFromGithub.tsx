import axios from "axios";

const DEFAULT_PATH = "the-road-to-learn-react/the-road-to-learn-react";
const [INITIAL_ORGANIZATION, INITIAL_REPO] = DEFAULT_PATH.split("/");

const axiosGithubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
});

const organizationQuery = ({
    organization,
    repo,
}: {
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

const getDataFromGithub = function getData({
    organizationName,
    repo,
}: {
    organizationName: string;
    repo: string;
}) {
    if (!organizationName || !repo) {
        return Promise.reject(
            `Expected both org name and repo. Got ${JSON.stringify({
                organizationName,
                repo,
            })}`
        );
    }

    return axiosGithubGraphQL.post("", {
        query: organizationQuery({
            organization: organizationName,
            repo,
        }),
    });
};

export { DEFAULT_PATH, INITIAL_ORGANIZATION, INITIAL_REPO, getDataFromGithub };
