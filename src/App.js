
import React from 'react';
import Form from 'react-bootstrap/Form'
import axios from 'axios';

class App extends React.Component {
  constructor(propr) {
    super(propr);
    this.state = {
      userInput: "",
      photo: [],

    }
  }
  updateUserInput = (e) => {

    this.setState({
      userInput: e.target.value
    })
  }

  handleSubmit = async (e) => {
    //http://localhost:3004/photo?photoName=car
    e.preventDefault()
    const url = `http://localhost:3004/photo?photoName=${this.state.userInput}`;

    const getFromServer = await axios.get(url)
    console.log(getFromServer.data)
    this.setState({
      photo: getFromServer.data
    })

  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>find photo</Form.Label>
            <Form.Control onChange={this.updateUserInput} type="text" placeholder="enter a search term" />
          </Form.Group>

        </Form>



        {this.state.photo && this.state.photo.map(item => {
          return (
            <>
              <p>{item.description}</p>
              <p>{item.name}</p>
              <img src={item.imgUrl} alt={item.description} />
            </>
          )

        })

        }


      </>
    );
  }
}
export default App;
