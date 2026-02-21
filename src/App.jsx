import { useEffect, useState } from 'react'
import './App.css'
import { JobList } from './components/JobList'
import { getCandidateByEmail, getJobsList } from './api/nimbleApi'

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const candidateEmail = 'alejorea2015@gmail.com';
  useEffect(() => {
    const fetchData = async () => {
      try {
        const candidateData = await getCandidateByEmail(candidateEmail);
        const jobList = await getJobsList();

        setCandidate(candidateData);
        setJobs(jobList);
        setLoading(false);
      } catch (error) {
        setError(`Error cargando datos: ${error.message}`)
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p> 
  if (error) return <p>{error}</p>

  return (
    <div style={{padding: "2rem"}}>
      <h1>Posiciones disponibles</h1>
      <JobList jobs={jobs} candidate={candidate} />
    </div>
  )
}

export default App
