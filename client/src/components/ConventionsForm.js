import React, { useState } from "react";

function AddConventionForm({ areaId, onAddConvention }) {
    const [conventionName, setConventionName] = useState("");
    const [days, setDays] = useState("");
    const [hostCompanyId, setHostCompanyId] = useState("");  // Include hostCompanyId

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/conventions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                convention_name: conventionName,
                days: parseInt(days),
                convention_area_id: parseInt(areaId),
                host_company_id: parseInt(hostCompanyId)  // Include in the payload
            }),
        })
        .then(response => response.json())
        .then(newConvention => {
            onAddConvention(newConvention);
            setConventionName("");
            setDays("");
            setHostCompanyId("");  // Reset the field
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Convention</h2>
            <label>
                Convention Name:
                <input
                    type="text"
                    value={conventionName}
                    onChange={(e) => setConventionName(e.target.value)}
                />
            </label>
            <br />
            <label>
                Days:
                <input
                    type="number"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                />
            </label>
            <br />
            <label>
                Host Company ID:
                <input
                    type="number"
                    value={hostCompanyId}
                    onChange={(e) => setHostCompanyId(e.target.value)}
                />
            </label>
            <br />
            <button type="submit">Add Convention</button>
        </form>
    );
}

export default AddConventionForm;
