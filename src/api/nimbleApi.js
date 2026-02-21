const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net';

export const getCandidateByEmail = async (email) => {
    const res = await fetch(`${BASE_URL}/api/candidate/get-by-email?email=${encodeURIComponent(email)}`);
    if (!res.ok) {
        throw new Error(`Error al obtener el candidato: ${res.status}`);
    }
    return await res.json();
}

export const getJobsList = async () => {
    const res = await fetch(`${BASE_URL}/api/jobs/get-list`);
    if (!res.ok) {
        throw new Error(`Error al obtener la lista de trabajos: ${res.status}`);
    }
    return await res.json();
}

export const postApplyJob = async (data) => {
    try {
        const res = await fetch(`${BASE_URL}/api/candidate/apply-to-job`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const responseData = await res.json();
        
        if (!res.ok) {
            const errorMsg = responseData?.message || responseData?.error || `Error ${res.status}`;
            throw new Error(`Error al aplicar al trabajo: ${errorMsg}`);
        }
        
        return responseData;
    } catch (error) {
        console.error('Error en postApplyJob:', error);
        throw error;
    }
}