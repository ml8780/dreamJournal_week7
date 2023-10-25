//getting the button to get data of input text
window.addEventListener('load', () => {
    document.getElementById('button').addEventListener('click', () => {
        let dreamData = document.getElementById('dream').value
        let colorData = document.getElementById('color').value
        let feelingData = document.getElementById('feeling').value

        let obj = {
            "dream": dreamData,
            "color": colorData,
            "feeling": feelingData
        };

        //stringify the obj
        let jsonData = JSON.stringify(obj);

        //fetch request
        fetch('/dream', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: jsonData
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
    })

    document.getElementById('get-tracker').addEventListener('click', () => {
        //get archived information
        fetch('/getArchive')
            .then(response => response.json())
            .then(data => {
                document.getElementById('archive-info').innerHTML = '';
                console.log(data.data);
                for (let i = 0; i < data.data.length; i++) {
                    let string = data.data[i].date + ' : My dream was about ' + data.data[i].dream + '/ I saw the color of ' + data.data[i].color + '/ I felt ' + data.data[i].feeling;
                    let elt = document.createElement('p');
                    elt.innerHTML = string;
                    document.getElementById('archive-info').appendChild(elt)
                }
            })
    })
})

