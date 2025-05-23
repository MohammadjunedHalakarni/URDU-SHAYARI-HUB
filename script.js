document.addEventListener('DOMContentLoaded', () => {
    // Shayari Filter and Pagination
    const filterButtons = document.querySelectorAll('.filter-btn');
    const shayariGrid = document.getElementById('shayari-grid');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');
    let currentPage = 1;
    const shayarisPerPage = 10;
    let currentCategory = 'all';

    function renderShayaris(page, category) {
        shayariGrid.innerHTML = '';
        const filteredShayaris = category === 'all' ? shayaris : shayaris.filter(s => s.category === category);
        const totalPages = Math.ceil(filteredShayaris.length / shayarisPerPage);
        currentPage = Math.min(page, totalPages) || 1;

        const start = (currentPage - 1) * shayarisPerPage;
        const end = start + shayarisPerPage;
        const paginatedShayaris = filteredShayaris.slice(start, end);

        paginatedShayaris.forEach(shayari => {
            const card = document.createElement('div');
            card.className = 'shayari-card';
            card.dataset.category = shayari.category;
            card.innerHTML = `
                <p class="urdu-text">${shayari.urdu}</p>
                <p class="english-text">${shayari.english}</p>
            `;
            shayariGrid.appendChild(card);
        });

        // Update pagination controls
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            currentPage = 1;
            renderShayaris(currentPage, currentCategory);
        });
    });

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderShayaris(currentPage, currentCategory);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        const filteredShayaris = currentCategory === 'all' ? shayaris : shayaris.filter(s => s.category === currentCategory);
        const totalPages = Math.ceil(filteredShayaris.length / shayarisPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderShayaris(currentPage, currentCategory);
        }
    });

    // Initial render
    renderShayaris(currentPage, currentCategory);

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const formMessage = document.getElementById('form-message');

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            });

            const result = await response.json();
            if (response.ok) {
                formMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                formMessage.className = 'form-message success';
                contactForm.reset();
            } else {
                formMessage.textContent = result.error || 'Failed to send message. Please try again.';
                formMessage.className = 'form-message error';
            }
        } catch (error) {
            formMessage.textContent = 'An error occurred. Please try again later.';
            formMessage.className = 'form-message error';
        }
    });
}

    // Parallax Effect for Hero Section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
});