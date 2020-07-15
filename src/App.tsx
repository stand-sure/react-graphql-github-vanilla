import React, {
    useRef,
    FormEvent,
    useEffect,
    useCallback,
} from "react";
import "./App.css";
import { Organization } from "./Organization";
import { getDataFromGithub } from "./organizationQuery";
import { useAppState } from "./useAppState";

type Maybe<T> = T | null | undefined;

const TITLE = "React GraphQL Github Client";

const App = function App() {
    // const [path, setPath] = useState(DEFAULT_PATH);
    // const [organization, setOrganization] = useState({
    //     name: null,
    //     url: null,
    // });
    // const [organizationName, setOrganizationName] = useState(
    //     INITIAL_ORGANIZATION
    // );
    // const [errors, setErrors] = useState(null);
    // const [repo, setRepo] = useState(INITIAL_REPO);

    const {
        path,
        setPath,
        organization,
        setOrganization,
        organizationName,
        setOrganizationName,
        errors,
        setErrors,
        repo,
        setRepo,
    } = useAppState();

    const url = useRef(null);

    const fetchDataFromGithub = useCallback(
        () =>
            getDataFromGithub({ organizationName, repo }).then((res) => {
                setOrganization({ ...res.data.data.organization });
                setErrors(res.data.errors);
            }),
        [organizationName, repo, setOrganization, setErrors]
    );

    const onSubmit = (ev: FormEvent) => {
        const newPath = ((url.current as any) as HTMLInputElement).value;
        const [newName, newRepo] = newPath.split("/");

        if (!newName || !newRepo) {
            return;
        }

        setPath(newPath);
        setOrganizationName(newName);
        setRepo(newRepo);

        fetchDataFromGithub();

        ev.preventDefault();
    };

    useEffect(() => {
        fetchDataFromGithub();
    }, [fetchDataFromGithub, path]);

    return (
        <div>
            <header style={{ textAlign: "center", backgroundColor: "cyan" }}>
                {TITLE}
            </header>
            <form onSubmit={onSubmit}>
                <label htmlFor="url">
                    Show open issues for https://github.com/
                </label>
                <input
                    id="url"
                    type="text"
                    ref={url}
                    style={{ width: "300px" }}
                    placeholder="user/repo"
                    defaultValue={path}
                />
                <button type="submit">Search</button>
            </form>
            <hr />
            <Organization organization={organization} errors={errors} />
        </div>
    );
};

export default App;
