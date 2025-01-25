import React, { useState } from "react";
import { Link } from "react-router-dom";

function ConventionCard({ convention, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [conventionName, setConventionName] = useState(convention.convention_name);
    const [days, setDays] = useState(convention.days);

    const handleDelete = () => {
        fetch(`/conventions/${convention.id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                onDelete(convention.id);
            } else {
                throw new Error("Failed to delete convention");
            }
        })
        .catch(error => console.error('Error:', error));
    };

    const handleUpdate = () => {
        const updatedData = { convention_name: conventionName, days: parseInt(days) };
        fetch(`/conventions/${convention.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(response => response.json())
        .then(updatedConvention => {
            onUpdate(updatedConvention);
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
                        value={conventionName} 
                        onChange={(e) => setConventionName(e.target.value)}
                    />
                    <input 
                        type="number" 
                        value={days} 
                        onChange={(e) => setDays(e.target.value)}
                    />
                    <button onClick={handleUpdate}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                </div>
            ) : (
                <div>
                    <h2>{convention.convention_name}</h2>
                    <p>Days: {convention.days}</p>
                    <Link to={`/hosts/${convention.id}`}>
                        View Hosts
                    </Link>
                    <br />
                    <button onClick={() => setIsEditing(true)}>Edit Convention</button>
                    <button onClick={handleDelete}>Delete Convention</button>
                </div>
            )}
        </div>
    );
}

export default ConventionCard;
