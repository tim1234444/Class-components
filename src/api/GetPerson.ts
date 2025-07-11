export async function GetPersons(name:string){
    const res = await fetch(`https://rickandmortyapi.com/api/character/?name=${name}`)
    const data = await res.json()
    console.log(data)
 }