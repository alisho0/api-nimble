import React, { useEffect, useState } from "react";
import { getJobsList } from "../api/nimbleApi";
import { JobItem } from "./JobItem";

export const JobList = ({ jobs, candidate }) => {
  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <JobItem key={job.id} job={job} candidate={candidate} />
        ))
      ) : (
        <p>Trabajos no disponbibles</p>
      )}
    </div>
  );
};
