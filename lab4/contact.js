async function fetchTeamData(){
    try{
        const response = await fetch('http://localhost:3000/contact');
        if (!response.ok)            {
            const message = `Ошибка загрузки данных: ${response.status} ${response.statusText}`;
            throw new Error(message);
        }
        const data = await response.json();
        console.log(data);
    }
    catch (error){
        console.error('Ошибка:', error.message);
    }
}

fetchTeamData();
document.getElementById('id=contactForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !message){
        alert("Все поля должны быть заполнены!");
        return;
    }
    const formData = { name, message };
    try {
        const response = await fetch('http://localhost:3000/contact',{
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok){
            let errorMessage = `Ошибка отправки формы: ${response.status} ${response.statusText}`;
            try            {
              const errorData = await response.json();
              errorMessage += ` - ${errorData.message || 'Неизвестная ошибка'}`;
            } catch (jsonError){

              console.error("Error JSON:", jsonError);
            }
            throw new Error(errorMessage);
          }

        console.log("Отправленные данные:", formData);
    }
    catch (error)    {
        console.error(error);
        alert(`Ошибка: ${error.message}`);
    }
});
