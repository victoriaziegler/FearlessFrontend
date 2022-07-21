window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');

    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();

        for (let conference of data.conferences) {
            const option = document.createElement('option');
            option.value = conference.href;
            option.innerHTML = conference.name;
            selectTag.appendChild(option);
        }

        const loadTag = document.getElementById('loading-conference-spinner');
        loadTag.classList.add('d-none')
        selectTag.classList.remove('d-none')

        const formTag = document.getElementById('create-attendee-form');
        formTag.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const attendeeUrl = 'http://localhost:8000/api/attendees/';
            const fetchConfig = {
                method: "post",
                body: json,
                headers: {
                    'Content-Type': 'applications/json',
                },
            };
            const response = await fetch(attendeeUrl, fetchConfig);
            if (response.ok) {
                formTag.reset();
                const newLocation = await response.json();
                const successTag = document.getElementById('success-message')
                successTag.classList.remove('d-none')
            }
        });

    }
});