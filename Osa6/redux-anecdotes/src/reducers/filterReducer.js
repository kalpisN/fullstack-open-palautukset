const filterAtStart = ''

export const search = (value) => {
    return { type: 'SEARCH', value}
}

const filterReducer = (state = filterAtStart, action) => {
    switch(action.type) {
        case 'SEARCH':
            state = action.value
            return state
          
          default:
            return state
        }
}

export default filterReducer