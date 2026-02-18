document.addEventListener('DOMContentLoaded', () => {
    diaktablazatfeltoltese();
});

const diaktablazatfeltoltese = async () => {
    try {
        const response = await getMethodFetch('http://127.0.0.1:3000/api/diakok');
        const diakTablaBody = document.getElementById('diakTablaBody');
        response.diakok.forEach((element) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.innerHTML = element.nev;
            td2.innerHTML = element.osztaly;
            tr.replaceChildren(td1, td2);
            diakTablaBody.appendChild(tr);
        });
    } catch (error) {
        console.log(error);
    }
};

const getMethodFetch = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Hiba: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw new Error(`Hiba történt: ${error.message}`);
        });
};
