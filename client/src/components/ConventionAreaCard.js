import React, { useState } from "react";
import { Link } from "react-router-dom";

function ConventionAreaCard({ area, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [locationName, setLocationName] = useState(area.location_name);
    const [venue, setVenue] = useState(area.venue);

    const handleDelete = () => {
        fetch(`/convention_areas/${area.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                onDelete(area.id);
            } else {
                throw new Error("Failed to delete convention area");
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleUpdate = () => {
        const updatedData = { location_name: locationName, venue: venue };
        fetch(`/convention_areas/${area.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(updatedArea => {
            onUpdate(updatedArea);
            setIsEditing(false);
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text" 
                        value={locationName} 
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                    <input 
                        type="text" 
                        value={venue} 
                        onChange={(e) => setVenue(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{area.location_name}</h2>
                    <p>{area.venue}</p>
                    <Link to={`/conventions/${area.id}`}>
                        View Conventions in {area.location_name}
                    </Link>
                    <br />
                    <button onClick={() => setIsEditing(true)}>Edit Area</button>
                    <button onClick={handleDelete}>Delete Area</button>
                </div>
            )}
        </div>
    );
}

export default ConventionAreaCard;
