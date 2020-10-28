
let initialState = {
    className: "10Б",
    sprints: [
        {   name: "Python",
            task:[{

                id: 0,
                name: "Python1",
                status: true
            },
            {

                id: 1,
                name: "Python2",
                status: true

            },
            {

                id: 2,
                name: "Python3",
                status: false

            }]
        },
        {   name: "C++",
            task:[{

                id: 3,
                name: "C++1",
                status: true

            },
            {

                id: 4,
                name: "C++2",
                status: true

            },
            {

                id: 5,
                name: "C++3",
                status: false

            }]
        },
    ]
}

const sprintReducer = (state = initialState, action) => {
    switch (action.type) {

        default:
            return state;
    }
}

export default sprintReducer