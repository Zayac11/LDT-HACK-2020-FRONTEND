import React from 'react';
import * as axios from "axios";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './styles.css';

const code = `function add(a, b) {
  return a + b;
}
`;

// let instance = axios.create({
//     // withCredentials: true,
//     baseURL: 'http://127.0.0.1:8000',
//
// })

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     code: ""
        // };

        this.handleSubmit = this.handleSubmit.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }


    handleSubmit = (event) => {
        console.log(this.state)
    }
    // handleChange = (event) => {
    //     this.state.code = event.target.value
    // }
    state = { code };

    render() {
        return (
            <main className="container">
                <div className="container__content">
                    <div className="container_editor_area">
                        <Editor
                            placeholder={'Type some code'}
                            value={this.state.code}
                            onValueChange={code => this.setState({ code })}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            tabSize={4}
                            // style={{
                            //     width: 1000,
                            //     margin: 'auto',
                            //     fontFamily: '"Fira code", "Fira Mono", monospace',
                            //     fontSize: 16,
                            // }}
                            className="container__editor"
                        />
                    </div>

                    {/*<textarea onChange={this.handleChange} name="code">*/}

                    {/*</textarea>*/}
                    <button onClick={this.handleSubmit}>Submit</button>
                </div>
            </main>
        )
    }
}

export default Textarea;


