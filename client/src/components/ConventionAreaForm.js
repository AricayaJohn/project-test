import React, { useState } from "react";

function ConventionAreaForm({ updateConventionAreas }) {
    const [locationName, setLocationName] = useState("");
    const [venue, setVenue] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const newArea = { location_name: locationName, venue: venue };

        fetch("/convention_areas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newArea),
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error("Failed to add convention area");
        })
        .then((data) => {
            // Update the parent component's state with the newly added convention area
            updateConventionAreas(data);
            setLocationName("");  // Clear the form
            setVenue("");
        })
        .catch((error) => {
            console.error("Error submitting form:", error);
        });
    };

    return (
        <div>
            <h1>Add Convention Area</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Location Name:
                    <input
                        type="text"
                        value={locationName}
                        onChange={(e) => setLocationName(e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Venue:
                    <input
                        type="text"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ConventionAreaForm;
