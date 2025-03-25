function init(){
    console.log("Initializing")
    const input = document.getElementById('harInput')

    addEventListeners()

    function addEventListeners(){
        input.addEventListener("change", loadHarFile)
    }
    
    function loadHarFile(event) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            try{
                window.data = JSON.parse(e.target.result)
                window.entries = data.log.entries
                parseToTable(entries)
                console.log(data)
            } catch (error) {
                console.error("Error parsing JSON:" , error)
            }

        }
        reader.readAsText(file)
    }

    function parseToTable(entries){
        let table = document.getElementById('har-data-table')
        entries.forEach(element => {
            table.appendChild(createTableRow([element.request.url]))
        });
    }

    function createTableRow(rowData){
        let tableRow = document.createElement('tr')
        rowData.forEach(element => {
            let cell = document.createElement('td')
            cell.textContent = element
            tableRow.appendChild(cell)
        })
        return tableRow
    }
}

export {init}