document.addEventListener('DOMContentLoaded', function() {
    const challenge1 = document.getElementById('challenge1');
    const challenge2 = document.getElementById('challenge2');
    const progressBar = document.getElementById('progressBar');
    
    let currentChallenge = 1;
    const totalChallenges = 2;
    
    function updateProgress() {
        const progress = ((currentChallenge - 1) / totalChallenges) * 100;
        progressBar.style.width = `${progress}%`;
    }
    
    function checkChallenges() {
        const url = window.location.href;
        
        // Challenge 1 Check
        if (url.includes('we3=tokenailready=')) {
            const domain = url.split('we3=tokenailready=')[1].split(/[?#]/)[0];
            if (domain) {
                challenge1.classList.add('completed');
                challenge1.querySelector('.status').textContent = 'Успешно!';
                challenge1.querySelector('.status').classList.replace('pending', 'success');
                
                challenge2.classList.remove('hidden');
                challenge2.classList.add('active');
                currentChallenge = 2;
                updateProgress();
                
                // Simulate loading next challenge
                setTimeout(() => {
                    window.history.pushState({}, '', window.location.pathname);
                    challenge2.scrollIntoView({ behavior: 'smooth' });
                }, 1500);
            }
        }
        
        // Challenge 2 Check
        if (url.includes('we15=tokenstopready=')) {
            const parts = url.split('we15=tokenstopready=')[1].split(/[?#]/)[0];
            if (parts.includes('=to=')) {
                const [fromDomain, toDomain] = parts.split('=to=');
                if (fromDomain && toDomain) {
                    challenge2.classList.add('completed');
                    challenge2.querySelector('.status').textContent = 'Редирект выполняется...';
                    challenge2.querySelector('.status').classList.replace('pending', 'success');
                    currentChallenge = 3;
                    updateProgress();
                    
                    setTimeout(() => {
                        alert('Редирект будет на: ' + toDomain);
                        // В реальном приложении: window.location.href = 'https://' + toDomain;
                    }, 2000);
                }
            }
        }
    }
    
    // Initial check
    checkChallenges();
    
    // Check when URL changes
    window.addEventListener('popstate', checkChallenges);
    
    // Update progress initially
    updateProgress();
});
