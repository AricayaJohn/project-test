// src/components/AddHostForm.js

import React, { useState } from "react";

function AddHostForm({ conventionId, onAddHost }) {
    const [name, setName] = useState("");
    const [industry, setIndustry] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/hosts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                industry,
                convention_id: parseInt(conventionId)
            }),
        })
        .then(response => response.json())
        .then(newHost => {
            onAddHost(newHost);
            setName("");
            setIndustry("");
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Host</h2>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Industry:
                <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Add Host</button>
        </form>
    );
}

export default AddHostForm;
