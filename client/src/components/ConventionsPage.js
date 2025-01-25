import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ConventionCard from "./ConventionCard";
import AddConventionForm from "./ConventionsForm";

function ConventionsPage() {
    const [conventions, setConventions] = useState([]);
    const [areaName, setAreaName] = useState("");  // State for area name
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("pending");
    const { areaId } = useParams();

    useEffect(() => {
        // Fetch area details to get the area name
        fetch(`/convention_areas/${areaId}`)
            .then((response) => response.json())
            .then((data) => {
                setAreaName(data.location_name);
            })
            .catch((err) => {
                console.error('Error fetching area details:', err);
                setError('Failed to load area details');
            });

        // Fetch conventions for the specific area
        fetch(`/conventions?convention_area_id=${areaId}`)
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to fetch conventions");
                }
            })
            .then((data) => {
                setConventions(data);
                setStatus("resolved");
            })
            .catch((err) => {
                console.error('Error fetching conventions:', err);
                setError(err.message);
                setStatus("rejected");
            });
    }, [areaId]);

    const handleAddConvention = (newConvention) => {
        setConventions((prevConventions) => [...prevConventions, newConvention]);
    };

    const handleDeleteConvention = (id) => {
        setConventions((prevConventions) => prevConventions.filter(convention => convention.id !== id));
    };

    const handleUpdateConvention = (updatedConvention) => {
        setConventions((prevConventions) => prevConventions.map(convention => convention.id === updatedConvention.id ? updatedConvention : convention));
    };

    if (status === "pending") return <h2>Loading...</h2>;
    if (status === "rejected") return <h2>Error: {error}</h2>;

    return (
        <div>
            <h1>Conventions in {areaName}</h1>  {/* Updated heading */}
            {conventions.length > 0 ? (
                conventions.map((convention) => (
                    <ConventionCard
                        key={convention.id}
                        convention={convention}
                        onDelete={handleDeleteConvention}
                        onUpdate={handleUpdateConvention}
                    />
                ))
            ) : (
                <p>No conventions found for this area.</p>
            )}
            <AddConventionForm areaId={areaId} onAddConvention={handleAddConvention} />
            <Link to="/">Back to Home</Link>
        </div>
    );
}

export default ConventionsPage;
