import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import AddHostForm from "./AddHostForm";  // Correct import path

function HostsPage() {
    const { conventionId } = useParams();
    const [hosts, setHosts] = useState([]);
    const [conventionName, setConventionName] = useState("");  // State for convention name
    const [status, setStatus] = useState("pending");
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch convention details to get the convention name
        fetch(`/conventions/${conventionId}`)
            .then((response) => response.json())
            .then((data) => {
                setConventionName(data.convention_name);
            })
            .catch((err) => {
                console.error('Error fetching convention details:', err);
                setError('Failed to load convention details');
            });

        // Fetch hosts for the specific convention
        fetch(`/hosts?convention_id=${conventionId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch hosts");
                }
            })
            .then((data) => {
                setHosts(data);
                setStatus("resolved");
            })
            .catch((err) => {
                console.error('Error fetching hosts:', err);
                setError(err.message);
                setStatus("rejected");
            });
    }, [conventionId]);

    const handleAddHost = (newHost) => {
        setHosts((prevState) => [...prevState, newHost]);
    };

    const handleDeleteHost = (id) => {
        fetch(`/hosts/${id}`, {
            method: 'DELETE',
        })
        .then((response) => {
            if (response.ok) {
                setHosts((prevState) => prevState.filter(host => host.id !== id));
            } else {
                throw new Error("Failed to delete host");
            }
        })
        .catch((error) => console.error('Error:', error));
    };

    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: {error}</h2>;

    return (
        <div>
            <h1>Hosts for {conventionName}</h1>  {/* Updated heading */}
            {hosts.length > 0 ? (
                <ul>
                    {hosts.map((host) => (
                        <li key={host.id}>
                            <h3>{host.name}</h3>
                            <p>Industry: {host.industry}</p>
                            <button onClick={() => handleDeleteHost(host.id)}>Delete Host</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hosts found for this convention.</p>
            )}
            <AddHostForm conventionId={conventionId} onAddHost={handleAddHost} />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default HostsPage;
