function createCard(name, description, pictureUrl, start_date, end_date, location) {
    return `
        <div class="col mb-4">
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
        if (!response.ok) {
            const response = await fetch(url);
            var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
            var alertTrigger = document.getElementById('liveAlertBtn')
    
            function alert(message, type) {
            var wrapper = document.createElement('div')
            wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'
    
            alertPlaceholder.append(wrapper)
            }
    
            if (alertTrigger) {
            alertTrigger.addEventListener('click', function () {
                alert('Nice, you triggered this alert message!', 'success')
            })
            }
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
        const response = await fetch(url);
        var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
        var alertTrigger = document.getElementById('liveAlertBtn')

        function alert(message, type) {
        var wrapper = document.createElement('div')
        wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

        alertPlaceholder.append(wrapper)
        }

        if (alertTrigger) {
        alertTrigger.addEventListener('click', function () {
            alert('Nice, you triggered this alert message!', 'success')
        })
        }
    }

});