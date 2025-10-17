document.getElementById('checkBtn').addEventListener('click', getAgePrediction);

async function getAgePrediction() {
    const name = document.getElementById('nameInput').value.trim();
    const resultContainer = document.getElementById('resultContainer');

    if (!name) {
        resultContainer.innerHTML = `<p class="text-danger text-center"> Моля, въведи име!</p>`;
        return;
    }

    resultContainer.innerHTML = `<p class="text-center text-muted">Зареждане на резултата...</p>`;

    try {
        const response = await fetch(`https://api.agify.io/?name=${name}`);
        const data = await response.json();

        if (!data.age) {
            resultContainer.innerHTML = `<p class="text-warning text-center"> Няма налична информация за това име.</p>`;
            return;
        }

        resultContainer.innerHTML = `
            <div class="col-md-6">
                <div class="card border-info shadow-sm">
                    <div class="card-body text-center">
                        <h4 class="card-title text-capitalize">Име: <span class="text-primary">${data.name}</span></h4>
                        <p class="card-text fs-4"> Предполагаема възраст: <strong>${data.age}</strong> години</p>
                        <p class="card-text text-muted"> Брой анализирани записи: ${data.count}</p>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error(error);
        resultContainer.innerHTML = `<p class="text-danger text-center"> Възникна грешка при заявката!</p>`;
    }
}