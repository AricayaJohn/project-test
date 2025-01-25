import React, { useEffect, useState } from "react";
import ConventionAreaCard from "./ConventionAreaCard";
import ConventionAreaForm from "./ConventionAreaForm";  // Import the form

function HomePage() {
    const [conventionAreas, setConventionAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/convention_areas')
            .then((response) => response.json())
            .then((data) => {
                setConventionAreas(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError('Failed to load convention areas');
                setLoading(false);
            });
    }, []);

    const updateConventionAreas = (newArea) => {
        setConventionAreas((prevAreas) => [...prevAreas, newArea]);
    };

    const handleDeleteArea = (id) => {
        setConventionAreas((prevAreas) => prevAreas.filter(area => area.id !== id));
    };

    const handleUpdateArea = (updatedArea) => {
        setConventionAreas((prevAreas) => prevAreas.map(area => area.id === updatedArea.id ? updatedArea : area));
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h1>Convention Areas</h1>
            {conventionAreas.length > 0 ? (
                conventionAreas.map((area) => (
                    <ConventionAreaCard 
                        key={area.id} 
                        area={area} 
                        onDelete={handleDeleteArea}
                        onUpdate={handleUpdateArea}
                    />
                ))
            ) : (
                <p>No convention areas found.</p>
            )}
            <ConventionAreaForm updateConventionAreas={updateConventionAreas} />
        </div>
    );
}

export default HomePage;
