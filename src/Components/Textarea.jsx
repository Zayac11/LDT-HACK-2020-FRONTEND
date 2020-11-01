import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import './styles.css';

class Textarea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            code:
`function add(a, b) {
    return a + b;
}`
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            code: this.props.code
        })
    }

    handleSubmit = () => {
        this.props.handleSubmit(this.state.code)
        //Надо подвязать сюда callback из классовой контейнерной компоненты, где я буду сетать этот текст в тот local state и потом отправлять его
    }

    render() {
        return (
            <main className="container__textarea">
                <div className="container__content">
                    <select onChange={this.props.changeCurrentLanguage} name="languages"> {/*Нужно будет передавать callback'и из классового компонента, а так же локальный state в пропсах*/}
                        {
                            this.props.languages.map(l => <Selection key={l} changeCurrentLanguage={this.props.changeCurrentLanguage} value={l} />)
                        }
                    </select>
                    <div className="container_editor_area">
                        <Editor
                            placeholder={'Type some code'}
                            value={this.props.code}
                            onValueChange={code => {
                                this.props.handleChange({code})
                            }}
                            highlight={code => highlight(code, languages.js)}
                            padding={10}
                            tabSize={4}
                            className="container__editor"
                        />
                    </div>

                    <button onClick={this.handleSubmit} className={'submit-button'}>Проверить решение</button>
                </div>
            </main>
        )
    }
}

export default Textarea;

const Selection = (props) => {
    return(
        <option  value={`${props.value}`} >{props.value}</option>
    )
}
