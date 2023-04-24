'use strict';

const chatbotText = [
    [
        {
            text: 'Здраствуйте, чем я могу вам помочь?',
        },
        {
            text: 'была ли это информация полезной?'
        },
        {
            text: 'Рады были Вам помочь! Спасибо за обращение!'
        },
        {
            text: 'Если вы не получили ответ на свой вопрос, напишите нам на почту ceofinjust@gmail.com'
        },
        {
            text: 'Введите ваше сообщение'
        },
        {
            text: 'Выберите пункты'
        }
    ],
    [
        {
            text: 'Саламатсызбы, сизге кантип жардам берсем болот?'
        },
        {
            text: 'бул маалымат пайдалуу болдубу?'
        },
        {
            text: 'Биз сизге жардам бергенибизге кубанычтабыз! Пикириңиз үчүн рахмат!'
        },
        {
            text: 'Сурооңузга жооп ала элек болсоңуз, бизге check.edu.gov.kg.@gmail.com дарегине кат жазыңыз.'
        },
        {
            text: 'Кабарыңызды киргизиңиз'
        },
        {
            text: 'Элементтерди тандаңыз'
        }
    ]
]

// let data;
// fetch('./chatbot.json').then(response => {
//     return response.json()
// }).then(json => {
//     data = json;
// });

let chatbot_questions = document.querySelector('#chatbot_questions');

let questions;
let category;

for (let i = 0; i < chatbot_questions.children.length; i++) {
    if (chatbot_questions.children[i].dataset.name == 'questions') {
        questions = chatbot_questions.children[i];
    }
    if (chatbot_questions.children[i].dataset.name == 'category') {
        category = chatbot_questions.children[i];
    }
}
let m = [];
for (let i = 0; i < questions.children.length; i++) {
    console.log(questions.children[i])
    let obj = {};
    for (let j = 0; j < questions.children[i].children.length; j++) {
        obj[questions.children[i].children[j].dataset.name] = questions.children[i].children[j].innerText;
    }
    m[i] = obj;
}
let data = [[...m]];
let cat = [];

for (let i = 0; i < category.children.length; i++) {
    cat[i] = {
        id: category.children[i].dataset.id,
        vopros: category.children[i].innerText
    }
}
cat = [[...cat]]


const ChatBotButton = () => {
    const [openChat, setOpenChat] = React.useState(false);
    const [iconSvg, setIconSvg] = React.useState('rgba(55, 99, 255, 0.3)');
    const onClickBtn = () => {
        setOpenChat(true)
    }
    const handleClose = () => {
        setOpenChat(false);
    }
    return <div className="containerChat">
        {
            openChat && <ChatBot handleClose={handleClose} />
        }
        <button className="chatbotBtnBlock" onClick={onClickBtn}>
            <svg width="32" height="33" viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12.75 29H12C6 29 3 27.5 3 20V12.5C3 6.5 6 3.5 12 3.5H24C30 3.5 33 6.5 33 12.5V20C33 26 30 29 24 29H23.25C22.785 29 22.335 29.225 22.05 29.6L19.8 32.6C18.81 33.92 17.19 33.92 16.2 32.6L13.95 29.6C13.71 29.27 13.155 29 12.75 29Z"
                    stroke="#6A8AFF" stroke-width="2.25" stroke-miterlimit="10" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M23.9947 17H24.0082" stroke="#6A8AFF" stroke-width="3" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M17.9932 17H18.0067" stroke="#6A8AFF" stroke-width="3" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M11.9918 17H12.0052" stroke="#6A8AFF" stroke-width="3" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
    </div>
}



const ChatList = ({ data, onClick }) => {
    return <React.Fragment>
        {chatbotText[0][5].text}
        <ul className="chatListBlock">
            {
                data[0].map(elem => {
                    return <li className="chatListItem" onClick={() => { onClick(elem) }}>{elem.vopros}</li>
                })
            }
        </ul>
    </React.Fragment>
}

let words = [
    [
        'првет',
        'привет',
        'ghbdtn',
        'здравствуй',
        'Привет',
        'Ghbdtn'
    ],
    [
        'Привет',
        'Здравствуйте',
        'Добрый день',
        'Рад тебя видеть!'
    ],
    [
        'Пока',
        'До свидания',
        'пока'
    ],
    [
        'Пока',
        'До свидания',
        'Приходи еше',
        'Я буду скучать!'
    ],
]

function answering(words, elem) {
    for (let i = 0; i < words[0].length; i++) {
        if (elem.text.trim() == words[0][i] && elem.variant === 'client') {
            let s = Math.floor(Math.random() * words[1].length)
            console.log(s);
            return words[1][s];
        }
        if (elem.text.trim() == words[2][i] && elem.variant === 'client') {
            let s = Math.floor(Math.random() * words[3].length)
            console.log(s);
            return words[3][s];
        }
    }
}

function proverka(text, prev) {
    if (prev && text) {
        if (prev.variant !== 'voprosbot' && text.variant === 'client') {
            return '1';
        }
        if (
            prev.variant === 'voprosbot' && text.text === 'да'
            || prev.variant === 'voprosbot' && text.text === 'ооба'
            || prev.variant === 'voprosbot' && text.text === 'оба'
            || prev.variant === 'voprosbot' && text.text === 'yes'
        ) {
            return '2';
        }
        if (prev.variant === 'voprosbot' && text.text !== '') {
            return '3';
        }
    }
    return false;
}

function filterLayer(arr, data) {
    let word = arr[arr.length - 1].text;
    let f = data.flat(1)
    let newData = f.filter(elem => {
        if (elem.vopros.toLowerCase().trim().replace(/[^a-zа-яё0-9\s]/gi, "").indexOf(word.toLowerCase().trim().replace(/[^a-zа-яё0-9\s]/gi, "")) !== -1) {
            return elem;
        }
    })
    return [[...newData]];
}

function getQuestions(arr, elem) {
    let k = arr.flat(1);
    let p = k.filter(el => {
        return +el.parent_id === +elem.id;
    })
    return [[...p]]
}

const ChatBot = ({ handleClose }) => {
    const [input, setInput] = React.useState('');
    const [btn, setBtn] = React.useState(false);
    const [messages, setMessages] = React.useState([]);
    const [questions, setQuoestions] = React.useState();
    const windowref = React.useRef();

    const onClickItem = (elem) => {
        setMessages((prev) => {
            let arr = prev.filter(elem => elem.variant !== 'vopros');
            let date = new Date();
            arr = [...arr, { id: Date.now(), text: elem.vopros, variant: 'client', time: `${date.getHours()}:${date.getMinutes()}` }]
            return arr;
        })
        setTimeout(() => {
            setMessages((prev) => {
                let arr = prev.filter(elem => elem.variant !== 'vopros');
                arr = [...arr, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }];
                return arr;
            })
        }, 1000)
        setTimeout(() => {
            setMessages((prev) => {
                let arr = prev.filter(elem => elem.variant !== 'loader');
                let date = new Date();
                arr = [...arr, { id: Date.now(), text: elem.text, variant: 'admin', time: `${date.getHours()}:${date.getMinutes()}` }]
                return arr;
            })
        }, 2000)
    }
    const onClicktwoItem = (elem) => {
        setMessages((prev) => {
            let arr = prev.filter(elem => elem.variant !== 'vopros');
            let date = new Date();
            arr = [...arr, { id: Date.now(), text: elem.vopros, variant: 'client', time: `${date.getHours()}:${date.getMinutes()}` }]
            return arr;
        })
        setTimeout(() => {
            setMessages((prev) => {
                let arr = prev.filter(elem => elem.variant !== 'vopros');
                arr = [...arr, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }];
                return arr;
            })
        }, 1000)
        setTimeout(() => {
            setMessages((prev) => {
                let arr = prev.filter(elem => elem.variant !== 'loader');
                let date = new Date();
                let newData = getQuestions(data, elem);
                arr = [...arr, { id: Date.now(), text: <ChatList data={newData} onClick={onClickItem} />, variant: 'admin', time: `${date.getHours()}:${date.getMinutes()}` }]
                return arr;
            })
        }, 2000)
    }
    const handleChange = (e) => {
        setInput(e.target.value);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let date = new Date();
        setMessages([...messages, { id: Date.now(), text: input, variant: 'client', time: `${date.getHours()}:${date.getMinutes()}` }]);
        setInput('');
        setBtn(prev => !prev);
    }

    React.useEffect(() => {
        if (messages.length === 0) {
            var time = setTimeout(() => {
                setTimeout(() => {
                    setMessages(prev => {
                        let arr = prev.filter(elem => { elem.variant !== 'loader' });
                        let date = new Date();
                        arr = [...arr, { id: Date.now(), text: chatbotText[0][0].text, variant: 'admin', time: `${date.getHours()}:${date.getMinutes()}` }];
                        return arr;
                    })
                }, 1000);
                setMessages((prev) => {
                    let loader = prev.find(elem => elem.variant === 'loader')
                    if (!loader) {
                        return [...prev, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }]
                    }
                    return prev;
                });
            }, 500)
        }
        if (proverka(messages[messages.length - 1], messages[messages.length - 2]) === '1') {
            var time = setTimeout(() => {
                setMessages((prev) => {
                    let arr = prev.filter(elem => elem.variant !== 'loader');
                    let date = new Date();
                    let otvet = answering(words, arr[arr.length - 1])
                    if (otvet) {
                        return [...arr, { id: Date.now(), text: otvet, variant: 'admin', time: `${date.getHours()}:${date.getMinutes()}` }]
                    }
                    arr = [...arr, { id: Date.now(), text: <ChatList data={cat} onClick={onClicktwoItem} />, variant: 'admin', time: `${date.getHours()}:${date.getMinutes()}` }]
                    return arr;
                });
            }, 1000);
            setMessages((prev) => {
                let loader = prev.find(elem => elem.variant === 'loader');
                if (!loader) {
                    return [...prev, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }];
                }
                return prev;
            });
        }
        if (proverka(messages[messages.length - 1], messages[messages.length - 2]) === '2') {
            var time = setTimeout(function () {
                setMessages((prev) => {
                    let arr = prev.filter(elem => elem.variant !== 'loader');
                    let date = new Date();
                    arr = [...arr, { id: Date.now(), text: chatbotText[0][2].text, variant: 'vopros', time: `${date.getHours()}:${date.getMinutes()}` }]
                    return arr;
                });
            }, 1000);
            setMessages((prev) => {
                let loader = prev.find(elem => elem.variant === 'loader')
                if (!loader) {
                    return [...prev, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }]
                }
                return prev;
            });
        }
        if (proverka(messages[messages.length - 1], messages[messages.length - 2]) === '3') {
            var time = setTimeout(function () {
                setMessages((prev) => {
                    let arr = prev.filter(elem => elem.variant !== 'loader');
                    let date = new Date();
                    arr = [...arr, { id: Date.now(), text: chatbotText[0][3].text, variant: 'vopros', time: `${date.getHours()}:${date.getMinutes()}` }]
                    return arr;
                });
            }, 1000);
            setMessages((prev) => {
                let loader = prev.find(elem => elem.variant === 'loader')
                if (!loader) {
                    return [...prev, { id: Date.now(), text: <div className="loader"></div>, variant: 'loader' }]
                }
                return prev;
            });
        }
        return () => {
            clearTimeout(time)
        }
    }, [btn])

    React.useEffect(() => {
        windowref.current.scrollTo(0, windowref.current.scrollHeight);
    }, [messages])

    return (
        <div className="chatbotBlock">
            <div className="chatbotHeader">
                <h2 className="chatbotHeaderText">
                    <span>ФинЮст-консалт чат-бот</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Img" onClick={handleClose}>
                        <path d="M18.7279 18.728L6 6.00006" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M18.7279 6.27202L6 18.9999" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </h2>
            </div>
            <div className="chatbotWindow" ref={windowref}>
                {
                    messages.map((message) => {
                        return <div className={`chatbotText ${message.variant === 'client' && 'client'}`}>
                            <span className={`Span ${message.variant === 'client' && 'SpanClient'}`}>
                                {message.text} <span className="time">{message.time}</span>
                            </span>
                        </div>
                    })
                }
            </div>
            <form className="chatbotForm" onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={handleChange} placeholder="Введите текст" />
                <button type="submit">отправить</button>
            </form>
        </div >
    );
};

let domContainer = document.querySelector('#chatbot');
ReactDOM.render(<ChatBotButton />, domContainer);