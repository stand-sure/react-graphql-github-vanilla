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
        id
        name
        url
        viewerHasStarred
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

const addStarQuery = `
    mutation ($repositoryId: ID!) {
        addStar(input: {starrableId: $repositoryId}) {
            starrable {
                viewerHasStarred
            }
        }
    }`;

const removeStarQuery = `
    mutation ($repositoryId: ID!) {
        removeStar(input: {starrableId: $repositoryId}) {
            starrable {
                viewerHasStarred
            }
        }
    }`;

type StarrableShape = {
    starrable: { viewerHasStarred: boolean };
};

const toggleStar = function toggleStar({
    id,
    previouslyStarred,
}: {
    id: string;
    previouslyStarred: boolean;
}) {
    return axiosGithubGraphQL
        .post("", {
            query: previouslyStarred ? removeStarQuery : addStarQuery,
            variables: {
                repositoryId: id,
            },
        })
        .then((res) => {
            const data: {
                addStar?: StarrableShape;
                removeStar?: StarrableShape;
            } = res.data?.data;
            const viewerHasStarred = (data.addStar ?? data.removeStar)
                ?.starrable?.viewerHasStarred;
            return Promise.resolve(viewerHasStarred);
        });
};

export {
    DEFAULT_PATH,
    INITIAL_ORGANIZATION,
    INITIAL_REPO,
    getDataFromGithub,
    toggleStar,
};
