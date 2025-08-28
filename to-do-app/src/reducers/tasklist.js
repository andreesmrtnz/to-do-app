

export const taskListInitialState = JSON.parse(localStorage.getItem('taskList')) || []

export const TASK_LIST_ACTIONS = {
    ADD: 'ADD',
    DELETE: 'DELETE',
    CLEAR: 'CLEAR'
}

export const updateLocalStorage = state => {
    window.localStorage.setItem('taskList', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = {
    [TASK_LIST_ACTIONS.ADD]: (state, action) => {
        const {id} = action.payload
        const tastInTaskListIndex = state.findIndex(task => task.id === id)

        if (tastInTaskListIndex >= 0) {
            const newTaskList = [...state, action.payload]

            updateLocalStorage(newTaskList)
            return newTaskList
        }

        const newTaskList = [...state, action.payload]
        
        updateLocalStorage(newTaskList)
        return newTaskList
    },
    [TASK_LIST_ACTIONS.DELETE]: (state, action) => {
        const {id} = action.payload
        const newTaskList = state.filter(task => task.id !== id)
        updateLocalStorage(newTaskList)
        return newTaskList
    },
    [TASK_LIST_ACTIONS.CLEAR]: () => {
        const newTaskList = []
        updateLocalStorage(newTaskList)
        return newTaskList
    }
}

export const taskListReducer = (state, action) => {
    const {type: actionType} = action
    const updateStateByAction = UPDATE_STATE_BY_ACTION[actionType]
    return updateStateByAction ? updateStateByAction(state, action) : state
}
