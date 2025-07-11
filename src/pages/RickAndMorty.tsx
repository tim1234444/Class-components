import { Component } from "react";
import { SearchForm } from "../components/RickAndMorty/form";
import { GetPersons } from "../api/GetPerson";


export  class RickAndMorty extends Component{
    
    render()  {
        return (
            <>
            <header className="header">
                <SearchForm ClickButton = {GetPersons}></SearchForm>
            </header>
            <main></main>
            <footer></footer>
            </>
        )
    }
}