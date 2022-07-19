function createCard(name, description, pictureUrl, start_date, end_date, location) {
    return `
        <div class="col">
            <div class="shadow p-0 mb-5 bg-body rounded">
                <div class="card">
                        <img src="${pictureUrl}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${name}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
                            <p class="card-text">${description}</p>
                        </div>
                        <div class="card-footer text-muted">
                            ${start_date} - ${end_date}
                        </div>
                </div>
            </div>
        </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {

    const url = 'http://localhost:8000/api/conferences/';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            return `
                <div class="alert alert-danger" role="alert">
                    Unable to fetch data :(
                </div>
                `;
        } else {
            const data = await response.json();

            for (let conference of data.conferences) {
                const detailUrl = `http://localhost:8000${conference.href}`;
                const detailResponse = await fetch(detailUrl);
                if (detailResponse.ok) {
                    const details = await detailResponse.json();
                    const name = details.conference.name;
                    const description = details.conference.description;
                    const pictureUrl = details.conference.location.picture_url;

                    const starts = details.conference.starts;
                    const start_date = new Date(starts).toLocaleDateString();


                    const ends = details.conference.ends;
                    const end_date = new Date(ends).toLocaleDateString();

                    const location = details.conference.location.name;

                    const html = createCard(name, description, pictureUrl, start_date, end_date, location);
                    const column = document.querySelector('.row');
                    column.innerHTML += html;

                }
            }

        }
    } catch (e) {
        return `
            <div class="alert alert-danger" role="alert">
                Unable to show data :(
            </div>
            `;
    }

});