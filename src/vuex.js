import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: ' - Vuex'
        }
    }
})

export default store;