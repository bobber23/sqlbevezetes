document.addEventListener('DOMContentLoaded', () => {
    diaktablazatfeltoltese();
});

const diaktablazatfeltoltese = async () => {
    try {
        const response = await getMethodFetch('http://127.0.0.1:3000/api/diakok');
        const diakTablaBody = document.getElementById('diakTablaBody');
        let i = 1;
        response.diakok.forEach((element) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            const td3 = document.createElement('td');
            const button = document.createElement('button');
            button.classList.add('btn', 'btn-primary');
            button.setAttribute('id', i);
            button.innerHTML = 'Jegyek megjelenítése';
            button.addEventListener('click', async function jegyekMegjelenitese() {
                const results = await getMethodFetch(
                    `http://127.0.0.1:3000/api/jegyek/${button.id}`
                );
                const diakJegyBody = document.getElementById('diakJegyBody');
                results.jegyek.forEach((element) => {});
            });
            td1.innerHTML = element.nev;
            td2.innerHTML = element.osztaly;
            td3.replaceChildren(button);
            tr.replaceChildren(td1, td2, td3);
            diakTablaBody.appendChild(tr);
            i++;
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
