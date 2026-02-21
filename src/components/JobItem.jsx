import React, { useState } from "react";
import { postApplyJob } from "../api/nimbleApi";

export const JobItem = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const onSubmit = async (e) => {
    if (!repoUrl) {
      setMessage("Se debe ingresar el URL del repositorio");
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await postApplyJob({
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.id,
        repoUrl: repoUrl,
      });

      if (res.ok) {
        setMessage("Aplicación enviada exitosamente");
      } else {
        setMessage("Error al enviar la aplicación");
      }
    } catch (error) {
      setMessage("Error al enviar la aplicación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "0.5rem",
        padding: "1rem",
        marginBottom: "1rem",
      }}
    >
      <h3>{job.title}</h3>

      <div style={{display: "flex", flexDirection: "column", gap: "0.5rem"}}>
        <input
          style={{padding: "0.5rem", fontSize: "1rem"}}
          type="text"
          placeholder="Ingresa el URL del respositorio"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />

        <button onClick={onSubmit} disabled={loading}>{loading ? "Aplicando..." : "Aplicar"}</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};
