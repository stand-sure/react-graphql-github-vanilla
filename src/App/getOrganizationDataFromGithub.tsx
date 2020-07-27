import axios from "axios";

const DEFAULT_PATH = "the-road-to-learn-react/the-road-to-learn-react";
const [INITIAL_ORGANIZATION, INITIAL_REPO] = DEFAULT_PATH.split("/");

const axiosGithubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`,
    },
});

const issuesQuery = `
 query ($organization: String!, $repository: String!, $cursor: String){
  organization(login: $organization){
    name
    url
    repository(name: $repository){
        name
        url
        issues(first: 5, states: [OPEN], after: $cursor){
            edges {
                node {
                    id
                    title
                    url
                    reactions(last: 5) {
                        edges {
                            node {
                                id
                                content
                            }
                        }
                    }
                }
            }
            totalCount
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
  }
}
`;

const getDataFromGithub = function getData({
    organizationName,
    repo,
    cursor,
}: {
    organizationName: string;
    repo: string;
    cursor?: string;
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
        query: issuesQuery,
        variables: {
            organization: organizationName,
            repository: repo,
            cursor: cursor,
        },
    });
};

export { DEFAULT_PATH, INITIAL_ORGANIZATION, INITIAL_REPO, getDataFromGithub };
