import { Component, type ReactNode } from 'react';

export class SearchForm extends Component<{
  ClickButton: (
    name: string,
    e?: React.FormEvent<HTMLFormElement>,
  ) => Promise<void>;
}> {
  state = {
    field: localStorage.getItem('field') || '',
  };
  handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      field: e.target.value,
    });
  };
  render(): ReactNode {
    return (
      <>
        <form
          onSubmit={(e) => this.props.ClickButton(this.state.field, e)}
          className="search-form"
          action=""
        >
          <input
            onChange={this.handleFieldChange}
            value={this.state.field}
            className="search-form__input"
            type="text"
          />
          <button className="search-form__button" type="submit">
            <svg
              width="20"
              height="20"
              enableBackground="new 0 0 32 32"
              version="1.1"
              viewBox="0 0 32 32"
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z"></path>
            </svg>{' '}
          </button>
        </form>
      </>
    );
  }
}
